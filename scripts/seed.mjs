import pg from "pg"
const { Pool } = pg

// Use IPv6 address directly since DNS doesn't resolve on this machine
const host = "2406:da1c:61c:d600:1855:ab5a:4508:1424"
console.log("Connecting via IPv6:", host)

const pool = new Pool({
  host,
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "quTwexBsr70vblgS",
  ssl: { rejectUnauthorized: false },
  max: 1,
  family: 6,
})

const schema = `
-- Profiles table (auto-created on signup)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Collections
CREATE TABLE IF NOT EXISTS collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category TEXT NOT NULL,
  material TEXT,
  shape TEXT,
  is_new BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  is_sold_out BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Product variants (colors + sizes + images)
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  color_name TEXT NOT NULL,
  color_hex TEXT NOT NULL,
  image_url TEXT,
  stock INTEGER DEFAULT 0
);

-- Product-collection join
CREATE TABLE IF NOT EXISTS product_collections (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, collection_id)
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  total DECIMAL(10,2),
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Addresses
CREATE TABLE IF NOT EXISTS addresses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT,
  line1 TEXT NOT NULL,
  line2 TEXT,
  city TEXT NOT NULL,
  state TEXT,
  zip TEXT NOT NULL,
  country TEXT DEFAULT 'US',
  is_default BOOLEAN DEFAULT false
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- Policies: profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Policies: products (public read, admin write)
CREATE POLICY "Products are publicly readable" ON products FOR SELECT USING (true);

-- Policies: product_variants (public read)
CREATE POLICY "Variants are publicly readable" ON product_variants FOR SELECT USING (true);

-- Policies: collections (public read)
CREATE POLICY "Collections are publicly readable" ON collections FOR SELECT USING (true);
CREATE POLICY "Product collections are publicly readable" ON product_collections FOR SELECT USING (true);

-- Policies: orders (users see own, admin sees all)
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies: order_items (users see their own)
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Policies: addresses
CREATE POLICY "Users can manage own addresses" ON addresses FOR ALL USING (auth.uid() = user_id);

-- Seed collections
INSERT INTO collections (name, slug, description, image_url) VALUES
  ('Signature', 'signature', 'Our flagship collection — timeless design meets modern precision.', '/images/collection-signature.jpg'),
  ('New Arrivals', 'new-arrivals', 'Fresh off the design desk. Explore the latest drops.', '/images/collection-new.jpg'),
  ('Bestsellers', 'bestsellers', 'The frames the world loves most.', '/images/collection-bestsellers.jpg'),
  ('Limited Edition', 'limited-edition', 'Rare craftsmanship, small batches.', '/images/collection-limited.jpg'),
  ('Sunglasses', 'sunglasses', 'Protect your vision in style.', '/images/collection-sunglasses.jpg'),
  ('Eyeglasses', 'eyeglasses', 'Clarity meets character. Optical frames for everyday distinction.', '/images/collection-eyeglasses.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Seed products
INSERT INTO products (name, slug, description, price, original_price, category, material, shape, is_new, is_bestseller) VALUES
  ('Aviator Gold', 'aviator-gold', 'Classic aviator silhouette with premium gold frame.', 299, NULL, 'Sunglasses', 'Metal', 'Aviator', false, true),
  ('Wayfarer Classic', 'wayfarer-classic', 'Timeless wayfarer design reimagined in lightweight acetate.', 249, NULL, 'Sunglasses', 'Acetate', 'Wayfarer', false, true),
  ('Round Vintage', 'round-vintage', 'Retro round frames with modern precision.', 279, 329, 'Sunglasses', 'Acetate', 'Round', true, false),
  ('Cat Eye Elegance', 'cat-eye-elegance', 'Bold cat eye silhouette for the confident.', 319, NULL, 'Sunglasses', 'Acetate', 'Cat Eye', true, false),
  ('Square Luxe', 'square-luxe', 'Sharp square frames in premium titanium.', 449, NULL, 'Eyeglasses', 'Titanium', 'Square', false, true),
  ('Rectangle Minimal', 'rectangle-minimal', 'Clean rectangle frames for everyday wear.', 199, NULL, 'Eyeglasses', 'Acetate', 'Rectangle', false, false),
  ('Aviator Gradient', 'aviator-gradient', 'Tinted gradient lenses in a lightweight aviator frame.', 259, NULL, 'Sunglasses', 'Metal', 'Aviator', false, false),
  ('Wood Natural', 'wood-natural', 'Sustainably harvested wood frames. Each piece is unique.', 399, 459, 'Sunglasses', 'Wood', 'Round', false, true)
ON CONFLICT (slug) DO NOTHING;

-- Link products to collections and create variants
DO $$
DECLARE
  aviator_id UUID; wayfarer_id UUID; round_id UUID; cateye_id UUID;
  square_id UUID; rect_id UUID; gradient_id UUID; wood_id UUID;
  sig_id UUID; new_id UUID; best_id UUID; limited_id UUID; sun_id UUID; eye_id UUID;
BEGIN
  SELECT id INTO aviator_id FROM products WHERE slug = 'aviator-gold';
  SELECT id INTO wayfarer_id FROM products WHERE slug = 'wayfarer-classic';
  SELECT id INTO round_id FROM products WHERE slug = 'round-vintage';
  SELECT id INTO cateye_id FROM products WHERE slug = 'cat-eye-elegance';
  SELECT id INTO square_id FROM products WHERE slug = 'square-luxe';
  SELECT id INTO rect_id FROM products WHERE slug = 'rectangle-minimal';
  SELECT id INTO gradient_id FROM products WHERE slug = 'aviator-gradient';
  SELECT id INTO wood_id FROM products WHERE slug = 'wood-natural';
  SELECT id INTO sig_id FROM collections WHERE slug = 'signature';
  SELECT id INTO new_id FROM collections WHERE slug = 'new-arrivals';
  SELECT id INTO best_id FROM collections WHERE slug = 'bestsellers';
  SELECT id INTO limited_id FROM collections WHERE slug = 'limited-edition';
  SELECT id INTO sun_id FROM collections WHERE slug = 'sunglasses';
  SELECT id INTO eye_id FROM collections WHERE slug = 'eyeglasses';

  INSERT INTO product_collections (product_id, collection_id) VALUES
    (aviator_id, sig_id), (aviator_id, sun_id), (aviator_id, best_id),
    (wayfarer_id, sig_id), (wayfarer_id, sun_id), (wayfarer_id, best_id),
    (round_id, sig_id), (round_id, sun_id), (round_id, new_id),
    (cateye_id, new_id), (cateye_id, sun_id),
    (square_id, sig_id), (square_id, eye_id), (square_id, best_id),
    (rect_id, eye_id),
    (gradient_id, sun_id),
    (wood_id, limited_id), (wood_id, best_id)
  ON CONFLICT DO NOTHING;

  INSERT INTO product_variants (product_id, color_name, color_hex, stock) VALUES
    (aviator_id, 'Gold', '#C7A45D', 10), (aviator_id, 'Silver', '#C0C0C0', 15), (aviator_id, 'Black', '#111111', 20),
    (wayfarer_id, 'Black', '#111111', 15), (wayfarer_id, 'Tortoise', '#8B6914', 12), (wayfarer_id, 'Havana', '#4A3728', 8),
    (round_id, 'Gold', '#C7A45D', 5), (round_id, 'Rose Gold', '#B76E79', 7),
    (cateye_id, 'Black', '#111111', 6), (cateye_id, 'Leopard', '#D4A574', 4),
    (square_id, 'Silver', '#C0C0C0', 10), (square_id, 'Gunmetal', '#2C3539', 8),
    (rect_id, 'Black', '#111111', 20), (rect_id, 'Blue', '#2B5F8A', 12), (rect_id, 'Clear', '#E8E8E8', 15),
    (gradient_id, 'Gold', '#C7A45D', 10), (gradient_id, 'Silver', '#C0C0C0', 8),
    (wood_id, 'Walnut', '#5C4033', 5), (wood_id, 'Ebony', '#2F241C', 3)
  ON CONFLICT DO NOTHING;
END $$;
`

try {
  console.log("Connecting to Supabase database...")
  const client = await pool.connect()
  console.log("Connected. Running schema...")
  await client.query(schema)
  console.log("Schema and seed data applied successfully!")
  client.release()
} catch (err) {
  console.error("Error:", err.message)
} finally {
  await pool.end()
}
