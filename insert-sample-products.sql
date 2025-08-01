-- Insert Sample Products
-- Jalankan script ini di Supabase SQL Editor jika products table kosong

-- 1. Disable RLS untuk products (jika ada)
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- 2. Grant permissions
GRANT ALL ON products TO anon;
GRANT ALL ON products TO authenticated;
GRANT ALL ON products TO service_role;

-- 3. Insert sample products
INSERT INTO products (id, name, description, price, category, stock, images, created_at, updated_at) VALUES
-- Robux Via Login
(
  gen_random_uuid(),
  'Robux 400',
  '400 Robux via login - Proses 5-10 menit',
  50000,
  'robux-login',
  100,
  ARRAY['https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Robux+400'],
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Robux 800',
  '800 Robux via login - Proses 5-10 menit',
  95000,
  'robux-login',
  50,
  ARRAY['https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Robux+800'],
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Robux 1200',
  '1200 Robux via login - Proses 5-10 menit',
  140000,
  'robux-login',
  30,
  ARRAY['https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Robux+1200'],
  NOW(),
  NOW()
),

-- Robux Gamepass
(
  gen_random_uuid(),
  'Robux 400 Gamepass',
  '400 Robux via gamepass - Proses 5 hari',
  45000,
  'robux-gamepass',
  80,
  ARRAY['https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Robux+400+GP'],
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Robux 800 Gamepass',
  '800 Robux via gamepass - Proses 5 hari',
  90000,
  'robux-gamepass',
  40,
  ARRAY['https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Robux+800+GP'],
  NOW(),
  NOW()
),

-- Limited Items
(
  gen_random_uuid(),
  'Dominus Empyreus',
  'Limited item Dominus Empyreus - Rare collectible',
  2500000,
  'items',
  5,
  ARRAY['https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Dominus+Empyreus'],
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Sparkle Time Fedora',
  'Limited item Sparkle Time Fedora - Classic hat',
  150000,
  'items',
  10,
  ARRAY['https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Sparkle+Time+Fedora'],
  NOW(),
  NOW()
),

-- Game Passes
(
  gen_random_uuid(),
  'VIP Game Pass',
  'VIP Game Pass - Exclusive benefits and features',
  75000,
  'passes',
  25,
  ARRAY['https://via.placeholder.com/400x300/96CEB4/FFFFFF?text=VIP+Game+Pass'],
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Premium Game Pass',
  'Premium Game Pass - Advanced features and bonuses',
  120000,
  'passes',
  15,
  ARRAY['https://via.placeholder.com/400x300/96CEB4/FFFFFF?text=Premium+Game+Pass'],
  NOW(),
  NOW()
),

-- Joki Services
(
  gen_random_uuid(),
  'Joki Level 1-50',
  'Joki service level 1-50 - Fast and safe',
  100000,
  'joki',
  20,
  ARRAY['https://via.placeholder.com/400x300/FFEAA7/FFFFFF?text=Joki+1-50'],
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Joki Level 1-100',
  'Joki service level 1-100 - Professional service',
  200000,
  'joki',
  10,
  ARRAY['https://via.placeholder.com/400x300/FFEAA7/FFFFFF?text=Joki+1-100'],
  NOW(),
  NOW()
);

-- 4. Cek hasil insert
SELECT 
  COUNT(*) as total_products_after_insert
FROM products;

-- 5. Tampilkan sample data
SELECT 
  name,
  category,
  price,
  stock
FROM products
ORDER BY created_at DESC; 