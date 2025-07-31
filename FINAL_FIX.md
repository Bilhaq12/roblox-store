# Final Fix untuk Database Error

## 🚨 Masalah: Foreign Key Constraint Error

Error yang muncul:
```
ERROR: 23503: insert or update on table "user_profiles" violates foreign key constraint "user_profiles_id_fkey"
DETAIL: Key (id)=(00000000-0000-0000-0000-000000000000) is not present in table "users".
```

### Solusi:

#### Langkah 1: Jalankan Script Fix di Supabase
1. Buka [Supabase Dashboard](https://supabase.com)
2. Pilih project Anda
3. Klik **SQL Editor**
4. Copy dan paste script dari file `fix-foreign-key.sql`
5. Klik **Run**

#### Langkah 2: Test Pendaftaran (Tanpa User Profile)
User profile creation sudah di-comment out sementara. Sekarang coba:

1. Buka browser ke `http://localhost:3000/register`
2. Buka Developer Tools (F12) → Console
3. Coba daftar dengan email baru
4. Lihat log di console

#### Langkah 3: Verifikasi
Setelah pendaftaran berhasil:

1. **Cek Supabase Dashboard**:
   - Authentication → Users (pastikan user terbuat)
   - Database → Tables → user_profiles (akan kosong karena di-comment out)

2. **Cek Console Browser** - Log yang harus muncul:
```
🔍 Starting signup process...
📡 Calling Supabase auth.signUp...
📡 Supabase response: { data: {...}, error: null }
✅ Auth signup successful, user: [user-id]
✅ Signup process completed successfully
```

#### Langkah 4: Re-enable User Profile (Setelah Berhasil)
Jika pendaftaran berhasil tanpa user profile:

1. Edit file `src/contexts/AuthContext.tsx`
2. Uncomment bagian user profile creation (hapus `/*` dan `*/`)
3. Test pendaftaran lagi

### Jika Masih Error:

#### Cek Console Browser:
1. Buka Developer Tools (F12)
2. Tab Console
3. Cari error message spesifik
4. Share error message lengkap

#### Cek Supabase Dashboard:
1. Authentication → Users
2. Pastikan user terbuat dengan benar
3. Copy user ID yang terbuat

### Log yang Harus Muncul (Tanpa User Profile):
```
🔍 Starting signup process...
📡 Calling Supabase auth.signUp...
📡 Supabase response: { data: {...}, error: null }
✅ Auth signup successful, user: [user-id]
✅ Signup process completed successfully
```

### Setelah Berhasil:
1. **Uncomment** user profile creation
2. **Test** pendaftaran lagi
3. **Cek** apakah user profile terbuat

### File yang Diperbarui:
- `fix-foreign-key.sql` - Script untuk fix foreign key constraint
- `src/contexts/AuthContext.tsx` - User profile creation di-comment out
- `test-auth.js` - Test script diperbaiki

### Jika Masih Bermasalah:
- Share screenshot error dari console browser
- Share error message lengkap
- Pastikan file `.env` sudah benar 