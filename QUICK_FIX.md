# Quick Fix untuk Database Error

## 🚨 Masalah: "Database error saving new user"

### Solusi Cepat:

#### Langkah 1: Disable RLS (Row Level Security)
1. Buka [Supabase Dashboard](https://supabase.com)
2. Pilih project Anda
3. Klik **SQL Editor**
4. Copy dan paste script ini:

```sql
-- Disable RLS untuk testing pendaftaran
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- Drop semua policies
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for service role" ON user_profiles;
DROP POLICY IF EXISTS "Allow all operations" ON user_profiles;

-- Test insert
INSERT INTO user_profiles (id, full_name, role) 
VALUES ('00000000-0000-0000-0000-000000000000', 'test-user', 'user')
ON CONFLICT (id) DO NOTHING;
```

5. Klik **Run**

#### Langkah 2: Test Pendaftaran
1. Buka browser ke `http://localhost:3000/register`
2. Buka Developer Tools (F12) → Console
3. Coba daftar dengan email baru
4. Lihat apakah masih ada error

#### Langkah 3: Jika Masih Error
1. **Cek Console Browser** - Share error message lengkap
2. **Cek Supabase Dashboard**:
   - Authentication → Users (pastikan user terbuat)
   - Database → Tables → user_profiles (pastikan profile terbuat)

### Alternative Solution:

Jika masih error, coba **tanpa user profile** dulu:

1. Edit file `src/contexts/AuthContext.tsx`
2. Comment out bagian user profile creation:

```typescript
// Comment out bagian ini sementara
/*
if (data.user) {
  try {
    console.log('📡 Creating user profile...')
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id,
        full_name: fullName,
        role: 'user'
      })
    
    if (profileError) {
      console.error('❌ Profile creation error:', profileError)
    } else {
      console.log('✅ User profile created successfully')
    }
  } catch (profileErr) {
    console.error('❌ Profile creation exception:', profileErr)
  }
}
*/
```

3. Test pendaftaran lagi

### Log yang Harus Muncul:
```
🔍 Starting signup process...
📡 Calling Supabase auth.signUp...
📡 Supabase response: { data: {...}, error: null }
✅ Auth signup successful, user: [user-id]
✅ Signup process completed successfully
```

### Setelah Berhasil:
1. **Re-enable RLS** dengan policy yang benar
2. **Uncomment** user profile creation
3. **Test** pendaftaran lagi

### Jika Masih Bermasalah:
- Share screenshot error dari console browser
- Share error message lengkap
- Cek apakah file `.env` sudah benar 