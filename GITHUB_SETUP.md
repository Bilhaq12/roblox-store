# 🚀 GitHub Setup & Upload Guide

## 📋 Langkah-langkah Upload ke GitHub

### 1. Buat Repository di GitHub
1. Buka [GitHub.com](https://github.com)
2. Login ke akun Anda
3. Klik tombol **"New"** atau **"+"** di pojok kanan atas
4. Pilih **"New repository"**
5. Isi form:
   - **Repository name**: `roblox-store` (atau nama yang Anda inginkan)
   - **Description**: `Website jualan item Roblox dengan pembayaran QRIS`
   - **Visibility**: Pilih Public atau Private
   - **JANGAN** centang "Add a README file" (karena sudah ada)
   - **JANGAN** centang "Add .gitignore" (karena sudah ada)
6. Klik **"Create repository"**

### 2. Hubungkan Local Repository dengan GitHub
Setelah repository dibuat, GitHub akan menampilkan instruksi. Gunakan command berikut:

```bash
# Tambahkan remote origin
git remote add origin https://github.com/USERNAME/roblox-store.git

# Push ke GitHub
git push -u origin master
```

**Ganti `USERNAME` dengan username GitHub Anda dan `roblox-store` dengan nama repository yang Anda buat.**

### 3. Verifikasi Upload
1. Refresh halaman GitHub repository
2. Pastikan semua file sudah terupload
3. Cek file yang tidak boleh terupload:
   - ✅ `.env` file TIDAK ada di GitHub (aman)
   - ✅ `node_modules/` folder TIDAK ada di GitHub (aman)

## 🔒 Security Checklist

### ✅ Sudah Dikonfigurasi:
- [x] `.env` file ditambahkan ke `.gitignore`
- [x] `env.example` dibuat sebagai template
- [x] Kredensial Supabase tidak akan terupload

### ⚠️ Yang Perlu Diperhatikan:
- [ ] Jangan share kredensial Supabase di public repository
- [ ] Gunakan environment variables di production
- [ ] Setup Row Level Security di Supabase

## 📁 File yang Akan Terupload

### ✅ Core Files:
- `src/` - Source code React
- `public/` - Static assets
- `package.json` - Dependencies
- `tailwind.config.js` - Tailwind configuration
- `README.md` - Documentation
- `SETUP.md` - Setup instructions
- `TESTING.md` - Testing guide
- `database-schema.sql` - Database schema
- `env.example` - Environment template

### ❌ Files yang TIDAK Terupload:
- `.env` - Environment variables (aman)
- `node_modules/` - Dependencies (akan diinstall otomatis)
- `.git/` - Git metadata

## 🚀 Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### 2. Netlify
```bash
# Build project
npm run build

# Upload folder 'build' ke Netlify
```

### 3. GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

## 🔧 Environment Variables di Production

### Vercel:
1. Buka project di Vercel dashboard
2. Klik "Settings" → "Environment Variables"
3. Tambahkan:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`

### Netlify:
1. Buka project di Netlify dashboard
2. Klik "Site settings" → "Environment variables"
3. Tambahkan variables yang sama

## 📞 Troubleshooting

### Error: "Repository not found"
- Pastikan URL repository benar
- Pastikan repository sudah dibuat di GitHub
- Cek permission repository (public/private)

### Error: "Authentication failed"
- Gunakan Personal Access Token
- Atau setup SSH key

### Error: "Permission denied"
- Pastikan Anda memiliki akses write ke repository
- Cek repository visibility settings

## 🎯 Next Steps

Setelah upload ke GitHub:
1. Setup environment variables di production
2. Deploy ke platform hosting
3. Test semua fitur di production
4. Setup monitoring dan analytics
5. Setup CI/CD pipeline (opsional)

## 📚 Resources

- [GitHub Docs](https://docs.github.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [Supabase Docs](https://supabase.com/docs) 