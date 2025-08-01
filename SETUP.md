# Setup Roblox Store

## Langkah 1: Setup Supabase

### 1.1 Buat Project Supabase
1. Buka [supabase.com](https://supabase.com)
2. Login atau Sign Up
3. Klik "New Project"
4. Pilih organization
5. Isi nama project: "roblox-store"
6. Pilih database password (simpan!)
7. Pilih region terdekat
8. Klik "Create new project"

### 1.2 Dapatkan Kredensial
1. Di dashboard Supabase, klik **Settings** (icon gear)
2. Klik **API**
3. Copy **Project URL** dan **anon public** key

### 1.3 Buat File .env
Buat file `.env` di folder `jualan-roblox`:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

Ganti dengan kredensial asli dari Langkah 1.2.

### 1.4 Setup Database
1. Di Supabase Dashboard, klik **SQL Editor**
2. Copy seluruh isi file `database-reset.sql` (reset total)
3. Paste dan klik **Run**

### 1.5 Buat Admin User
1. Jalankan aplikasi dan daftar user pertama
2. Di Supabase SQL Editor, jalankan script `create-admin.sql`
3. User pertama akan menjadi admin

## Langkah 2: Install Dependencies

```bash
npm install
```

## Langkah 3: Jalankan Development Server

```bash
npm start
```

## Langkah 4: Test

1. Buka browser ke `http://localhost:3000`
2. Klik "Daftar" di header
3. Isi form pendaftaran
4. Jalankan `create-admin.sql` di Supabase
5. Login kembali untuk akses admin panel

## Troubleshooting

### Error "Database error saving new user"
- Pastikan file `.env` sudah benar
- Pastikan database schema sudah dijalankan
- Cek console browser untuk error detail

### Error "Invalid API key"
- Pastikan anon key sudah benar
- Pastikan project URL sudah benar

### Error "Table not found"
- Jalankan database schema di SQL Editor
- Pastikan semua tabel terbuat

### Admin Panel tidak muncul
- Pastikan sudah menjalankan `create-admin.sql`
- Cek role user di database
- Logout dan login kembali

### Sudah login tapi disuruh login lagi di Profile
- **Masalah:** User sudah login di header tapi Profile page bilang "Please log in" atau "Profile Error"
- **Penyebab:** User profile belum terbuat di database
- **Solusi:** Jalankan script `quick-fix-profiles.sql` di Supabase SQL Editor
- **Langkah:**
  1. Buka Supabase Dashboard → SQL Editor
  2. Copy dan jalankan `quick-fix-profiles.sql`
  3. Refresh halaman Profile di browser
  4. Profile seharusnya sudah muncul

### Profile Error "permission denied for table user_profiles" (Error 403)
- **Penyebab:** RLS (Row Level Security) masih aktif dan memblokir akses
- **Solusi Final:**
  1. Jalankan `force-disable-rls.sql` di Supabase (force disable RLS + grant permissions)
  2. Refresh halaman Profile
- **Solusi Manual:**
  1. Buka Supabase → Table Editor → user_profiles
  2. Klik "Settings" → "Row Level Security"
  3. Toggle OFF "Enable RLS"
- **Debug Comprehensive:**
  1. Jalankan `check-all-issues.sql` untuk cek semua masalah
  2. Buka Developer Tools (F12) → Console
  3. Refresh halaman Profile
  4. Lihat log error untuk detail masalah

### Produk Tidak Muncul di Halaman Products
- **Penyebab:** Database products kosong atau ada masalah dengan schema
- **Solusi:**
  1. Jalankan `check-products.sql` di Supabase untuk cek status products
  2. Jika products kosong, jalankan `insert-sample-products.sql`
  3. Refresh halaman Products di browser
- **Debug:**
  1. Buka Developer Tools (F12) → Console
  2. Refresh halaman Products
  3. Lihat apakah ada error API call
  4. Cek Network tab untuk response dari Supabase

### Masih Error Setelah Jalankan Script
- **Langkah Debug:**
  1. Jalankan `check-profiles.sql` di Supabase untuk cek status
  2. Lihat hasil - apakah user profiles sudah terbuat?
  3. Jika masih error, jalankan `disable-rls-temp.sql` (temporary disable RLS)
  4. Refresh halaman Profile
  5. Jika berhasil, berarti masalah di RLS policies

## File Penting

- `database-reset.sql` - Database schema yang reset total (paling bersih)
- `create-admin.sql` - Script untuk membuat user pertama menjadi admin
- `check-products.sql` - Script untuk cek status products database
- `insert-sample-products.sql` - Script untuk insert sample products
- `force-disable-rls.sql` - Script force disable RLS + grant permissions (RECOMMENDED)
- `.env` - Environment variables
- `src/contexts/AuthContext.tsx` - Authentication logic
- `src/lib/supabase.ts` - Supabase client
- `src/components/AdminRoute.tsx` - Admin route protection

## Fitur yang Tersedia

- ✅ User authentication (login/register)
- ✅ Product listing
- ✅ Shopping cart
- ✅ QRIS payment
- ✅ Order management
- ✅ Admin panel (diamankan)
- ✅ Chat support
- ✅ Dark mode
- ✅ Responsive design 