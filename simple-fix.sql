-- Simple Fix untuk Database Error
-- Jalankan script ini di Supabase SQL Editor

-- 1. Disable RLS sementara untuk testing
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- 2. Drop semua policies yang ada
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for service role" ON user_profiles;

-- 3. Buat policy yang sangat sederhana
CREATE POLICY "Allow all operations" ON user_profiles
  FOR ALL USING (true) WITH CHECK (true);

-- 4. Enable RLS kembali
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 5. Buat function yang lebih sederhana
CREATE OR REPLACE FUNCTION create_user_profile_simple(user_id UUID, user_full_name TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name, role)
  VALUES (user_id, user_full_name, 'user')
  ON CONFLICT (id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Test function
SELECT create_user_profile_simple('00000000-0000-0000-0000-000000000000', 'test');

-- 7. Cek hasil
SELECT * FROM user_profiles LIMIT 5; 