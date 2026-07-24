# HRIS di Vercel — Frontend Static + Serverless Functions + MongoDB

## Struktur project (penting untuk Vercel)
```
project/
├── index.html          ← frontend (disajikan sebagai static file oleh Vercel)
├── style.css
├── script.js             ← fetch('/api/state') untuk load/save data
├── api/
│   ├── _db.js            ← koneksi MongoDB (di-cache lintas request)
│   ├── state.js           ← GET/PUT /api/state → baca/tulis MongoDB
│   └── health.js           ← GET /api/health → cek koneksi MongoDB
├── package.json
└── .env.example
```

Vercel otomatis:
- Menyajikan `index.html`, `style.css`, `script.js` sebagai static assets di root domain.
- Mengubah setiap file di folder `api/` menjadi endpoint HTTP dengan nama sesuai nama file
  (`api/state.js` → `https://domain-anda.vercel.app/api/state`, dst).
  Tidak perlu `vercel.json` atau konfigurasi routing tambahan.

## Langkah deploy

### 1. Siapkan MongoDB Atlas
1. Buat cluster gratis di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Buat database user (username + password).
3. Di **Network Access**, tambahkan `0.0.0.0/0` (allow from anywhere) — karena
   Vercel Functions berjalan dari IP yang berubah-ubah, jadi tidak bisa
   whitelist IP tetap.
4. Copy **connection string**-nya (tombol *Connect → Drivers*), bentuknya:
   ```
   mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 2. Push project ini ke Git (GitHub/GitLab/Bitbucket)
Vercel deploy paling mudah lewat repo Git yang terhubung ke project Vercel.

### 3. Import project di Vercel
1. Buka [vercel.com/new](https://vercel.com/new) → pilih repo ini.
2. Framework preset: pilih **Other** (bukan Next.js dsb — project ini murni
   static + serverless functions).
3. Sebelum klik Deploy, buka **Environment Variables** dan tambahkan:
   | Key | Value |
   |---|---|
   | `MONGODB_URI` | connection string dari langkah 1 |
   | `DB_NAME` | `hris` (atau nama lain sesuai selera) |
   | `API_KEY` | (opsional, kosongkan jika tidak perlu) |
4. Klik **Deploy**.

### 4. Verifikasi
Setelah deploy selesai, buka:
```
https://domain-anda.vercel.app/api/health
```
Kalau muncul `{"ok":true,"mongo":"connected"}` berarti sudah tersambung ke
MongoDB dengan benar. Kalau ada error, cek pesannya — biasanya karena
`MONGODB_URI` salah atau IP belum di-whitelist (`0.0.0.0/0`).

Lalu buka `https://domain-anda.vercel.app/` — upload Excel seperti biasa,
datanya akan tersimpan ke MongoDB dan bisa diakses dari komputer/user
manapun yang membuka URL Vercel yang sama.

## Development lokal (opsional)
```bash
npm install -g vercel   # sekali saja
vercel login
cp .env.example .env    # isi MONGODB_URI
vercel dev              # menjalankan static + /api/* secara lokal, mirip production
```

## Hal-hal penting yang perlu diketahui

- **Environment variable di Vercel, bukan file `.env`.** File `.env` hanya
  dipakai untuk `vercel dev` di komputer Anda. Di production, semua variabel
  (`MONGODB_URI`, dst.) harus diisi lewat Vercel Dashboard atau
  `vercel env add`, bukan dari file yang ikut ter-commit ke repo.

- **Batas ukuran body request Vercel Serverless Functions.** Vercel membatasi
  ukuran body request (± 4.5 MB pada paket Hobby). Karena aplikasi ini
  mengirim ULANG seluruh data karyawan + log setiap kali ada perubahan
  (mengikuti perilaku asli aplikasi yang tadinya menyimpan ulang seluruh
  array ke localStorage), ini bisa jadi masalah kalau jumlah karyawan/log
  sudah sangat banyak. Kalau nanti mengalami error `413` atau payload
  ditolak, solusinya adalah mengubah endpoint agar melakukan operasi
  tambah/ubah/hapus per-baris ke MongoDB (bukan replace seluruh dokumen) —
  beri tahu saya kalau sudah sampai ke titik itu, saya bisa bantu ubah
  strukturnya.

- **Koneksi MongoDB di-cache** lewat `global._hrisMongoClientPromise` di
  `api/_db.js`, supaya function yang "warm" (dipakai ulang oleh Vercel) tidak
  membuka koneksi baru di setiap request.

- **Password superadmin** (`admin264` di `script.js`) tetap sebatas
  pengecekan di sisi browser seperti sebelumnya — bukan autentikasi
  sungguhan di server. Kalau butuh proteksi lebih serius (login per-user,
  role admin di backend, dll), itu perlu ditambahkan terpisah.
