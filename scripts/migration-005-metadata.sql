-- Migration: Add JSONB metadata column to products
-- Run in Supabase Dashboard > SQL Editor

ALTER TABLE products ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Populate metadata for existing products from the product_variants table
UPDATE products SET metadata = jsonb_build_object(
  'colors', COALESCE(
    (SELECT jsonb_agg(jsonb_build_object('name', color_name, 'hex', color_hex))
     FROM product_variants WHERE product_id = products.id),
    '[]'::jsonb
  ),
  'sizes', '[]'::jsonb,
  'features', '[]'::jsonb,
  'details', '{}'::jsonb
);
