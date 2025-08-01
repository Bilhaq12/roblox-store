-- Check Products Database
-- Jalankan script ini di Supabase SQL Editor

-- 1. Cek apakah table products ada
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_name = 'products';

-- 2. Cek struktur table products
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'products'
ORDER BY ordinal_position;

-- 3. Cek berapa banyak produk yang ada
SELECT COUNT(*) as total_products FROM products;

-- 4. Tampilkan semua produk yang ada
SELECT 
  id,
  name,
  description,
  price,
  category,
  stock,
  created_at
FROM products
ORDER BY created_at DESC;

-- 5. Cek RLS status untuk products
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'products';

-- 6. Cek policies untuk products
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'products';

-- 7. Cek permissions untuk products
SELECT 
  grantee,
  privilege_type,
  is_grantable
FROM information_schema.role_table_grants 
WHERE table_name = 'products'; 