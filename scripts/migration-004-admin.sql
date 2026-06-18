-- Migration: Add is_admin to profiles
-- Run in Supabase Dashboard > SQL Editor

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Make your user an admin (replace with your email)
-- Run this separately after confirming your user_id:
-- UPDATE profiles SET is_admin = true WHERE id = '<your-user-uuid>';

-- Or set by email via a join:
-- UPDATE profiles SET is_admin = true 
-- FROM auth.users 
-- WHERE profiles.id = auth.users.id 
-- AND auth.users.email = 'your@email.com';
