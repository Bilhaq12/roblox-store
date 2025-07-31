-- Fix Foreign Key Constraint Issue
-- Jalankan script ini di Supabase SQL Editor

-- 1. Disable RLS untuk testing
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- 2. Drop semua policies
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for service role" ON user_profiles;
DROP POLICY IF EXISTS "Allow all operations" ON user_profiles;

-- 3. Buat policy yang sangat sederhana untuk testing
CREATE POLICY "Allow all operations for testing" ON user_profiles
  FOR ALL USING (true) WITH CHECK (true);

-- 4. Enable RLS kembali
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 5. Cek apakah ada user yang sudah ada
SELECT id, email FROM auth.users LIMIT 5;

-- 6. Cek apakah ada user_profiles yang sudah ada
SELECT * FROM user_profiles LIMIT 5;

-- 7. Buat function yang lebih aman
CREATE OR REPLACE FUNCTION create_user_profile_safe(user_id UUID, user_full_name TEXT)
RETURNS VOID AS $$
BEGIN
  -- Cek apakah user ada di auth.users
  IF EXISTS (SELECT 1 FROM auth.users WHERE id = user_id) THEN
    INSERT INTO user_profiles (id, full_name, role)
    VALUES (user_id, user_full_name, 'user')
    ON CONFLICT (id) DO UPDATE SET
      full_name = EXCLUDED.full_name,
      updated_at = NOW();
  ELSE
    RAISE EXCEPTION 'User with ID % does not exist in auth.users', user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Test dengan user yang benar-benar ada (jika ada)
-- Ganti UUID di bawah dengan ID user yang benar-benar ada
-- SELECT create_user_profile_safe('REAL-USER-ID-HERE', 'test-user'); 