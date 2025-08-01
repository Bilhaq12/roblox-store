-- Force Disable RLS untuk user_profiles
-- Jalankan script ini di Supabase SQL Editor

-- 1. Drop semua policies yang ada (force)
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON user_profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Enable update for users based on email" ON user_profiles;

-- 2. Disable RLS untuk user_profiles
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- 3. Grant permissions untuk anon dan authenticated
GRANT ALL ON user_profiles TO anon;
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON user_profiles TO service_role;

-- 4. Cek status RLS
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'user_profiles';

-- 5. Cek policies (seharusnya kosong)
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
WHERE tablename = 'user_profiles';

-- 6. Cek permissions
SELECT 
  grantee,
  privilege_type,
  is_grantable
FROM information_schema.role_table_grants 
WHERE table_name = 'user_profiles';

-- 7. Test query sebagai anon
SELECT COUNT(*) as total_profiles FROM user_profiles;

-- 8. Tampilkan data user profiles
SELECT 
  id,
  full_name,
  role,
  created_at
FROM user_profiles; 