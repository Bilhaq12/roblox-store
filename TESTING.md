# 🧪 Testing Instructions - Roblox Store

## ✅ Verifikasi Perbaikan

### 1. Test Login Error (Sudah Diperbaiki)
**Sebelum**: Login error karena konfigurasi Supabase belum setup
**Sekarang**: 
1. Buat file `.env` dengan kredensial Supabase yang benar
2. Restart development server
3. Login/register seharusnya berfungsi normal

**Cara Test**:
```bash
# 1. Buat file .env
echo "REACT_APP_SUPABASE_URL=your_url_here" > .env
echo "REACT_APP_SUPABASE_ANON_KEY=your_key_here" >> .env

# 2. Restart server
npm start

# 3. Test login di browser
# Buka http://localhost:3000/login
# Coba register dan login
```

### 2. Test Payment Manual Confirmation (Sudah Diperbaiki)
**Sebelum**: Pembayaran otomatis berhasil setelah 10 detik
**Sekarang**: Pembayaran manual, admin harus konfirmasi

**Cara Test**:
1. **User Flow**:
   - Buka produk detail
   - Klik "Beli Sekarang"
   - Isi form checkout (Nick, Password, WhatsApp)
   - Scan QRIS
   - Status tetap "Menunggu Pembayaran"

2. **Admin Flow**:
   - Login sebagai admin
   - Buka Admin Panel (menu user)
   - Lihat pesanan pending
   - Klik "Konfirmasi Pembayaran"
   - Status berubah menjadi "Berhasil"

### 3. Test Dark Mode
**Cara Test**:
1. Klik tombol toggle theme di header
2. Tema berubah dari light ke dark
3. Refresh halaman - tema tetap tersimpan
4. Test di semua halaman

### 4. Test Checkout Forms
**Cara Test**:
1. **Single Product**:
   - Buka produk detail
   - Klik "Beli Sekarang"
   - Form muncul dengan field:
     - Nick Roblox (wajib)
     - Password (jika VIP/Login atau Joki)
     - WhatsApp (wajib)

2. **Cart Checkout**:
   - Tambah beberapa produk ke cart
   - Klik "Bayar dengan QRIS"
   - Form muncul dengan field yang sama

### 5. Test Admin Panel
**Cara Test**:
1. Login sebagai user dengan role admin
2. Menu "Admin Panel" muncul di dropdown user
3. Klik "Admin Panel"
4. Halaman admin dengan:
   - Stats cards (Total Pesanan, Menunggu Pembayaran, dll)
   - Tab Pesanan, Pembayaran, Pengguna, Produk
   - Tabel pesanan dengan action buttons
   - Tombol "Konfirmasi Pembayaran"

## 🐛 Expected Issues & Solutions

### Issue 1: Login Still Error
**Kemungkinan Penyebab**:
- File `.env` belum dibuat
- Kredensial Supabase salah
- Database schema belum dijalankan

**Solusi**:
1. Ikuti instruksi di `SETUP.md`
2. Pastikan file `.env` ada dan benar
3. Jalankan SQL schema di Supabase

### Issue 2: Admin Panel Not Accessible
**Kemungkinan Penyebab**:
- User tidak memiliki role admin
- Route tidak terdaftar

**Solusi**:
1. Update user role di Supabase:
```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  raw_user_meta_data, 
  '{role}', 
  '"admin"'
) 
WHERE email = 'your-email@example.com';
```

### Issue 3: Payment Still Auto Success
**Kemungkinan Penyebab**:
- Cache browser
- File tidak ter-update

**Solusi**:
1. Clear browser cache
2. Hard refresh (Ctrl+F5)
3. Restart development server

## 📊 Test Checklist

### Authentication
- [ ] Register new user
- [ ] Login existing user
- [ ] Logout
- [ ] Session persistence
- [ ] Admin role access

### Payment System
- [ ] QRIS payment flow
- [ ] Manual confirmation
- [ ] Payment status updates
- [ ] Admin panel payment management

### UI/UX
- [ ] Dark mode toggle
- [ ] Responsive design
- [ ] Form validation
- [ ] Loading states
- [ ] Error handling

### Checkout Forms
- [ ] Single product checkout
- [ ] Cart checkout
- [ ] Field validation
- [ ] Conditional password field

### Admin Features
- [ ] Admin panel access
- [ ] Order management
- [ ] Payment confirmation
- [ ] Stats dashboard

## 🚀 Production Checklist

Sebelum deploy ke production:
- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] Row Level Security enabled
- [ ] Error handling implemented
- [ ] Payment webhooks configured
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Monitoring setup

## 📞 Support

Jika ada masalah:
1. Cek browser console untuk error
2. Cek network tab untuk API calls
3. Cek Supabase logs
4. Restart development server
5. Clear browser cache 