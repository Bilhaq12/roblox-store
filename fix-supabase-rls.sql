-- Fix Supabase RLS and User Profile Issues
-- Jalankan script ini di Supabase SQL Editor

-- 1. Pastikan user_profiles table ada dan benar
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role user_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Drop dan recreate RLS policies untuk user_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON user_profiles;

-- 3. Buat policies yang benar
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 4. Buat policy untuk insert tanpa auth (untuk trigger)
CREATE POLICY "Enable insert for service role" ON user_profiles
  FOR INSERT WITH CHECK (true);

-- 5. Pastikan trigger function ada
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')::user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Drop dan recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 7. Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 8. Test: Cek apakah ada user profiles yang sudah ada
SELECT * FROM user_profiles LIMIT 5;

-- 9. Buat function untuk manual insert user profile
CREATE OR REPLACE FUNCTION create_user_profile_manual(user_id UUID, user_full_name TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name, role)
  VALUES (user_id, user_full_name, 'user')
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 