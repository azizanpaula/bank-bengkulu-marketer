# 🏦 Panduan Implementasi Aplikasi Monitoring Target AO Bank Bengkulu di Google Sites

> [!IMPORTANT]
> ### 🌐 SITUS GOOGLE SITES TELAH AKTIF & DIPUBLIKASIKAN:
> **URL Publik Resmi**: 👉 **[https://sites.google.com/view/marketerbbc/halaman-muka](https://sites.google.com/view/marketerbbc/halaman-muka)**  
> **Status Tata Letak**: **100% Optimal** (Lebar penuh 12-kolom `1154px`, Tinggi nyaman `1301px`, Header minimalis tanpa pemborosan vertikal, Navigasi Atas Transparan, dan Mendukung Mode Layar Penuh).

Selamat datang! Dokumen ini adalah panduan lengkap dan profesional untuk menerapkan dan mengelola **Aplikasi Monitoring Target Account Officer (AO Kredit & AO Pemasaran) PT Bank Pembangunan Daerah Bengkulu (Bank Bengkulu)** menggunakan platform **Google Sites**.

---

## 📌 Ringkasan Solusi

Aplikasi dirancang secara profesional dengan karakteristik:
1. **Identitas Resmi Bank Bengkulu**: Mengusung logo resmi Bank Bengkulu (emblem dua huruf 'B' saling mengikat) dan palet warna korporat (*Hijau Pertumbuhan #006837 & Oranye Ketangguhan #F56013 - filosofi "Tangguh dan Tumbuh"*), font modern (*Plus Jakarta Sans*), serta tata letak dashboard eksekutif perbankan yang bersih dan elegan.
2. **Dua Mode Peran**:
   - **AO Kredit (Lending)**: Memantau target & realisasi plafon pinjaman (Kredit Pegawai/ASN, UMKM, KUR), rasio NPL/kualitas kredit, dan debitur baru (NoA).
   - **AO Pemasaran (Funding & Jasa)**: Memantau Dana Pihak Ketiga (DPK - Tabungan, Deposito, Giro), rasio dana murah (*CASA*), penambahan rekening, serta akuisisi merchant QRIS dan Mobile Banking Bengkulu.
3. **Interaktif & Responsif**: Dilengkapi filter Kantor Cabang (seluruh wilayah kabupaten/kota di Bengkulu + KC Jakarta), status capaian target (≥100%, 80-99%, <80%), pencarian nama/NIP real-time, visualisasi grafik interaktif (Chart.js), dan modal detail portofolio.
4. **Daftar Pipeline & Tracking Progress per AO (Fitur Baru)**:
   - Setiap Account Officer memiliki daftar prospek calon nasabah / debitur aktif lengkap dengan estimasi nominal (Juta Rp), jenis produk, dan target closing.
   - **5 Tahapan Progress AO Kredit**: (1) Inisiasi & Berkas (20%) ➔ (2) Verifikasi & SLIK OJK (40%) ➔ (3) Analisa Finansial & OTS (60%) ➔ (4) Persetujuan Komite Kredit (80%) ➔ (5) Akad & Pencairan Plafon (100%).
   - **5 Tahapan Progress AO Pemasaran**: (1) Penjajakan & Pendekatan (20%) ➔ (2) Presentasi Produk & Solusi (40%) ➔ (3) Negosiasi Suku Bunga & Syarat (60%) ➔ (4) Penyusunan PKS & Buka Rekening (80%) ➔ (5) Aktivasi Saldo & Onboarding QRIS (100%).
5. **Akun Khusus & Input Data Mandiri per AO (Fitur Baru)**:
   - Setiap Account Officer memiliki akun login tersendiri (menggunakan NIP dan PIN 6-digit, bawaan: `123456`).
   - **Formulir Input Kinerja Mandiri**: AO dapat memperbarui realisasi portofolio saat ini, rincian produk sub-portofolio, metrik NPL / CASA & NoA, serta catatan rencana kerja harian/mingguan.
   - **Workspace Pribadi (*Banner AO Workspace*)**: Menampilkan capaian individu, target, dan pintasan input data cepat begitu AO berhasil masuk.
   - **Keamanan & Otorisasi Berjenjang (RBAC)**: AO hanya berhak mengedit data kinerjanya sendiri (data rekan kerja hanya dapat dilihat/read-only), sedangkan akun Pimpinan/Admin (`PIMPINAN` / `admin123`) memiliki akses penuh untuk seluruh cabang.
6. **Papan Kanban Pipeline Terpusat (*Funnel Pipeline Multi-Cabang*)**:
   - Menampilkan seluruh prospek nasabah Bank Bengkulu dalam visualisasi kolom Kanban 5 tahapan alur proses.
   - Pimpinan dapat memantau akumulasi nominal prospek di setiap tahapan, menyaring per divisi/cabang, dan memajukan/memundurkan status tahapan secara langsung.
7. **Kalkulator Simulasi Pembiayaan Bank Bengkulu (*Field Tool*)**:
   - Membantu AO menghitung estimasi angsuran bulanan secara instan di depan calon nasabah dengan suku bunga resmi (Multiguna ASN 9.5%, KUR Subsidi 6%, KMK 11%, KPR 8.75%).
   - Mendukung perhitungan Anuitas Efektif dan Flat, rasio kapasitas cicilan (DSR 60%), serta tombol sekali klik untuk membagikan rincian simulasi via WhatsApp ke nasabah.
8. **Jejak Audit & Riwayat Aktivitas (*Audit Trail Log*)**:
   - Mencatat seluruh riwayat pembaruan kinerja, pergeseran tahapan prospek, dan perubahan PIN akun secara transparan demi standar tata kelola perbankan (*Good Corporate Governance*).
9. **Dukungan Google Sheets & Sinkronisasi Dua Arah (*Two-Way Cloud Sync*)**:
   - Dapat dijalankan secara mandiri (*standalone/offline*) maupun terhubung dua arah (*live sync*) dengan Google Sheets via Google Apps Script Web App (Code.gs).

---

## 🚀 Pilihan Metode Pemasangan di Google Sites

Terdapat 2 metode yang dapat Anda pilih sesuai kebutuhan operasional bank:

| Fitur | Metode 1: Sematkan Kode HTML Langsung (Paling Cepat) | Metode 2: Google Sheets + Google Sites (Live Update) |
|---|---|---|
| **Waktu Pengerjaan** | 3 - 5 Menit | 10 - 15 Menit |
| **Kebutuhan Teknis** | Sangat Mudah (Copy & Paste) | Mudah (Buat Spreadsheet & Publish CSV) |
| **Update Data Harian** | Melalui Form Tambah AO di UI atau edit file | Cukup ketik angka di Google Sheets, Google Sites otomatis terupdate |
| **Rekomendasi** | Sangat cocok untuk demonstrasi cepat, portal cabang, atau presentasi pimpinan | Sangat cocok untuk produksi operasional harian terpusat |

---

## 📋 LANGKAH DEMI LANGKAH: METODE 1 (Sematkan Kode Langsung)

Metode ini adalah cara paling instan dan paling stabil untuk menampilkan dashboard di Google Sites.

### Langkah 1: Buka Google Sites
1. Buka browser dan kunjungi: **[https://sites.google.com/](https://sites.google.com/)**
2. Masuk menggunakan akun Google / Google Workspace Bank Bengkulu Anda.
3. Klik tombol **`+ Kosong`** (Blank Site) untuk membuat halaman baru.

### Langkah 2: Atur Header & Judul Halaman Google Sites
1. Pada bagian header atas Google Sites:
   - Ketik nama dokumen situs di pojok kiri atas: `SMART-AO Bank Bengkulu`.
   - Judul spanduk (banner) atas dapat diisi: `Sistem Informasi Kinerja & Target AO Bank Bengkulu`.
   - Jenis Header: Anda bisa memilih `Spanduk` (Banner) atau `Hanya Judul` agar tampilan dashboard di bawahnya lebih lega.

### Langkah 3: Sematkan Kode Dashboard
1. Pada panel sebelah kanan Google Sites, pilih tab **`Sisipkan` (Insert)**.
2. Klik tombol **`Sematkan` (Embed)** (ikon `< >`).
3. Pada jendela semat yang muncul, pilih tab **`Sematkan kode` (Embed code)**.
4. Buka file **`index.html`** yang telah kami buat di folder ini:
   - Buka file `index.html` dengan teks editor atau salin seluruh isinya.
   - Tempel (*Paste*) seluruh kode ke dalam kotak **Sematkan kode** di Google Sites.
5. Klik tombol **`Berikutnya` (Next)**, lalu klik **`Sisipkan` (Insert)**.

### Langkah 4: Sesuaikan Ukuran Bingkai (Frame)
1. Kotak aplikasi sekarang akan muncul di kanvas halaman Google Sites.
2. **Tarik titik biru di sisi kiri dan kanan** bingkai hingga memenuhi lebar halaman penuh (100% full width).
3. **Tarik titik biru di sisi bawah** ke arah bawah hingga tingginya memuat seluruh tabel dan grafik (disarankan tinggi sekitar `900px - 1100px`) sehingga pengunjung dapat scroll dengan mulus di dalam dashboard.

### Langkah 5: Publikasikan Situs
1. Klik tombol warna biru **`Publikasikan` (Publish)** di pojok kanan atas.
2. Tentukan Alamat Web (misalnya: `kinerja-ao-bankbengkulu`).
3. **Atur Siapa yang Dapat Melihat**:
   - Untuk keamanan perbankan, klik **Kelola (Manage)** di bawah opsi *Siapa yang dapat melihat situs saya*.
   - Ubah dari *Publik* menjadi **Terbatas (Restricted)** hanya untuk pengguna dengan email resmi Bank Bengkulu (Google Workspace domain `@bankbengkulu.co.id`).
4. Klik **Publikasikan**. Situs kini siap diakses melalui laptop, tablet, maupun smartphone seluruh pegawai!

---

## 📊 LANGKAH DEMI LANGKAH: METODE 2 (Terkoneksi Live Google Sheets)

Jika Anda ingin divisi bisnis atau supervisor di masing-masing cabang cukup menginput data target dan realisasi di spreadsheet, dan dashboard di Google Sites langsung otomatis menampilkan data terbaru:

### Langkah 1: Buat Dokumen Google Sheets
1. Buka [https://sheets.google.com/](https://sheets.google.com/) dan buat spreadsheet baru.
2. Beri nama: `Database_Target_AO_Bank_Bengkulu`.
3. Salin kolom dan data dari file template yang kami sediakan: **`template_data_ao_bank_bengkulu.csv`**.
4. Struktur kolom Google Sheets wajib mengikuti urutan berikut:

| Kolom A | Kolom B | Kolom C | Kolom D | Kolom E | Kolom F | Kolom G | Kolom H | Kolom I |
|---|---|---|---|---|---|---|---|---|
| **Kategori** | **NIP** | **Nama** | **Cabang** | **Target_Juta** | **Realisasi_Juta** | **NPL_atau_CASA** | **NoA_Nasabah** | **Kol2_DPK** |
| `kredit` | `BB-1988021` | Agus Triono S.E. | KC Utama Bengkulu | `15000` | `16850` | `0.42` | `104` | `0.85` |
| `pemasaran` | `BB-2019012` | Siti Nurhaliza S.E. | KC Utama Bengkulu | `25000` | `27800` | `68.5` | `340` | `0` |

> *Catatan: Nominal Target dan Realisasi diisi dalam satuan Juta Rupiah (contoh: 15 Miliar ditulis `15000`, 500 Juta ditulis `500`). Kolom `Kol2_DPK` digunakan untuk Early Warning System (EWS) kredit Dalam Perhatian Khusus.*

### Langkah 2: Publikasikan Google Sheets sebagai CSV
1. Pada menu Google Sheets, klik **File** > **Bagikan (Share)** > **Publikasikan ke web (Publish to web)**.
2. Pada tab *Tautan (Link)*:
   - Pilih sheet yang berisi data (misal: *Sheet1* atau *Seluruh Dokumen*).
   - Ubah jenis format dari *Halaman Web* menjadi **Nilai yang dipisahkan koma (.csv)**.
3. Klik tombol **Publikasikan (Publish)** dan konfirmasi.
4. Salin tautan (URL) yang dihasilkan (contoh bentuk URL: `https://docs.google.com/spreadsheets/d/e/.../pub?output=csv`).

### Langkah 3: Masukkan Tautan ke Dashboard
1. Buka Dashboard yang sudah disematkan di Google Sites (atau buka `index.html`).
2. Di pojok kanan atas dashboard, klik tombol **"Sumber Data"**.
3. Tempelkan tautan CSV Google Sheets yang telah Anda salin ke kolom input.
4. Klik **Simpan & Muat Ulang**.
5. Dashboard seketika membaca data langsung dari spreadsheet Anda secara real-time!

---

## 👤 Panduan Penggunaan Akun & Input Data Mandiri per AO

Sistem kini dilengkapi dengan manajemen autentikasi berjenjang sehingga setiap Account Officer memiliki akun pribadi untuk memperbarui kinerjanya:

### 1. Kredensial Masuk (Login)
- **Akun AO (Kredit & Pemasaran)**:
  - **Pemilihan Cepat**: Pada jendela login, AO dapat langsung memilih namanya melalui menu *dropdown* (dikelompokkan berdasarkan cabang dan divisi), atau mengetik **NIP** masing-masing (contoh: `BB-1988021`).
  - **PIN Bawaan (Default)**: `123456`.
- **Akun Pimpinan / Administrator Cabang**:
  - **ID / NIP**: `PIMPINAN` (atau `admin`).
  - **Sandi**: `admin123`.

### 2. Cara AO Menginput / Memperbarui Kinerja:
1. Klik tombol **"Masuk Akun AO"** di pojok kanan atas dashboard.
2. Pilih nama Anda dari daftar, masukkan PIN `123456`, lalu klik **"Masuk Sekarang"**.
3. Setelah berhasil masuk, muncul **Banner Workspace Pribadi** di atas dashboard.
4. Klik tombol **"Input Kinerja Saya"** untuk membuka formulir mandiri:
   - **Total Realisasi (Juta Rp)**: Masukkan capaian terbaru (contoh: `15200` untuk Rp 15,2 M).
   - **Rincian Per Produk**: Sesuaikan alokasi realisasi tiap produk (Multiguna, KUR, KMK, Deposito, dll).
   - **Metrik Kualitas**: Update rasio NPL (%) dan penyerapan debitur (NoA) untuk AO Kredit, atau rasio CASA (%) dan penambahan rekening & QRIS untuk AO Pemasaran.
   - **Catatan Kerja**: Ketik catatan aktivitas mingguan atau kendala lapangan.
5. Klik **"Simpan Pembaruan Kinerja"**. Data otomatis tersimpan, grafik Chart.js dan tabel langsung diperbarui.

### 3. Hak Akses & Keamanan Data (RBAC):
- **AO Individu**: Hanya memiliki hak akses untuk menginput data kinerja dan mengelola pipeline calon nasabah miliknya sendiri. Data AO rekan kerja lain ditampilkan dalam mode *Read-Only* (hanya lihat).
- **Pimpinan Cabang**: Memiliki akses supervisi penuh untuk mengedit seluruh AO dan menambahkan pegawai baru.
- **Ganti PIN**: Setiap AO dapat mengganti PIN keamanannya sendiri melalui ikon kunci di samping nama profil.

---

## 🧭 Fitur Tambahan & Produktivitas AO Lapangan

### 1. Papan Kanban Pipeline (*Centralized Funnel*)
- Klik tab navigasi **"Papan Kanban Pipeline"** di header atas.
- Pimpinan dan AO dapat melihat sebaran seluruh prospek dalam 5 kolom tahapan (*1. Inisiasi ➔ 2. Verifikasi/SLIK ➔ 3. Analisa/OTS ➔ 4. Komite ➔ 5. Akad/Cair*).
- Gunakan filter divisi (*Semua / Kredit / Pemasaran*) atau filter cabang untuk memfokuskan pemantauan.
- Klik tombol panah `[ ◀ ]` atau `[ ▶ ]` pada kartu untuk menggeser tahapan prospek langsung dari papan kanban.

### 2. Kalkulator Simulasi Pembiayaan Bank Bengkulu
- Klik tombol **"Simulasi Kredit"** di header atau di banner workspace AO.
- Pilih salah satu skema produk: *Multiguna ASN (9.5%), KUR Mikro/Ritel (6.0%), KMK Komersial (11.0%), atau KPR Sejahtera (8.75%)*.
- Sesuaikan plafon pinjaman dan geser jangka waktu (tenor).
- Sistem seketika mengkalkulasi angsuran bulanan, total bunga, dan estimasi gaji bersih minimal (DSR 60%).
- Klik **"Kirim via WhatsApp ke Nasabah"** untuk mengirimkan simulasi resmi berformat rapi langsung ke nomor calon nasabah.

### 3. Riwayat Aktivitas & Jejak Audit (*Audit Trail Log*)
- Klik tombol **"Log Audit"** di header atas untuk meninjau riwayat mutasi data kinerja, input pipeline, maupun pergeseran tahapan yang dilakukan seluruh pengguna secara transparan.

---

## 🔒 Standar Keamanan & Tata Kelola Perbankan (Bank Governance)

Untuk menjaga kerahasiaan target bisnis internal Bank Bengkulu:
1. **Akses Berbasis Domain**: Selalu pasang visibilitas Google Sites pada mode **Organisasi Internal** (hanya akun yang terafiliasi dengan Google Workspace Bank Bengkulu yang diizinkan membuka tautan).
2. **Hak Akses Google Sheets**:
   - Kolom target hanya dapat diedit oleh *Pemimpin Seksi Pemasaran / Pemimpin Cabang / Administrator Bisnis*.
   - Account Officer diberikan hak akses *Lihat Saja (Viewer)*.
3. **Backup Data Rutin**: Lakukan unduhan berkala dengan tombol **Export CSV** yang tersedia langsung di dashboard untuk arsip laporan bulanan ke Divisi Perencanaan & Strategi Bisnis Kantor Pusat.

---

## 💡 Bantuan dan Kustomisasi Lebih Lanjut

Jika di kemudian hari diperlukan penambahan metrik khusus seperti:
- Integrasi Single Sign-On (SSO) Bank Bengkulu
- Perhitungan poin insentif otomatis per AO sesuai SK Direksi
- Peta interaktif sebaran debitur per kabupaten se-Provinsi Bengkulu

Seluruh arsitektur kode pada `index.html` dibuat modular, terstruktur, dan mudah dikembangkan lebih lanjut.
