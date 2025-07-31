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
2. Copy seluruh isi file `database-clean.sql`
3. Paste dan klik **Run**

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
4. Cek console browser untuk log detail

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

## File Penting

- `database-clean.sql` - Database schema yang bersih
- `.env` - Environment variables
- `src/contexts/AuthContext.tsx` - Authentication logic
- `src/lib/supabase.ts` - Supabase client

## Fitur yang Tersedia

- ✅ User authentication (login/register)
- ✅ Product listing
- ✅ Shopping cart
- ✅ QRIS payment
- ✅ Order management
- ✅ Admin panel
- ✅ Chat support
- ✅ Dark mode
- ✅ Responsive design 