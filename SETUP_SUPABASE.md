# Setup Supabase untuk Roblox Store

## Langkah 1: Buat Project Supabase

1. Buka [supabase.com](https://supabase.com)
2. Login atau Sign Up
3. Klik "New Project"
4. Pilih organization
5. Isi nama project: "roblox-store"
6. Pilih database password (simpan!)
7. Pilih region terdekat
8. Klik "Create new project"

## Langkah 2: Dapatkan Kredensial

1. Di dashboard Supabase, klik **Settings** (icon gear)
2. Klik **API**
3. Copy **Project URL** dan **anon public** key

## Langkah 3: Buat File .env

Buat file `.env` di folder `jualan-roblox`:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
REACT_APP_PAYMENT_MANUAL_CONFIRMATION=true
```

Ganti dengan kredensial asli dari Langkah 2.

## Langkah 4: Setup Database

1. Di Supabase Dashboard, klik **SQL Editor**
2. Copy seluruh isi file `database-schema.sql`
3. Paste dan klik **Run**

## Langkah 5: Test

1. Restart development server: `npm start`
2. Coba daftar dengan email baru
3. Cek di Supabase Dashboard → Authentication → Users

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