-- Disable RLS untuk testing pendaftaran
-- Jalankan script ini di Supabase SQL Editor

-- 1. Disable RLS pada user_profiles
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- 2. Drop semua policies
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for service role" ON user_profiles;
DROP POLICY IF EXISTS "Allow all operations" ON user_profiles;

-- 3. Cek apakah table bisa diakses
SELECT * FROM user_profiles LIMIT 5;

-- 4. Test insert manual
INSERT INTO user_profiles (id, full_name, role) 
VALUES ('00000000-0000-0000-0000-000000000000', 'test-user', 'user')
ON CONFLICT (id) DO NOTHING;

-- 5. Cek hasil
SELECT * FROM user_profiles WHERE full_name = 'test-user'; 