-- Script untuk membuat user pertama menjadi admin
-- Jalankan script ini di Supabase SQL Editor setelah user pertama mendaftar

-- Update user pertama menjadi admin
UPDATE user_profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id FROM user_profiles 
  ORDER BY created_at ASC 
  LIMIT 1
);

-- Cek hasil
SELECT 
  id,
  full_name,
  role,
  created_at
FROM user_profiles 
ORDER BY created_at ASC; 