# Troubleshooting Database Error

## Masalah: "Database error saving new user"

### Penyebab:
Function `create_user_profile_manual` belum ada di database Supabase.

### Solusi:

#### Langkah 1: Jalankan Script Fix di Supabase
1. Buka [Supabase Dashboard](https://supabase.com)
2. Pilih project Anda
3. Klik **SQL Editor**
4. Copy seluruh isi file `fix-supabase-rls.sql`
5. Paste dan klik **Run**

#### Langkah 2: Verifikasi
1. Di SQL Editor, jalankan:
```sql
SELECT * FROM user_profiles LIMIT 5;
```

2. Jalankan test script:
```bash
node test-auth.js
```

#### Langkah 3: Test Pendaftaran
1. Buka browser ke `http://localhost:3000/register`
2. Buka Developer Tools (F12) → Console
3. Coba daftar dengan email baru
4. Lihat log detail di console

### Jika Masih Error:

#### Cek Console Browser:
1. Buka Developer Tools (F12)
2. Tab Console
3. Cari error message spesifik
4. Share error message lengkap

#### Cek Supabase Dashboard:
1. Authentication → Users
2. Database → Tables → user_profiles
3. Pastikan ada data user baru

#### Alternative Solution:
Jika masih error, coba:
1. Restart development server: `npm start`
2. Clear browser cache
3. Coba dengan email yang berbeda

### Log yang Harus Muncul:
```
🔍 Starting signup process...
📡 Calling Supabase auth.signUp...
📡 Supabase response: { data: {...}, error: null }
✅ Auth signup successful, user: [user-id]
📡 Creating user profile...
✅ User profile created successfully
✅ Signup process completed successfully
```

### Jika Log Menunjukkan Error:
- Share error message lengkap dari console
- Pastikan file `.env` sudah benar
- Pastikan database schema sudah dijalankan 