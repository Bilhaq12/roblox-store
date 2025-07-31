# 🎮 Roblox Store - Website Jualan Item Roblox

Website jualan item Roblox dengan pembayaran QRIS yang aman dan mudah. Dibangun menggunakan React, TypeScript, dan Tailwind CSS.

## ✨ Fitur Utama

- 🛍️ **Katalog Produk Roblox** - Robux, Limited Items, dan Game Passes
- 🛒 **Keranjang Belanja** - Manajemen item dengan quantity control
- 💳 **Pembayaran QRIS** - Sistem pembayaran QRIS dengan manual confirmation
- 🔐 **User Authentication** - Login/register dengan Supabase
- 📝 **Checkout Forms** - Form untuk Nick, Password, dan WhatsApp
- 🌙 **Dark Mode** - Toggle tema gelap/terang
- 📱 **Responsive Design** - Tampilan optimal di desktop dan mobile
- 🔍 **Pencarian & Filter** - Cari dan filter produk berdasarkan kategori
- 🎨 **UI/UX Modern** - Desain yang menarik dengan warna tema Roblox

## 🚀 Teknologi yang Digunakan

- **React 18** - Library JavaScript untuk UI
- **TypeScript** - Type safety dan developer experience yang lebih baik
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Client-side routing
- **Lucide React** - Icon library yang modern
- **Vite** - Build tool yang cepat

## 📦 Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd jualan-roblox
   ```

2. **Setup Environment Variables**
   Buat file `.env` di root directory dengan kredensial Supabase:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url_here
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

3. **Setup Supabase**
   - Buat project baru di [Supabase](https://supabase.com)
   - Copy project URL dan anon key dari Settings > API
   - Jalankan SQL schema dari `database-schema.sql` di SQL editor Supabase
   - Update file `.env` dengan kredensial Anda

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Jalankan development server**
   ```bash
   npm start
   ```

6. **Buka browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Struktur Proyek

```
src/
├── components/          # Komponen React yang dapat digunakan kembali
│   ├── Header.tsx      # Header dengan navigation dan cart
│   ├── Footer.tsx      # Footer dengan links dan social media
│   ├── ProductCard.tsx # Card untuk menampilkan produk
│   └── QRISPayment.tsx # Komponen pembayaran QRIS
├── pages/              # Halaman-halaman aplikasi
│   ├── Home.tsx        # Halaman beranda
│   ├── Products.tsx    # Halaman produk dengan filter
│   ├── Cart.tsx        # Halaman keranjang belanja
│   ├── About.tsx       # Halaman tentang kami
│   └── Contact.tsx     # Halaman kontak
├── data/               # Data statis aplikasi
│   └── products.ts     # Data produk Roblox
├── App.tsx             # Komponen utama aplikasi
└── index.tsx           # Entry point aplikasi
```

## 🎯 Fitur Detail

### 🛍️ Katalog Produk
- Tampilan grid/list produk
- Filter berdasarkan kategori (Robux, Items, Passes)
- Pencarian produk berdasarkan nama dan deskripsi
- Badge "Popular" untuk produk unggulan

### 🛒 Keranjang Belanja
- Tambah/hapus item dari keranjang
- Update quantity dengan batasan stok
- Kalkulasi total otomatis
- Ringkasan pesanan

### 💳 Sistem Pembayaran QRIS
- QR Code statis dengan nominal tertera
- Timer countdown 15 menit
- Status pembayaran (pending, success, failed)
- **Manual Admin Confirmation** - Pembayaran dikonfirmasi manual oleh admin
- Instruksi pembayaran yang jelas
- Form checkout dengan data user (Nick, Password, WhatsApp)

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints untuk tablet dan desktop
- Navigation yang responsif
- Grid layout yang adaptif

## 🎨 Customization

### Warna Tema Roblox
Warna tema dapat diubah di `tailwind.config.js`:

```javascript
colors: {
  roblox: {
    red: '#FF3B30',
    blue: '#007AFF', 
    green: '#34C759',
    yellow: '#FFCC02',
    purple: '#AF52DE',
  }
}
```

### Data Produk
Produk dapat ditambah/edit di `src/data/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: '1',
    name: 'Robux 100',
    description: '100 Robux untuk game Roblox Anda',
    price: 15000,
    image: 'image-url',
    category: 'robux',
    stock: 50,
    popular: true
  }
  // ... produk lainnya
];
```

## 🔧 Scripts

- `npm start` - Jalankan development server
- `npm run build` - Build untuk production
- `npm test` - Jalankan test
- `npm run eject` - Eject dari Create React App

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 📞 Kontak

- **Email**: support@robloxstore.id
- **WhatsApp**: +62 812-3456-7890
- **Website**: https://robloxstore.id

## 🙏 Ucapan Terima Kasih

- [React](https://reactjs.org/) - Library JavaScript untuk UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [Lucide](https://lucide.dev/) - Icon library yang indah
- [Create React App](https://create-react-app.dev/) - Tool untuk setup React project

---

**Note**: Ini adalah proyek demo untuk pembelajaran. Untuk implementasi production, pastikan untuk menambahkan backend API, database, dan sistem pembayaran QRIS yang sebenarnya.
