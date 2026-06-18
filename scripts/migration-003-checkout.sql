-- Migration: Add Stripe PI ID to orders and denormalized display fields to order_items
-- Run this in Supabase Dashboard > SQL Editor after checkout code is deployed

-- 1. Add Stripe payment intent ID to orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;

-- 2. Add denormalized fields to order_items for displaying order history without joins
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_name TEXT;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_image TEXT;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS color_name TEXT;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS color_hex TEXT;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS size_label TEXT;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS size_value TEXT;

COMMENT ON COLUMN order_items.price IS 'Unit price at time of order';

-- 3. RLS policy to allow inserting order items during checkout
CREATE POLICY "Users can insert own order items" ON order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
