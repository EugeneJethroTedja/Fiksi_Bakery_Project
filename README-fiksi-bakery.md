# Fiksi Bakery

Website bakery fiktif berbasis React dengan halaman beranda (landing page) dan dashboard admin untuk mengelola reservasi meja. Dibuat sebagai latihan membangun antarmuka web multi-halaman dengan React, React Router, dan React-Bootstrap.

## Fitur

- **Beranda** – carousel gambar, profil singkat, dan daftar keunggulan produk dengan layout kiri-kanan bergantian.
- **Login admin** – form login; sesi disimpan di `localStorage`, dan pengguna yang sudah login otomatis diarahkan ke dashboard.
- **Proteksi halaman** – dashboard hanya bisa diakses setelah login, jika belum login akan diarahkan ke `/login`.
- **Dashboard reservasi meja**
  - Tambah, ubah, dan hapus reservasi (CRUD) lewat modal
  - Status reservasi `Pending`, `Confirmed`, `Cancelled` dengan lencana warna
  - Nomor meja dan abjad hanya muncul saat status `Confirmed`
  - Validasi form dan notifikasi toast
  - Ringkasan jumlah reservasi dan waktu login pengguna
- **Halaman 404** untuk rute yang tidak dikenal.

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Library UI | React (Hooks) |
| Routing | React Router (`createBrowserRouter`, `RouterProvider`) |
| Styling | React-Bootstrap, Bootstrap 5 |
| Ikon | react-icons |
| Notifikasi | Toast React-Bootstrap, sonner |

## Rute

| Path | Halaman | Akses |
|------|---------|-------|
| `/` | HomePage | Publik |
| `/login` | LoginPage | Publik (redirect ke dashboard jika sudah login) |
| `/dashboard` | DashboardPage | Perlu login |
| `*` | Routes Not Found | – |

Semua halaman dibungkus `MainLayout` (navigasi dan footer bersama).

## Struktur Project

```
src/
├── assets/images/        # gambar bakery
├── components/
│   ├── ImageCarousel.jsx
│   └── FormLogin.jsx
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── DashboardPage.jsx
└── routes/
    └── AppRouter.jsx
```

## Cara Menjalankan

```bash
git clone https://github.com/USERNAME/fiksi-bakery.git
cd fiksi-bakery
npm install
npm run dev
```

## Screenshot

<!-- Tambahkan screenshot di folder docs/ -->
![Beranda](docs/home.png)
![Login](docs/login.png)
![Dashboard](docs/dashboard.png)

## Catatan & Batasan

- Data reservasi disimpan di **state React**, sehingga hilang saat halaman di-refresh.
- Autentikasi masih sederhana (`localStorage`) dan belum terhubung ke backend.
- Proteksi dashboard dilakukan di level komponen, bukan di level router.

## Rencana Pengembangan

- [ ] Simpan reservasi ke backend/database
- [ ] Autentikasi sungguhan (token) dan protected route
- [ ] Filter dan pencarian reservasi
- [ ] Cegah bentrok jadwal dan nomor meja

## Author

**NAMA KAMU** – [GitHub](https://github.com/USERNAME) · [LinkedIn](https://linkedin.com/in/USERNAME)
