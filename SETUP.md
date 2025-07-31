# 🚀 Setup Instructions - Roblox Store

## 🔧 Konfigurasi Supabase (Wajib untuk Login)

### 1. Buat Project Supabase
1. Kunjungi [https://supabase.com](https://supabase.com)
2. Sign up/Login dengan akun Anda
3. Klik "New Project"
4. Pilih organization dan beri nama project (misal: "roblox-store")
5. Masukkan database password
6. Pilih region terdekat (misal: Southeast Asia)
7. Klik "Create new project"

### 2. Dapatkan Kredensial API
1. Setelah project dibuat, buka project
2. Klik menu "Settings" (icon gear) di sidebar kiri
3. Pilih "API"
4. Copy **Project URL** dan **anon public** key

### 3. Buat File Environment
1. Di root folder project, buat file `.env`
2. Isi dengan kredensial Supabase:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Setup Database Schema
1. Di Supabase dashboard, klik "SQL Editor" di sidebar
2. Klik "New query"
3. Copy seluruh isi file `database-schema.sql`
4. Paste ke SQL editor dan klik "Run"

### 5. Test Login
1. Restart development server: `npm start`
2. Buka http://localhost:3000
3. Coba register/login - seharusnya sudah berfungsi

## 💳 Sistem Pembayaran Manual

### Fitur yang Sudah Diperbaiki:
- ✅ **Menghapus pembayaran otomatis** - Tidak ada lagi timer 10 detik
- ✅ **Manual confirmation** - Admin harus konfirmasi pembayaran
- ✅ **Demo button** - Tombol "Admin: Konfirmasi Pembayaran" untuk testing
- ✅ **Pesan warning** - Memberitahu user bahwa pembayaran manual

### Cara Kerja:
1. User scan QRIS dan transfer
2. Status tetap "Menunggu Pembayaran"
3. Admin cek transfer di rekening
4. Admin klik tombol "Konfirmasi Pembayaran"
5. Status berubah menjadi "Berhasil"

## 🐛 Troubleshooting

### Login Error
**Gejala**: Error saat login/register
**Solusi**:
1. Pastikan file `.env` sudah dibuat dengan benar
2. Pastikan kredensial Supabase sudah benar
3. Restart development server setelah edit `.env`
4. Cek browser console untuk error detail

### Payment Auto Success
**Gejala**: Pembayaran otomatis berhasil tanpa transfer
**Solusi**: ✅ Sudah diperbaiki - pembayaran sekarang manual

### Database Error
**Gejala**: Error saat akses data
**Solusi**:
1. Pastikan SQL schema sudah dijalankan di Supabase
2. Cek tabel sudah terbuat di Supabase dashboard
3. Pastikan Row Level Security (RLS) sudah dikonfigurasi

## 📱 Fitur Baru

### Dark Mode
- Toggle tema gelap/terang
- Tersimpan di localStorage
- Transisi smooth

### Checkout Forms
- Form untuk Nick Roblox
- Form Password (jika VIP/Login atau Joki)
- Form Nomor WhatsApp
- Validasi client-side

### User Authentication
- Register dengan email/password
- Login dengan email/password
- Profile management
- Session persistence

## 🔒 Security Notes

- Jangan commit file `.env` ke git
- Gunakan environment variables untuk kredensial
- Implementasi Row Level Security di Supabase
- Validasi input di client dan server

## 📞 Support

Jika masih ada masalah:
1. Cek browser console untuk error
2. Pastikan semua langkah setup sudah benar
3. Restart development server
4. Clear browser cache 