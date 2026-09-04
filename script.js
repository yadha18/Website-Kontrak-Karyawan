/**
 * ============================================================================
 * HRIS APP - CLEAN ARCHITECTURE
 * ============================================================================
 */

// ─── 1. CONFIGURATION & CONSTANTS ───────────────────────────────────────────
const CONFIG = {
  // ✅ DIUBAH: data disimpan di MongoDB lewat Vercel Serverless Functions (folder /api).
  // Dibiarkan '' karena frontend & API sama-sama di-deploy di domain Vercel yang sama
  // (same-origin) — fetch('/api/state') otomatis diarahkan ke /api/state.js.
  API_BASE_URL: '',
  STORAGE_KEYS: {
    KARYAWAN: 'hris_karyawan_v10',
    JABATAN:  'hris_jabatan_v8',
    LOG:      'hris_changes_v9',
    SLOT_CONFIG: 'hris_slot_config_v1' // ✅ BARU: penyimpanan slot fix yang bisa diedit
  },
  // ✅ BARU: Password superadmin untuk mengedit slot fix jabatan (client-side gate)
  SUPERADMIN_PASSWORD: 'admin264',
  DEFAULT_JABATAN: [
    'ACCOUNT EXECUTIVE GRADE 1', 'ACCOUNT EXECUTIVE GRADE 2', 'COLLECTION SBU',
    'ACCOUNT MANAGER JUNIOR', 'ACCOUNT MANAGER SENIOR', 'OFFICER MARKETING',
    'VALIDASI SBU', 'ADMINISTRASI SALES', 'COLLECTION PUSAT', 'DATA ANALYST & DESIGN ENGINEER'
  ],
  DEFAULT_SBU: [
    'SUMATERA BAGIAN UTARA', 'SUMATERA BAGIAN TENGAH', 'SUMATERA BAGIAN SELATAN',
    'SULAWESI & INDONESIA TIMUR', 'KALIMANTAN', 'JAWA BAGIAN TIMUR',
    'JAWA BAGIAN TENGAH', 'JAWA BAGIAN BARAT', 'JAKARTA & BANTEN',
    'BALI & NUSA TENGGARA', 'PUSAT'
  ],
  // ✅ BARU: Daftar opsi dropdown BKO Jabatan
  DEFAULT_BKO_JABATAN: [
    'ACCOUNT EXECUTIVE GRADE 1', 'ACCOUNT EXECUTIVE GRADE 2', 'COLLECTION SBU',
    'ACCOUNT MANAGER JUNIOR', 'ACCOUNT MANAGER SENIOR', 'OFFICER MARKETING',
    'VALIDASI SBU', 'ADMINISTRASI SALES', 'COLLECTION PUSAT', 'DATA ANALYST & DESIGN ENGINEER'
  ],
  // ✅ BARU: Daftar opsi dropdown BKO SBU
  DEFAULT_BKO_SBU: [
    'SUMATERA BAGIAN UTARA', 'SUMATERA BAGIAN TENGAH', 'SUMATERA BAGIAN SELATAN',
    'SULAWESI & INDONESIA TIMUR', 'KALIMANTAN', 'JAWA BAGIAN TIMUR',
    'JAWA BAGIAN TENGAH', 'JAWA BAGIAN BARAT', 'JAKARTA & BANTEN',
    'BALI & NUSA TENGGARA', 'PUSAT'
  ],

  // ✅ BARU: Peta alias SBU — setiap alias (keyword) dipetakan ke nama resmi
  // Pencocokan dilakukan dengan contains (includes), bukan exact match
  SBU_ALIAS_MAP: [
    {
      canonical: 'SUMATERA BAGIAN UTARA',
      aliases: ['SBU', 'SUMBAGUT', 'PADANG SIDEMPUAN', 'MEDAN', 'ACEH']
    },
    {
      canonical: 'SUMATERA BAGIAN TENGAH',
      aliases: ['SBT', 'SUMBAGTENG', 'PEKANBARU', 'PEKAN BARU']
    },
    {
      canonical: 'SUMATERA BAGIAN SELATAN',
      aliases: ['SBS', 'SUMBAGSEL', 'JAMBI', 'PALEMBANG', 'LAMPUNG', 'BANGKA BELITUNG', 'BELITUNG', 'BENGKULU']
    },
    {
      canonical: 'JAWA BAGIAN BARAT',
      aliases: ['JBB', 'JABAR', 'JAWA BARAT', 'BANDUNG']
    },
    {
      canonical: 'JAWA BAGIAN TENGAH',
      aliases: ['JBTG', 'JATENG', 'JAWA TENGAH', 'SEMARANG']
    },
    {
      canonical: 'JAWA BAGIAN TIMUR',
      aliases: ['JBT', 'JATIM', 'JAWA TIMUR', 'SURABAYA', 'MADIUN']
    },
    {
      canonical: 'JAKARTA & BANTEN',
      aliases: ['JKB', 'JAKBAN', 'JAKARTA & BANTEN', 'JAKARTA', 'BANTEN']
    },
    {
      canonical: 'KALIMANTAN',
      aliases: ['BALIKPAPAN', 'PONTIANAK', 'BANJARMASIN', 'KAL', 'KALTIM', 'KALBAR', 'KALTENG', 'KALSEL', 'SAMARINDA']
    },
    {
      canonical: 'SULAWESI & INDONESIA TIMUR',
      aliases: ['RIT', 'SIBT', 'SIT', 'SULAWESI', 'MAKASSAR', 'NTB', 'NUSA TENGGARA BARAT']
    },
    {
      canonical: 'BALI & NUSA TENGGARA',
      aliases: ['BNT', 'BALI', 'NTT', 'NUSA TENGGARA TIMUR']
    }
  ],

  // ✅ BARU: Peta alias Jabatan — exact match terhadap alias, dipetakan ke nama resmi
  // Berbeda dengan SBU yang pakai contains, Jabatan pakai EXACT MATCH
  // agar tidak terjadi false-positive (misal "COLLECTION SBU" vs "COLLECTION")
  JABATAN_ALIAS_MAP: [
    {
      canonical: 'VALIDASI SBU',
      aliases: ['VERIFICATOR']
    },
    {
      canonical: 'DATA ANALYST & DESIGN ENGINEER',
      aliases: ['DATA ANALYST & INFOGRAFIS ENGINEER']
    },
    {
      canonical: 'OFFICER MARKETING',
      aliases: ['OFFICER MARKETING RETAIL']
    },
    {
      canonical: 'ACCOUNT EXECUTIVE GRADE 1',
      aliases: ['ACCOUNT EXECUTIVE RETAIL GRADE 1']
    },
    {
      canonical: 'ACCOUNT EXECUTIVE GRADE 2',
      aliases: ['ACCOUNT EXECUTIVE RETAIL GRADE 2']
    },
    {
      canonical: 'ACCOUNT MANAGER JUNIOR',
      aliases: ['ACCOUNT MANAGER JUNIOR RETAIL']
    },
    {
      canonical: 'ACCOUNT MANAGER SENIOR',
      aliases: ['ACCOUNT MANAGER SENIOR RETAIL']
    },
    {
      canonical: 'COLLECTION PUSAT',
      aliases: ['COLLECTION']
    },
    {
      canonical: 'COLLECTION SBU',
      aliases: ['COLLECTION SBU']
    }
  ],

  // ✅ BARU: Opsi dropdown ukuran baju
  UKURAN_BAJU: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],

  // ✅ BARU: Konfigurasi Dashboard Non PO (Data Lembur & SPPD Karyawan)
  TAGIHAN_OPTIONS: ['SPPD 1 2', 'Lembur'],
  PAGU_PER_BULAN_STATIC: 15000000, // angka statis per SBU (poin 9)
  MAN_FEE_PERSEN: 0.07,            // 7% dari Total Realisasi (poin 4)

  // ✅ BARU: Daftar bulan baku untuk Data Lembur & SPPD Karyawan tahun 2026 (breakdown per bulan di sidebar)
  BULAN_NAMA: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
  TAHUN_LEMBUR_LIST: [2026, 2027], // ✅ DIUBAH: dukung multi-tahun untuk breakdown Data Lembur & SPPD
  TAHUN_LEMBUR: 2026, // tahun default (dipakai saat teks Bulan tidak menyebutkan tahun)
  get BULAN_OPTIONS() {
    const list = [];
    this.TAHUN_LEMBUR_LIST.forEach(th => this.BULAN_NAMA.forEach(b => list.push(`${b} ${th}`)));
    return list;
  },

  // ✅ BARU: Konfigurasi Monitoring Pengadaan Laptop
  STATUS_LAPTOP_OPTIONS: ['Aktif', 'Belum Dikembalikan', 'Sudah Dikembalikan']

  // ✅ DIHAPUS: SLOT_PER_SBU & TOTAL_SLOT_KARYAWAN statis tidak dipakai lagi.
  // Slot Jabatan per SBU sekarang dibangun otomatis dari data Excel yang
  // diupload pertama kali (lihat EmployeeService.buildSlotConfigFromData),
  // lalu tersimpan di AppState.slotConfig (bisa diedit manual oleh superadmin
  // lewat modal "Edit Slot").
};

const STATUS_DEF = {
  'Baru Masuk': { pill: 'pill-green',  label: '🟢 Baru Masuk' },
  'Aktif':      { pill: 'pill-blue',   label: '🔵 Aktif' },
  'Resign':     { pill: 'pill-red',    label: '🔴 Resign' },
};

// ─── 2. STATE MANAGEMENT ────────────────────────────────────────────────────
const AppState = {
  karyawan: [],
  jabatan: [],
  log: [],
  previewUpload: [],
  slotConfig: {}, // ✅ DIUBAH: dibangun otomatis dari Excel yang diupload pertama kali, bisa diedit & disimpan

  // ✅ BARU: Data Lembur & SPPD Karyawan + konfigurasi Dashboard Non PO
  lembur: [],
  lemburSbuConfig: {}, // { [sbu]: { paguNonPO: number (tahunan), bnlp: number (tahunan) } }
  tiketHPI: 0,          // Tiket Dibelikan HPI (diisi manual)
  uploadDataType: 'karyawan', // 'karyawan' | 'lembur' — jenis data yang sedang dipilih di halaman Upload

  pagination: { page: 1, size: 10 },
  logPagination: { page: 1, size: 10 }, // ✅ BARU: pagination untuk Review Log Perubahan
  lemburPagination: { page: 1, size: 10 }, // ✅ BARU: pagination untuk Tabel Data Lembur dan SPPD Karyawan
  selectedBulan: null,      // ✅ BARU: bulan yang sedang aktif dipilih dari sidebar (wajib pilih 1 bulan)
  lemburViewTab: 'dashboard', // ✅ BARU: 'dashboard' | 'tabel' — tab aktif di halaman bulan Lembur & SPPD

  // ✅ BARU: Monitoring Pengadaan Laptop
  laptop: [],
  laptopPagination: { page: 1, size: 10 },

  modals: { editTargetId: null, statusTargetId: null, statusListTarget: null, lemburEditId: null, laptopEditId: null, laptopDetailNIP: null, pendingBuktiBA: null, pendingBuktiBAFileName: null },
  slotPanelOpen: {}, // ✅ BARU: state buka/tutup accordion slot per SBU, key = nama SBU
  slotJabatanPanelOpen: {}, // ✅ BARU: state buka/tutup dropdown nama karyawan per Jabatan, key = "SBU::Jabatan"

  // ✅ BARU: State autentikasi superadmin (khusus sesi ini, reset saat reload halaman)
  superadminAuthed: false,
  pendingSuperadminAction: null, // fungsi yang dijalankan setelah password benar
  editSlotTarget: null // nama SBU yang sedang diedit slotnya
};

// ─── 3. DATA MODELS (CONTROLLED STRUCTURE) ──────────────────────────────────
const Models = {
  Karyawan(data = {}) {
    return {
      id:            data.id || Utils.generateId(),
      NIP:           String(data.NIP || '').trim(),
      Nama:          String(data.Nama || '').trim(),
      NIK:           String(data.NIK || '').trim(),                          // ✅ BARU
      Grade:         String(data.Grade || '').trim().toUpperCase(),          // ✅ BARU
      Jabatan:       Utils.resolveJabatan(String(data.Jabatan || '').trim()),
      SBU:           Utils.resolveSBU(String(data.SBU || '').trim()),
      BKOJabatan:    Utils.resolveJabatan(String(data.BKOJabatan || '').trim()),
      BKOSBU:        Utils.resolveSBU(String(data.BKOSBU || '').trim()),
      NIPBaru:       String(data.NIPBaru || '').trim(),
      Email:         String(data.Email || '').trim(),                        // Email Pribadi (lama)
      EmailKorporat: String(data.EmailKorporat || '').trim(),                // ✅ BARU
      NamaAkunICRM:  String(data.NamaAkunICRM || '').trim(),                 // ✅ BARU
      TglMasuk:      String(data.TglMasuk || '').trim(),                     // ✅ BARU
      TglKeluar:     String(data.TglKeluar || '').trim(),                    // ✅ BARU
      UkuranBaju:    String(data.UkuranBaju || '').trim().toUpperCase(),     // ✅ BARU
      NoTelp:        Utils.normalizePhone(data.NoTelp || ''),                // ✅ BARU
      TglUpdate:     data.TglUpdate || Utils.getTodayDate(),
      Status:        Utils.normalizeStatus(data.Status),
      StatusManual:  typeof data.StatusManual === 'boolean' ? data.StatusManual : false,
      StatusCatatan: data.StatusCatatan || ''
    };
  },

  LogChange(nik, nama, type, oldVal, newVal, catatan = '') {
    return {
      id: Utils.generateId(),
      ts: Utils.getTodayDate(),
      nik, nama, type,
      oldVal: oldVal || '-',
      newVal: newVal || '-',
      catatan
    };
  },

  // ✅ BARU: Model data satu baris Lembur / SPPD Karyawan
  Lembur(data = {}) {
    return {
      id:      data.id || Utils.generateId(),
      NIP:     String(data.NIP || '').trim(),
      Nama:    String(data.Nama || '').trim(),
      Nominal: Utils.parseNominal(data.Nominal),
      SBU:     Utils.resolveSBU(String(data.SBU || '').trim()),
      Jabatan: Utils.resolveJabatan(String(data.Jabatan || '').trim()),
      Bulan:   Utils.normalizeBulan(data.Bulan),
      Tagihan: Utils.normalizeTagihan(data.Tagihan) // "SPPD 1 2" | "Lembur"
    };
  },

  // ✅ BARU: Model data satu baris Monitoring Pengadaan Laptop
  Laptop(data = {}) {
    return {
      id:              data.id || Utils.generateId(),
      NIP:             String(data.NIP || '').trim(),
      NamaPerangkat:   String(data.NamaPerangkat || '').trim(),
      PA:              String(data.PA || '').trim(),
      NamaPengguna:    String(data.NamaPengguna || '').trim(),
      SerialNumber:    String(data.SerialNumber || '').trim(),
      SBU:             Utils.resolveSBU(String(data.SBU || '').trim()),
      Status:          Utils.normalizeStatusLaptop(data.Status),
      BuktiBA:         data.BuktiBA || null,          // base64 data URL gambar berita acara (dikompres)
      BuktiBAFileName: data.BuktiBAFileName || null
    };
  }
};

// ─── 4. UTILITIES ───────────────────────────────────────────────────────────
// ─── THEME SERVICE ───────────────────────────────────────────────────────────
// ✅ BARU: Toggle Light Mode / Dark Mode. Preferensi tema disimpan di localStorage
// browser (bukan MongoDB) karena ini murni preferensi tampilan per-perangkat,
// bukan data aplikasi yang perlu dibagi antar user/komputer.
const ThemeService = {
  KEY: 'hris_theme',

  init() {
    // data-theme sudah di-set lebih awal oleh inline script di <head> (mencegah kedipan tema).
    // Posisi thumb & ikon switch sepenuhnya mengikuti atribut data-theme lewat CSS,
    // jadi tidak perlu manipulasi DOM tambahan di sini.
  },

  current() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  },

  toggle() {
    const next = this.current() === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(this.KEY, next); } catch (e) {}
  }
};

const Utils = {
  // ✅ BARU: Generator ID unik yang aman dipanggil berkali-kali dengan sangat cepat
  // (mis. saat bulk upload ratusan baris dalam satu event loop). Menggantikan
  // `Date.now() + Math.random()` yang lama — pendekatan itu bisa menghasilkan ID
  // DUPLIKAT karena presisi desimal JavaScript terbatas (~15-17 digit signifikan)
  // ketika sebuah pecahan acak ditambahkan ke angka timestamp yang sudah 13 digit,
  // sehingga bagian desimalnya bisa terpotong dan bertabrakan antar baris yang dibuat
  // di milidetik yang sama. Ini adalah penyebab bug "detail/edit menampilkan karyawan
  // lain" — counter monotonic di bawah ini menjamin setiap ID selalu unik & bertambah.
  _idCounter: Date.now(),
  generateId() {
    this._idCounter += 1;
    return this._idCounter;
  },
  getTodayDate() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  },

  // ✅ BARU: Hitung jumlah bulan kalender penuh yang sudah lewat sejak suatu tanggal (format YYYY-MM-DD)
  // Menggunakan perhitungan kalender (bukan flat 30 hari) agar akurat untuk bulan yang panjangnya berbeda-beda.
  // Return null jika tanggal tidak valid/kosong.
  monthsSince(dateStr) {
    if (!dateStr) return null;
    const start = new Date(dateStr);
    if (isNaN(start.getTime())) return null;
    const now = new Date();

    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (now.getDate() < start.getDate()) months -= 1; // belum genap sebulan penuh di tanggal berjalan
    return Math.max(0, months);
  },

  // ✅ BARU: Deep clone sederhana untuk objek/array JSON-safe
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  // ✅ BARU: Hitung jumlah bulan kalender penuh ANTARA dua tanggal (format YYYY-MM-DD).
  // Dipakai untuk menghitung durasi menjabat di histori perpindahan jabatan.
  // endStr kosong/null berarti "sampai sekarang". Return null jika startStr tidak valid.
  monthsBetweenDates(startStr, endStr) {
    if (!startStr) return null;
    const start = new Date(startStr);
    if (isNaN(start.getTime())) return null;
    const end = endStr ? new Date(endStr) : new Date();
    if (isNaN(end.getTime())) return null;

    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (end.getDate() < start.getDate()) months -= 1;
    return Math.max(0, months);
  },

  // ✅ BARU: Format jumlah bulan menjadi teks durasi yang mudah dibaca ("2 tahun 3 bulan", dst)
  formatDurationMonths(months) {
    if (months === null || months === undefined) return '—';
    const years = Math.floor(months / 12);
    const rem = months % 12;
    if (years > 0 && rem > 0) return `${years} tahun ${rem} bulan`;
    if (years > 0) return `${years} tahun`;
    if (months === 0) return '< 1 bulan';
    return `${months} bulan`;
  },

  // ✅ BARU: Format tanggal YYYY-MM-DD menjadi format Indonesia yang lebih mudah dibaca
  formatDateID(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  },

  // ✅ BARU: Total slot fix untuk satu SBU = jumlah semua slot jabatan di dalamnya
  slotSBUTotal(sbu) {
    const detail = AppState.slotConfig[sbu];
    if (!detail || !detail.jabatan) return 0;
    return Object.values(detail.jabatan).reduce((sum, v) => sum + (Number(v) || 0), 0);
  },

  // ✅ BARU: Total slot fix keseluruhan (dihitung dinamis dari slotConfig, bukan angka statis)
  getTotalSlotFix() {
    return Object.keys(AppState.slotConfig).reduce((sum, sbu) => sum + Utils.slotSBUTotal(sbu), 0);
  },

  // ✅ BARU: Resolve alias SBU ke nama resmi
  // Cara kerja: jika input PERSIS sama dengan canonical → langsung return.
  // Jika tidak, cek apakah input MENGANDUNG salah satu alias (keyword).
  // Alias lebih panjang dicek duluan (sorted by length desc) agar "JAWA BARAT"
  // tidak salah dipetakan hanya karena mengandung "BARAT".
  resolveSBU(raw) {
    if (!raw) return raw;
    const upper = String(raw).trim().toUpperCase();

    // 1. Exact match ke nama canonical — langsung kembalikan
    const exactCanonical = CONFIG.DEFAULT_SBU.find(s => s === upper);
    if (exactCanonical) return exactCanonical;

    // 2. Cek alias — urutkan alias terpanjang dulu supaya lebih spesifik
    for (const entry of CONFIG.SBU_ALIAS_MAP) {
      const sortedAliases = [...entry.aliases].sort((a, b) => b.length - a.length);
      for (const alias of sortedAliases) {
        if (upper.includes(alias)) return entry.canonical;
      }
    }

    // 3. Tidak cocok — kembalikan nilai asli (uppercase)
    return upper;
  },

  // ✅ BARU: Resolve alias Jabatan ke nama resmi (exact match)
  // Pakai exact match, bukan contains, agar "COLLECTION SBU" tidak
  // salah terpetakan ke "COLLECTION PUSAT" hanya karena mengandung "COLLECTION".
  // Alias terpanjang dicek duluan untuk antisipasi overlap di masa depan.
  resolveJabatan(raw) {
    if (!raw) return raw;
    const upper = String(raw).trim().toUpperCase();

    // 1. Exact match ke nama canonical dari DEFAULT_JABATAN — langsung kembalikan
    const exactCanonical = CONFIG.DEFAULT_JABATAN.find(j => j === upper);
    if (exactCanonical) return exactCanonical;

    // 2. Cek alias (exact match) — alias terpanjang dicek duluan
    for (const entry of CONFIG.JABATAN_ALIAS_MAP) {
      const sortedAliases = [...entry.aliases].sort((a, b) => b.length - a.length);
      for (const alias of sortedAliases) {
        if (upper === alias) return entry.canonical;
      }
    }

    // 3. Tidak cocok — kembalikan nilai asli (uppercase)
    return upper;
  },

  // ✅ BARU: Normalisasi teks status kepegawaian dari Excel ke salah satu nilai baku
  // Menangani variasi penulisan umum (huruf besar/kecil, sinonim) — fallback ke 'Aktif' jika kosong/tidak dikenali
  normalizeStatus(raw) {
    const val = String(raw || '').trim().toLowerCase();
    if (!val) return 'Aktif';
    if (['baru masuk', 'baru', 'new', 'karyawan baru'].includes(val)) return 'Baru Masuk';
    if (['resign', 'resigned', 'keluar', 'non aktif', 'nonaktif', 'non-aktif', 'berhenti', 'out'].includes(val)) return 'Resign';
    if (['aktif', 'active'].includes(val)) return 'Aktif';
    return 'Aktif'; // fallback aman untuk nilai yang tidak dikenali
  },

  // ✅ BARU: Normalisasi nomor telepon ke format +62
  // Menerima input: 08xxx, 8xxx, 628xxx, +628xxx → semua dikonversi ke +62xxx
  normalizePhone(raw) {
    if (!raw) return '';
    let digits = String(raw).trim().replace(/[\s\-()]/g, '');
    digits = digits.replace(/^\+/, ''); // buang + di depan dulu biar mudah diproses

    if (digits.startsWith('62')) {
      digits = digits.slice(2);
    } else if (digits.startsWith('0')) {
      digits = digits.slice(1);
    }

    if (!digits) return '';
    return '+62' + digits;
  },
  statusPill(status) {
    const s = STATUS_DEF[status] || { pill: 'pill-gray', label: status || '—' };
    return `<span class="pill ${s.pill}">${s.label}</span>`;
  },
  toast(msg, dur = 3000) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), dur);
  },
  // ✅ BARU: Format angka menjadi Rupiah
  formatRupiah(num) {
    const n = Number(num) || 0;
    return 'Rp' + Math.round(n).toLocaleString('id-ID');
  },
  // ✅ BARU: Parser nominal yang aman untuk format Indonesia (titik ribuan / koma desimal) dan angka Excel biasa
  parseNominal(v) {
    if (v === null || v === undefined) return 0;
    if (typeof v === 'number') return v;
    let s = String(v).trim();
    if (!s) return 0;
    s = s.replace(/rp\.?/gi, '').replace(/\s/g, '');
    const lastComma = s.lastIndexOf(',');
    const lastDot = s.lastIndexOf('.');
    if (lastComma > -1 && lastDot > -1) {
      // Ada dua-duanya: pemisah paling kanan dianggap desimal, sisanya ribuan
      if (lastComma > lastDot) s = s.replace(/\./g, '').replace(',', '.');
      else s = s.replace(/,/g, '');
    } else if (lastComma > -1) {
      // Hanya koma: 3 digit di belakang = pemisah ribuan (mis. 1,500,000), selain itu = desimal
      s = (s.length - lastComma - 1 === 3) ? s.replace(/,/g, '') : s.replace(',', '.');
    } else if (lastDot > -1) {
      // Hanya titik: 3 digit di belakang = pemisah ribuan ala Indonesia (mis. 1.500.000)
      if (s.length - lastDot - 1 === 3) s = s.replace(/\./g, '');
    }
    s = s.replace(/[^0-9.\-]/g, '');
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  },
  // ✅ BARU: Normalisasi nilai Tagihan — mis. "SPPD 1"/"SPPD 2"/"sppd" lama otomatis jadi "SPPD 1 2"
  normalizeTagihan(val) {
    const s = String(val || '').trim();
    if (/^sppd/i.test(s)) return 'SPPD 1 2';
    if (/^lembur$/i.test(s)) return 'Lembur';
    return s;
  },
  // ✅ BARU: Normalisasi nilai Status Laptop — supaya "aktif", "AKTIF ", "Aktif" dari Excel/manual
  // semua terbaca sebagai status baku "Aktif" (begitu juga 2 status lainnya), bukan malah dikosongkan.
  normalizeStatusLaptop(val) {
    const s = String(val || '').trim();
    if (!s) return '';
    const exact = CONFIG.STATUS_LAPTOP_OPTIONS.find(o => o.toLowerCase() === s.toLowerCase());
    if (exact) return exact;
    const lower = s.toLowerCase();
    if (lower.startsWith('aktif')) return 'Aktif';
    if (lower.includes('belum')) return 'Belum Dikembalikan';
    if (lower.includes('sudah') || lower.includes('kembali')) return 'Sudah Dikembalikan';
    return '';
  },
  // ✅ BARU: Cari karyawan berdasarkan NIP — dengan fallback toleran angka 0 di depan.
  // Kasus nyata: NIP di Excel Karyawan tersimpan sebagai teks ("0012345678"), tapi di Excel
  // Lembur/SPPD kolom NIP kebetulan berformat angka sehingga 0 di depan hilang ("12345678").
  // Exact match akan gagal walau datanya sama — fallback ini menyamakan keduanya.
  findKaryawanByNIP(nip) {
    const s = String(nip || '').trim();
    if (!s) return null;
    let emp = AppState.karyawan.find(k => k.NIP === s);
    if (emp) return emp;
    const stripped = s.replace(/^0+/, '');
    if (!stripped) return null;
    return AppState.karyawan.find(k => k.NIP.replace(/^0+/, '') === stripped) || null;
  },

  // ✅ BARU: Kompres & resize gambar (Bukti Berita Acara) sebelum disimpan sebagai base64 —
  // supaya ukuran data tetap kecil (data disimpan langsung di database bersama data lain).
  compressImageFile(file, maxWidth = 900, quality = 0.7) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Gagal membaca file'));
      reader.onload = (ev) => {
        const img = new Image();
        img.onerror = () => reject(new Error('File bukan gambar yang valid'));
        img.onload = () => {
          const scale = Math.min(1, maxWidth / img.width);
          const canvas = document.createElement('canvas');
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  // ✅ BARU: Saran Status Laptop berdasarkan aturan — resign + belum ada bukti = Belum Dikembalikan,
  // resign + sudah ada bukti = Sudah Dikembalikan, masih aktif bekerja = Aktif. Hanya SARAN (poin 3),
  // Status tetap bisa dipilih manual.
  suggestStatusLaptop(nip, hasBukti) {
    const emp = Utils.findKaryawanByNIP(nip);
    const isResign = emp && emp.Status === 'Resign';
    if (isResign) return hasBukti ? 'Sudah Dikembalikan' : 'Belum Dikembalikan';
    return 'Aktif';
  },
  // ✅ DIUBAH: Normalisasi nilai Bulan ke format baku "NamaBulan Tahun" — mendukung 2026 & 2027.
  // Mendeteksi tahun dari teks jika ada (mis. "Januari 2027" → tetap 2027); kalau tidak ada tahun
  // di teks, pakai tahun default (CONFIG.TAHUN_LEMBUR) supaya data lama tanpa tahun tetap kompatibel.
  normalizeBulan(val) {
    const s = String(val || '').trim();
    if (!s) return '';
    const found = CONFIG.BULAN_NAMA.find(b => new RegExp('^' + b, 'i').test(s));
    if (!found) return s;
    const yearMatch = s.match(/\b(20\d{2})\b/);
    const tahun = (yearMatch && CONFIG.TAHUN_LEMBUR_LIST.includes(Number(yearMatch[1])))
      ? Number(yearMatch[1])
      : CONFIG.TAHUN_LEMBUR;
    return `${found} ${tahun}`;
  },
  fillSelect(id, options) {
    const el = document.getElementById(id);
    if (!el) return;
    const cur = el.value;
    el.innerHTML = '<option value="">Semua</option>';
    options.forEach(o => { 
      const opt = document.createElement('option'); 
      opt.value = o; opt.textContent = o; 
      el.appendChild(opt); 
    });
    el.value = cur;
  }
};

// ─── 5. DATABASE SERVICE ────────────────────────────────────────────────────
// ✅ DIUBAH: DB kini menyimpan & memuat data lewat REST API backend (Express + MongoDB)
// alih-alih localStorage. Semua data (karyawan, jabatan, log, slotConfig) tersimpan
// dalam satu dokumen di MongoDB, sehingga bisa diakses dari komputer/user manapun
// yang terhubung ke backend yang sama.
const DB = {
  _saving: false,
  _pendingSave: false,

  // Memuat seluruh state dari server saat aplikasi pertama kali dibuka
  async load() {
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/api/state`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      AppState.karyawan   = Array.isArray(data.karyawan) ? data.karyawan : [];
      AppState.log        = Array.isArray(data.log) ? data.log : [];
      AppState.jabatan     = Array.isArray(data.jabatan) && data.jabatan.length
        ? data.jabatan
        : CONFIG.DEFAULT_JABATAN.map(nama => ({ nama }));
      // ✅ DIUBAH: tidak lagi fallback ke CONFIG.SLOT_PER_SBU yang statis.
      // Kalau belum ada slotConfig tersimpan, biarkan kosong — akan otomatis
      // dibangun dari data Excel pertama kali yang diupload (lihat bulkUpload()).
      AppState.slotConfig = data.slotConfig && Object.keys(data.slotConfig).length
        ? data.slotConfig
        : {};
      // ✅ BARU: Data Lembur & SPPD Karyawan + konfigurasi Dashboard Non PO
      // Migrasi otomatis: tag lama "SPPD 1"/"SPPD 2" disatukan jadi "SPPD 1 2" agar cocok dengan filter terbaru
      AppState.lembur = (Array.isArray(data.lembur) ? data.lembur : []).map(l => Models.Lembur(l));
      // ✅ BARU: Re-sync Nama/SBU/Jabatan yang kosong — untuk data lama yang gagal ke-lookup saat upload
      // (mis. NIP di Excel Lembur kehilangan angka 0 di depan). Sekarang dicoba ulang pakai fallback NIP.
      AppState.lembur.forEach(l => {
        if (!l.SBU || !l.Nama) {
          const emp = Utils.findKaryawanByNIP(l.NIP);
          if (emp) { l.Nama = emp.Nama; l.SBU = emp.SBU; l.Jabatan = emp.Jabatan; }
        }
      });
      AppState.lemburSbuConfig = data.lemburSbuConfig && typeof data.lemburSbuConfig === 'object' ? data.lemburSbuConfig : {};
      AppState.tiketHPI = Number(data.tiketHPI) || 0;

      // ✅ BARU: Monitoring Pengadaan Laptop
      AppState.laptop = (Array.isArray(data.laptop) ? data.laptop : []).map(l => Models.Laptop(l));
      // Re-sync Nama Pengguna/Regional yang kosong — untuk data lama yang gagal ke-lookup saat upload
      AppState.laptop.forEach(l => {
        if (!l.SBU || !l.NamaPengguna) {
          const emp = Utils.findKaryawanByNIP(l.NIP);
          if (emp) { l.NamaPengguna = emp.Nama; l.SBU = emp.SBU; }
        }
      });

      return true;
    } catch (err) {
      console.error('Gagal memuat data dari server:', err);
      Utils.toast('❌ Gagal terhubung ke server database. Data tidak dapat dimuat.', 6000);
      // Fallback aman agar UI tetap bisa dirender meski server bermasalah
      AppState.karyawan = AppState.karyawan || [];
      AppState.log = AppState.log || [];
      AppState.jabatan = AppState.jabatan && AppState.jabatan.length ? AppState.jabatan : CONFIG.DEFAULT_JABATAN.map(nama => ({ nama }));
      AppState.slotConfig = AppState.slotConfig && Object.keys(AppState.slotConfig).length ? AppState.slotConfig : {};
      AppState.lembur = AppState.lembur || [];
      AppState.lemburSbuConfig = AppState.lemburSbuConfig || {};
      AppState.tiketHPI = Number(AppState.tiketHPI) || 0;
      AppState.laptop = AppState.laptop || [];
      return false;
    }
  },

  // Menyimpan seluruh state ke server (upsert ke MongoDB).
  // Dipanggil setiap kali ada perubahan data (upload, edit, hapus, dsb).
  // Menggunakan antrian sederhana supaya panggilan save() yang beruntun
  // tidak saling tabrakan (request terakhir selalu yang menang).
  async save() {
    if (this._saving) { this._pendingSave = true; return; }
    this._saving = true;
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/api/state`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          karyawan: AppState.karyawan,
          jabatan: AppState.jabatan,
          log: AppState.log,
          slotConfig: AppState.slotConfig,
          lembur: AppState.lembur,
          lemburSbuConfig: AppState.lemburSbuConfig,
          tiketHPI: AppState.tiketHPI,
          laptop: AppState.laptop
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      console.error('Gagal menyimpan data ke server:', err);
      Utils.toast('❌ Gagal menyimpan ke database. Periksa koneksi ke server.', 6000);
    } finally {
      this._saving = false;
      if (this._pendingSave) {
        this._pendingSave = false;
        this.save();
      }
    }
  }
};

// ─── 6. BUSINESS LOGIC (SERVICES) ───────────────────────────────────────────
const EmployeeService = {
  // ✅ BARU: Perbaiki otomatis ID karyawan yang kadung DUPLIKAT dari bug generator ID lama
  // (Date.now() + Math.random() yang presisinya bisa bertabrakan saat bulk upload).
  // ID duplikat inilah yang menyebabkan modal Detail/Edit salah menampilkan data karyawan
  // lain. Dipanggil sekali saat aplikasi dibuka; baris pertama dari tiap ID yang duplikat
  // dibiarkan, baris-baris berikutnya diberi ID baru yang unik.
  repairDuplicateIds() {
    const seen = new Set();
    let fixedCount = 0;
    AppState.karyawan.forEach(k => {
      if (seen.has(k.id)) {
        k.id = Utils.generateId();
        fixedCount++;
      }
      seen.add(k.id);
    });
    return fixedCount;
  },

  // ✅ BARU: NIP diperlakukan sebagai Primary Key — cek apakah NIP sudah dipakai karyawan lain
  // excludeId dipakai saat mengedit data yang sudah ada (supaya tidak bentrok dengan dirinya sendiri)
  nipExists(nip, excludeId = null) {
    const target = String(nip || '').trim();
    if (!target) return false;
    return AppState.karyawan.some(k => k.NIP === target && k.id !== excludeId);
  },

  add(rawData) {
    const nip = String(rawData.NIP || '').trim();
    // ✅ BARU: Tolak jika NIP (Primary Key) sudah terdaftar
    if (nip && this.nipExists(nip)) {
      return { success: false, error: 'duplicate', nip };
    }
    const newEmployee = Models.Karyawan(rawData);
    AppState.karyawan.unshift(newEmployee);
    DB.save();
    return { success: true, employee: newEmployee };
  },

  update(id, newData, newStatusData = null) {
    const emp = AppState.karyawan.find(k => k.id === id);
    if (!emp) return { success: false, error: 'not_found' };

    // ✅ BARU: Jika NIP diubah, pastikan NIP baru belum dipakai karyawan lain
    if (newData.NIP !== undefined) {
      const newNip = String(newData.NIP).trim();
      if (newNip && this.nipExists(newNip, id)) {
        return { success: false, error: 'duplicate', nip: newNip };
      }
      if (newNip && emp.NIP !== newNip) {
        AppState.log.push(Models.LogChange(newNip, emp.Nama, 'nip', emp.NIP, newNip));
      }
    }

    if (newData.Jabatan && emp.Jabatan !== newData.Jabatan.toUpperCase()) {
      AppState.log.push(Models.LogChange(emp.NIP, emp.Nama, 'jabatan', emp.Jabatan, newData.Jabatan));
      emp.Jabatan = newData.Jabatan.toUpperCase();
    }
    if (newData.SBU !== undefined && emp.SBU !== newData.SBU.toUpperCase()) {
      AppState.log.push(Models.LogChange(emp.NIP, emp.Nama, 'sbu', emp.SBU, newData.SBU.toUpperCase()));
      emp.SBU = newData.SBU.toUpperCase();
    }
    // ✅ BARU: Track perubahan BKO Jabatan
    if (newData.BKOJabatan !== undefined && emp.BKOJabatan !== newData.BKOJabatan.toUpperCase()) {
      AppState.log.push(Models.LogChange(emp.NIP, emp.Nama, 'bko jabatan', emp.BKOJabatan, newData.BKOJabatan.toUpperCase()));
    }
    // ✅ BARU: Track perubahan BKO SBU
    if (newData.BKOSBU !== undefined && emp.BKOSBU !== newData.BKOSBU.toUpperCase()) {
      AppState.log.push(Models.LogChange(emp.NIP, emp.Nama, 'bko sbu', emp.BKOSBU, newData.BKOSBU.toUpperCase()));
    }
    if (newStatusData && (emp.Status !== newStatusData.Status || emp.StatusCatatan !== newStatusData.Catatan)) {
      AppState.log.push(Models.LogChange(emp.NIP, emp.Nama, 'status', emp.Status, newStatusData.Status, newStatusData.Catatan));
      emp.Status = newStatusData.Status;
      emp.StatusCatatan = newStatusData.Catatan;
      emp.StatusManual = true;
    }

    Object.assign(emp, Models.Karyawan({ ...emp, ...newData }));
    emp.TglUpdate = Utils.getTodayDate();

    DB.save();
    return { success: true, employee: emp };
  },

  // ✅ BARU: Klasifikasikan setiap baris upload berdasarkan status NIP (Primary Key)
  // Status: 'new' (data baru, akan ditambahkan), 'duplicate_existing' (NIP sudah ada di sistem, dilewati),
  // 'duplicate_infile' (NIP duplikat di dalam file itu sendiri, hanya baris pertama yang dipakai),
  // 'invalid' (NIP kosong, tidak bisa diproses karena NIP adalah Primary Key)
  // Catatan: Tanggal Masuk hanya wajib untuk input manual, TIDAK diwajibkan saat upload Excel.
  classifyUploadRows(dataArray) {
    const existingNIPs = new Set(AppState.karyawan.map(k => k.NIP).filter(Boolean));
    const seenInFile = new Set();
    return dataArray.map(raw => {
      const nip = String(raw.NIP || '').trim();
      let status;
      if (!nip) {
        status = 'invalid';
      } else if (existingNIPs.has(nip)) {
        status = 'duplicate_existing';
      } else if (seenInFile.has(nip)) {
        status = 'duplicate_infile';
      } else {
        status = 'new';
        seenInFile.add(nip);
      }
      return { ...raw, __uploadStatus: status };
    });
  },

  // ✅ DIUBAH: bulkUpload kini menerapkan Primary Key NIP — hanya data baru (NIP belum pernah ada) yang ditambahkan
  // ✅ DIUBAH: Bangun Slot Jabatan per SBU secara dinamis dari data karyawan yang diupload.
  // Kolom "Slot BOQ" sudah dihapus dari data karyawan, jadi Slot Fix awal sekarang memakai
  // JUMLAH KARYAWAN saat ini per kombinasi SBU + Jabatan (headcount saat upload pertama)
  // sebagai baseline — superadmin bisa menyesuaikannya kapan saja lewat tombol "Edit Slot"
  // di halaman Slot Jabatan.
  buildSlotConfigFromData(employees) {
    const config = {};

    employees.forEach(emp => {
      const sbu = emp.SBU;
      const jab = emp.Jabatan;
      if (!sbu || !jab) return;

      if (!config[sbu]) config[sbu] = { total: 0, jabatan: {} };
      config[sbu].jabatan[jab] = (config[sbu].jabatan[jab] || 0) + 1;
    });

    Object.values(config).forEach(detail => {
      detail.total = Object.values(detail.jabatan).reduce((sum, v) => sum + v, 0);
    });

    return config;
  },

  bulkUpload(dataArray) {
    // ✅ BARU: tandai apakah ini upload pertama (belum ada karyawan sama sekali
    // sebelum upload ini) — dipakai untuk menentukan apakah Slot Jabatan per SBU
    // perlu dibangun otomatis dari data Excel ini.
    const isFirstUpload = AppState.karyawan.length === 0;

    const classified = this.classifyUploadRows(dataArray);
    const toInsert = classified.filter(r => r.__uploadStatus === 'new');

    const newEmployees = toInsert.map(data => Models.Karyawan(data));
    AppState.karyawan = AppState.karyawan.concat(newEmployees);

    // ✅ BARU: Kalau ini upload pertama, bangun Slot Jabatan per SBU dari data
    // yang baru saja diupload — bukan lagi dari CONFIG.SLOT_PER_SBU yang statis.
    // Upload berikutnya (menambah karyawan baru ke data yang sudah ada) TIDAK
    // menimpa slotConfig, supaya penyesuaian manual superadmin lewat "Edit Slot"
    // tidak hilang begitu saja.
    if (isFirstUpload && newEmployees.length > 0) {
      AppState.slotConfig = this.buildSlotConfigFromData(newEmployees);
    }

    const stats = {
      total: classified.length,
      added: toInsert.length,
      duplicateExisting: classified.filter(r => r.__uploadStatus === 'duplicate_existing').length,
      duplicateInFile: classified.filter(r => r.__uploadStatus === 'duplicate_infile').length,
      invalid: classified.filter(r => r.__uploadStatus === 'invalid').length,
      slotConfigBuilt: isFirstUpload && newEmployees.length > 0 // ✅ BARU
    };

    if (stats.total > 0) {
      AppState.log.push(Models.LogChange(
        'SYSTEM', 'SYSTEM', 'upload',
        `${stats.total} baris diproses`,
        `${stats.added} baru ditambahkan, ${stats.duplicateExisting + stats.duplicateInFile} duplikat NIP dilewati, ${stats.invalid} NIP kosong dilewati`
      ));
    }

    DB.save();
    return stats;
  },

  // ✅ BARU: Deteksi & ubah otomatis karyawan berstatus "Baru Masuk" menjadi "Aktif"
  // setelah genap 1 bulan kalender sejak Tanggal Masuk. Karyawan yang sudah dipindah
  // status-nya secara manual (mis. langsung ke Resign) tidak tersentuh karena filter
  // hanya menyasar Status === 'Baru Masuk'.
  autoUpdateNewEmployeeStatus() {
    let count = 0;
    AppState.karyawan.forEach(emp => {
      if (emp.Status !== 'Baru Masuk') return;
      if (!emp.TglMasuk) return; // tidak bisa dihitung tanpa Tanggal Masuk

      const months = Utils.monthsSince(emp.TglMasuk);
      if (months === null) return; // format tanggal tidak valid, lewati dengan aman

      if (months >= 1) {
        AppState.log.push(Models.LogChange(
          emp.NIP, emp.Nama, 'status', 'Baru Masuk', 'Aktif',
          'Otomatis diubah sistem — sudah genap 1 bulan sejak Tanggal Masuk'
        ));
        emp.Status = 'Aktif';
        emp.TglUpdate = Utils.getTodayDate();
        count++;
      }
    });

    if (count > 0) DB.save();
    return count;
  },

  // ✅ BARU: Susun histori perpindahan jabatan seorang karyawan dari AppState.log,
  // beserta durasi menjabat di masing-masing jabatan.
  // Cara kerja: ambil semua log bertipe 'jabatan' milik karyawan ini (dicocokkan lewat NIP
  // saat ini — mengikuti konvensi yang sudah dipakai di seluruh log lain), urutkan dari yang
  // paling lama, lalu rangkai jadi rentang waktu per-jabatan. Posisi pertama dianggap mulai
  // sejak Tanggal Masuk (kalau ada), posisi terakhir dianggap "sampai sekarang".
  getJabatanHistory(emp) {
    const logs = AppState.log
      .filter(c => c.type === 'jabatan' && c.nik === emp.NIP)
      .slice()
      .sort((a, b) => (a.ts === b.ts ? a.id - b.id : a.ts.localeCompare(b.ts)));

    // Belum pernah tercatat pindah jabatan — hanya ada 1 posisi (jabatan saat ini)
    if (!logs.length) {
      return [{
        jabatan: emp.Jabatan || '—',
        mulai: emp.TglMasuk || null,
        selesai: null,
        current: true
      }];
    }

    const history = [];
    const startDate = emp.TglMasuk || logs[0].ts;

    // Posisi pertama: sebelum perubahan tercatat yang paling awal
    history.push({
      jabatan: logs[0].oldVal,
      mulai: startDate,
      selesai: logs[0].ts,
      current: false
    });

    // Setiap perubahan berikutnya menandai posisi baru
    logs.forEach((c, i) => {
      const isLast = i === logs.length - 1;
      history.push({
        jabatan: c.newVal,
        mulai: c.ts,
        selesai: isLast ? null : logs[i + 1].ts,
        current: isLast
      });
    });

    return history;
  }
};

// ✅ BARU: Layanan untuk Data Lembur & SPPD Karyawan (submenu "Data Lembur dan SPPD Karyawan")
const LemburService = {
  // Ambil Nama, SBU, Jabatan dari Data Karyawan berdasarkan NIP — file upload cukup berisi NIP
  enrichFromKaryawan(row) {
    const emp = Utils.findKaryawanByNIP(row.NIP);
    return {
      NIP: row.NIP,
      Nama: emp ? emp.Nama : '',
      SBU: emp ? emp.SBU : '',
      Jabatan: emp ? emp.Jabatan : '',
      Nominal: row.Nominal,
      Bulan: row.Bulan,
      Tagihan: row.Tagihan
    };
  },

  classifyUploadRows(rows) {
    return rows.map(raw => {
      const nip = String(raw.NIP || '').trim();
      const nominal = Utils.parseNominal(raw.Nominal);
      const bulan = Utils.normalizeBulan(raw.Bulan);
      let status;
      if (!nip) status = 'invalid_nip';
      else if (!nominal || isNaN(nominal)) status = 'invalid_nominal';
      else if (!CONFIG.BULAN_OPTIONS.includes(bulan)) status = 'invalid_bulan'; // ✅ BARU: Bulan wajib salah satu dari 12 bulan baku 2026
      else status = 'new';
      return { ...raw, __uploadStatus: status };
    });
  },

  bulkUpload(dataArray) {
    const classified = this.classifyUploadRows(dataArray);
    const toInsert = classified.filter(r => r.__uploadStatus === 'new');
    const newRows = toInsert.map(r => Models.Lembur(this.enrichFromKaryawan(r)));
    AppState.lembur = AppState.lembur.concat(newRows);

    const stats = {
      total: classified.length,
      added: toInsert.length,
      invalid: classified.filter(r => r.__uploadStatus !== 'new').length,
      bulanTarget: newRows.length ? newRows[0].Bulan : null // ✅ BARU: dipakai untuk auto-navigate ke bulan terkait
    };

    if (stats.total > 0) {
      AppState.log.push(Models.LogChange(
        'SYSTEM', 'SYSTEM', 'lembur upload',
        `${stats.total} baris diproses`,
        `${stats.added} baru ditambahkan, ${stats.invalid} dilewati (NIP/Nominal/Bulan tidak valid)`
      ));
    }

    DB.save();
    return stats;
  },

  deleteById(id) {
    AppState.lembur = AppState.lembur.filter(l => l.id !== id);
    DB.save();
  }
};

// ✅ BARU: Layanan untuk Monitoring Pengadaan Laptop
const LaptopService = {
  // Ambil Nama Pengguna & Regional (SBU) dari Data Karyawan berdasarkan NIP.
  // Kalau NIP tidak ditemukan (mis. karyawan sudah dihapus), pakai kolom Nama Pengguna/Regional
  // dari Excel sebagai fallback — supaya riwayat karyawan resign yang sudah dihapus tetap tercatat.
  enrichFromKaryawan(row) {
    const emp = Utils.findKaryawanByNIP(row.NIP);
    return {
      NIP: row.NIP,
      NamaPengguna: emp ? emp.Nama : (row.NamaPengguna || ''),
      SBU: emp ? emp.SBU : (row.SBU || ''),
      NamaPerangkat: row.NamaPerangkat,
      PA: row.PA,
      SerialNumber: row.SerialNumber,
      Status: row.Status
    };
  },

  // ✅ DIUBAH: NIP tidak lagi wajib — kalau NIP kosong, kolom Nama Pengguna di Excel wajib diisi
  // supaya identitas peminjam tetap jelas.
  classifyUploadRows(rows) {
    return rows.map(raw => {
      const nip = String(raw.NIP || '').trim();
      const namaPengguna = String(raw.NamaPengguna || '').trim();
      const namaPerangkat = String(raw.NamaPerangkat || '').trim();
      const serial = String(raw.SerialNumber || '').trim();
      let status;
      if (!nip && !namaPengguna) status = 'invalid_identitas';
      else if (!namaPerangkat) status = 'invalid_perangkat';
      else if (!serial) status = 'invalid_serial';
      else status = 'new';
      return { ...raw, __uploadStatus: status };
    });
  },

  bulkUpload(dataArray) {
    const classified = this.classifyUploadRows(dataArray);
    const toInsert = classified.filter(r => r.__uploadStatus === 'new');
    const newRows = toInsert.map(r => Models.Laptop(this.enrichFromKaryawan(r)));
    AppState.laptop = AppState.laptop.concat(newRows);

    const stats = {
      total: classified.length,
      added: toInsert.length,
      invalid: classified.filter(r => r.__uploadStatus !== 'new').length
    };

    if (stats.total > 0) {
      AppState.log.push(Models.LogChange(
        'SYSTEM', 'SYSTEM', 'laptop upload',
        `${stats.total} baris diproses`,
        `${stats.added} baru ditambahkan, ${stats.invalid} dilewati (NIP/Nama Perangkat/Serial Number tidak valid)`
      ));
    }

    DB.save();
    return stats;
  },

  deleteById(id) {
    AppState.laptop = AppState.laptop.filter(l => l.id !== id);
    DB.save();
  }
};
// ─── 7. UI RENDERER ─────────────────────────────────────────────────────────
const UI = {
  async init() {
    // ✅ DIUBAH: DB.load() kini async (mengambil data dari MongoDB via API),
    // sehingga harus ditunggu (await) sebelum data dirender. Selama menunggu,
    // dashboard menampilkan skeleton loading alih-alih toast saja.
    await DB.load();
    // ✅ BARU: Perbaiki otomatis ID karyawan yang kadung duplikat (bug lama),
    // yang menyebabkan modal Detail/Edit salah menampilkan data karyawan lain.
    const fixedIdCount = EmployeeService.repairDuplicateIds();
    // ✅ BARU: Deteksi & ubah otomatis karyawan "Baru Masuk" yang sudah genap 1 bulan menjadi "Aktif"
    const autoUpdatedCount = EmployeeService.autoUpdateNewEmployeeStatus();
    this.renderAll();
    this.setupUploadZone();
    this.hideDashboardSkeleton(); // ✅ BARU: data selesai dirender, ganti skeleton dengan konten asli
    if (fixedIdCount > 0) {
      DB.save(); // simpan perbaikan ID ke MongoDB supaya tidak terjadi lagi di kunjungan berikutnya
      Utils.toast(`🔧 ${fixedIdCount} data karyawan dengan ID duplikat berhasil diperbaiki otomatis.`, 5000);
    }
    if (autoUpdatedCount > 0) {
      Utils.toast(`🔄 ${autoUpdatedCount} karyawan otomatis diubah dari "Baru Masuk" menjadi "Aktif" (sudah genap 1 bulan)`, 5000);
    }
  },

  // ✅ BARU: Sembunyikan skeleton dashboard & tampilkan konten asli setelah data siap
  hideDashboardSkeleton() {
    const skeleton = document.getElementById('dashboard-skeleton');
    const content  = document.getElementById('dashboard-content');
    if (skeleton) skeleton.style.display = 'none';
    if (content) content.style.display = '';
  },

  renderAll() {
    this.renderDashboard();
    this.renderJabatanList();
    this.updateBadge();
  },

  updateBadge() {
    const badge = document.getElementById('changesBadge');
    if (!badge) return;
    badge.style.display = AppState.log.length ? 'inline-block' : 'none';
    badge.textContent = `${AppState.log.length} perubahan`;
  },

  renderDashboard() {
    // ✅ DIUBAH: log Data Karyawan kini terpisah dari log Data Lembur & SPPD (type diawali "lembur")
    const { karyawan, jabatan } = AppState;
    const log = AppState.log.filter(c => !c.type.startsWith('lembur') && !c.type.startsWith('laptop')); // ✅ DIUBAH: log Laptop juga dipisah
    // document.getElementById('stat-total').textContent  = karyawan.length;
    document.getElementById('stat-baru').textContent   = karyawan.filter(k => k.Status === 'Baru Masuk').length;
    document.getElementById('stat-aktif').textContent  = karyawan.filter(k => k.Status === 'Aktif').length;
    document.getElementById('stat-resign').textContent = karyawan.filter(k => k.Status === 'Resign').length;
    document.getElementById('stat-changed').textContent= log.length;
    document.getElementById('stat-types').textContent  = jabatan.length;

    // ✅ BARU: Slot karyawan keseluruhan (dihitung dinamis dari slotConfig, otomatis bertambah saat resign)
    const totalSlotFix = Utils.getTotalSlotFix(); // ✅ DIUBAH: dinamis, bukan CONFIG.TOTAL_SLOT_KARYAWAN statis
    const aktifCount = karyawan.filter(k => k.Status === 'Aktif' || k.Status === 'Baru Masuk').length;
    const slotTersisa = totalSlotFix - aktifCount;
    const elSlotTotal = document.getElementById('stat-slot-total');
    const elSlotTerisi = document.getElementById('stat-slot-terisi');
    const elSlotSisa = document.getElementById('stat-slot-sisa');
    if (elSlotTotal)  elSlotTotal.textContent  = totalSlotFix;
    if (elSlotTerisi) elSlotTerisi.textContent = aktifCount;
    if (elSlotSisa)   elSlotSisa.textContent   = slotTersisa;

    // ✅ BARU: Render bar chart tipe karyawan bulan berjalan
    this.renderChartTipeKaryawan();

    // ✅ BARU: Render tabel slot per SBU & Jabatan
    this.renderSlotJabatan();

    // ✅ BARU: Filter berdasarkan tipe log (dropdown), rentang tanggal, digabung dengan search teks
    const qLog = (document.getElementById('searchLog')?.value || '').toLowerCase();
    const fLogType = document.getElementById('filterLogType')?.value || '';
    const fLogDateFrom = document.getElementById('filterLogDateFrom')?.value || ''; // format YYYY-MM-DD
    const fLogDateTo   = document.getElementById('filterLogDateTo')?.value || '';   // format YYYY-MM-DD

    // Isi dropdown tipe log secara dinamis dari data log yang ada
    const elFilterLogType = document.getElementById('filterLogType');
    if (elFilterLogType) {
      const curVal = elFilterLogType.value;
      const uniqueTypes = [...new Set(log.map(c => c.type))].sort();
      elFilterLogType.innerHTML = '<option value="">Semua Tipe</option>' +
        uniqueTypes.map(t => `<option value="${t}">${t.toUpperCase()}</option>`).join('');
      elFilterLogType.value = curVal;
    }

    const filteredLog = log.filter(c => 
      (!qLog || c.nik.toLowerCase().includes(qLog) || c.nama.toLowerCase().includes(qLog) || 
        c.type.toLowerCase().includes(qLog) || c.oldVal.toLowerCase().includes(qLog) || c.newVal.toLowerCase().includes(qLog)) &&
      (!fLogType || c.type === fLogType) &&
      (!fLogDateFrom || c.ts >= fLogDateFrom) && // ✅ BARU: c.ts berformat YYYY-MM-DD, aman dibandingkan sebagai string
      (!fLogDateTo || c.ts <= fLogDateTo)        // ✅ BARU
    );

    const container = document.getElementById('dash-changes');
    const elLogPageContainer = document.getElementById('paginationLog');

    if (!log.length) {
      container.innerHTML = `<div class="empty"><div class="empty-icon">📋</div><h3>Belum ada perubahan</h3><p>Log akan muncul saat ada perubahan data.</p></div>`;
      if (elLogPageContainer) elLogPageContainer.style.display = 'none';
      return;
    }
    if (!filteredLog.length) {
      container.innerHTML = `<div class="empty"><div class="empty-icon">🔍</div><h3>Tidak ada log yang cocok</h3></div>`;
      if (elLogPageContainer) elLogPageContainer.style.display = 'none';
      return;
    }

    // ✅ BARU: Pagination untuk Review Log Perubahan (urutan terbaru dulu, lalu dipotong per halaman)
    const reversedLog = filteredLog.slice().reverse();
    const logTotalPages = Math.ceil(reversedLog.length / AppState.logPagination.size) || 1;
    if (AppState.logPagination.page > logTotalPages) AppState.logPagination.page = logTotalPages;
    const logStartIdx = (AppState.logPagination.page - 1) * AppState.logPagination.size;
    const paginatedLog = reversedLog.slice(logStartIdx, logStartIdx + AppState.logPagination.size);

    if (elLogPageContainer) {
      elLogPageContainer.style.display = 'flex';
      const elTotalLog = document.getElementById('totalLogData');
      if (elTotalLog) elTotalLog.textContent = reversedLog.length;
    }

    container.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Tanggal</th><th>NIP</th><th>Nama</th><th>Tipe Perubahan</th><th>Detail Perubahan</th></tr></thead>
          <tbody>
            ${paginatedLog.map(c => {
              const isStatus = c.type === 'status';
              const pillColor = isStatus ? 'purple' : c.type === 'sbu' ? 'blue' : c.type === 'bko jabatan' ? 'green' : c.type === 'bko sbu' ? 'purple' : 'yellow';
              const badge = `<span class="pill pill-${pillColor}">${c.type.toUpperCase()}</span>`;
              const detailHtml = isStatus 
                ? `${Utils.statusPill(c.oldVal)} → ${Utils.statusPill(c.newVal)}${c.catatan ? `<br><span style="color:var(--text2);font-size:10px">${c.catatan}</span>` : ''}`
                : `<span class="diff-old">${c.oldVal}</span><br><span class="diff-new">${c.newVal}</span>`;
              return `<tr>
                <td style="font-size:11px;color:var(--text2)">${c.ts}</td>
                <td class="mono">${c.nik}</td><td style="font-weight:500">${c.nama}</td>
                <td>${badge}</td><td style="font-size:12px">${detailHtml}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;

    this.renderLogPagination(logTotalPages);
  },

  // ✅ BARU: Render bar chart sederhana (SVG) untuk tipe karyawan bulan berjalan
  renderChartTipeKaryawan() {
    const elChart = document.getElementById('chart-tipe-karyawan');
    if (!elChart) return;

    const now = new Date();
    const bulanIni = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const labelBulan = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

    // Karyawan yang TglUpdate-nya di bulan berjalan, dikelompokkan per status
    const dataBulanIni = AppState.karyawan.filter(k => (k.TglUpdate || '').startsWith(bulanIni));
    const jumlahBaru   = dataBulanIni.filter(k => k.Status === 'Baru Masuk').length;
    const jumlahAktif  = dataBulanIni.filter(k => k.Status === 'Aktif').length;
    const jumlahResign = dataBulanIni.filter(k => k.Status === 'Resign').length;

    const data = [
      { label: 'Baru Masuk', value: jumlahBaru,   color: 'var(--success)' },
      { label: 'Aktif',      value: jumlahAktif,  color: 'var(--accent2)' },
      { label: 'Resign',     value: jumlahResign, color: 'var(--danger)' }
    ];
    const maxVal = Math.max(1, ...data.map(d => d.value));

    const barWidth = 90, gap = 60, chartHeight = 160, startX = 40;
    const svgWidth = data.length * (barWidth + gap) + startX;

    const bars = data.map((d, i) => {
      const x = startX + i * (barWidth + gap);
      const h = (d.value / maxVal) * chartHeight;
      const y = chartHeight - h + 20;
      return `
        <text x="${x + barWidth/2}" y="${y - 10}" text-anchor="middle" fill="var(--text)" font-size="15" font-weight="700" font-family="JetBrains Mono, monospace">${d.value}</text>
        <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="6" fill="${d.color}" opacity="0.85"/>
        <text x="${x + barWidth/2}" y="${chartHeight + 42}" text-anchor="middle" fill="var(--text2)" font-size="12" font-family="Inter, sans-serif">${d.label}</text>
      `;
    }).join('');

    elChart.innerHTML = `
      <div style="font-size:12px;color:var(--text2);margin-bottom:12px;">Periode: <strong style="color:var(--text)">${labelBulan}</strong> (berdasarkan tanggal update data)</div>
      <svg viewBox="0 0 ${svgWidth} 210" style="width:100%;max-width:480px;height:auto;">
        <line x1="0" y1="${chartHeight + 20}" x2="${svgWidth}" y2="${chartHeight + 20}" stroke="var(--border2)" stroke-width="1"/>
        ${bars}
      </svg>`;
  },

  // ✅ BARU: Render tabel rincian slot fix per SBU & Jabatan vs realisasi (kini bisa diedit superadmin)
  renderSlotJabatan() {
    const elSlot = document.getElementById('slot-jabatan-table');
    if (!elSlot) return;

    // ✅ BARU: Belum ada data slot sama sekali (belum pernah upload Excel) — tampilkan empty state
    if (!Object.keys(AppState.slotConfig).length) {
      elSlot.innerHTML = `
        <div class="empty">
          <div class="empty-icon">📊</div>
          <h3>Belum ada Slot Jabatan</h3>
          <p>Slot Jabatan per SBU akan otomatis terbentuk mengikuti jumlah karyawan pada file Excel yang pertama kali Anda upload.</p>
        </div>`;
      return;
    }

    const aktifKaryawan = AppState.karyawan.filter(k => k.Status === 'Aktif' || k.Status === 'Baru Masuk');

    // ✅ Render sebagai accordion per SBU (collapsed by default) agar tidak memanjang ke bawah
    const panels = Object.entries(AppState.slotConfig).map(([sbu, detail], idx) => {
      const terisiSBU = aktifKaryawan.filter(k => k.SBU === sbu).length;
      const totalSBU = Utils.slotSBUTotal(sbu); // ✅ DIUBAH: dihitung dari jumlah jabatan, bukan field total statis
      const sisaSBU = totalSBU - terisiSBU;
      const statusColorSBU = sisaSBU < 0 ? 'var(--danger)' : sisaSBU === 0 ? 'var(--success)' : 'var(--warning)';
      const panelId = `slot-panel-${idx}`;
      const isOpen = AppState.slotPanelOpen && AppState.slotPanelOpen[sbu];
      const sbuEscaped = sbu.replace(/'/g, "\\'");

      const jabatanRows = Object.entries(detail.jabatan).map(([jab, slotFix]) => {
        const jabEmployees = aktifKaryawan.filter(k => k.SBU === sbu && k.Jabatan === jab);
        const terisi = jabEmployees.length;
        const sisa = slotFix - terisi;
        const statusColor = sisa < 0 ? 'var(--danger)' : sisa === 0 ? 'var(--success)' : 'var(--warning)';

        // ✅ BARU: dropdown rincian nama karyawan per Jabatan — klik baris untuk buka/tutup
        const jabKey = `${sbu}::${jab}`;
        const jabKeyEscaped = jabKey.replace(/'/g, "\\'");
        const jabOpen = AppState.slotJabatanPanelOpen && AppState.slotJabatanPanelOpen[jabKey];

        const namesList = jabEmployees.length
          ? jabEmployees
              .slice()
              .sort((a, b) => a.Nama.localeCompare(b.Nama))
              .map(e => `
                <div class="slot-jabatan-employee">
                  <span>${e.Nama}</span>
                  <span class="mono" style="color:var(--text2);font-size:11px;">${e.NIP}</span>
                </div>`).join('')
          : `<div style="color:var(--text3);font-size:12px;padding:6px 2px;">Belum ada karyawan di jabatan ini.</div>`;

        return `
          <tr class="slot-jabatan-row" onclick="Handlers.toggleSlotJabatanPanel('${jabKeyEscaped}')" title="Klik untuk lihat rincian nama karyawan">
            <td style="padding-left:24px;color:var(--text2);font-size:12px;">
              <span class="slot-accordion-arrow ${jabOpen ? 'open' : ''}" style="font-size:9px;margin-right:6px;display:inline-block;">▶</span>${jab}
            </td>
            <td class="mono" style="text-align:center;">${slotFix}</td>
            <td class="mono" style="text-align:center;">${terisi}</td>
            <td class="mono" style="text-align:center;color:${statusColor};font-weight:600;">${sisa}</td>
          </tr>
          ${jabOpen ? `
          <tr class="slot-jabatan-detail-row">
            <td colspan="4" style="padding:0;">
              <div class="slot-jabatan-employee-list">${namesList}</div>
            </td>
          </tr>` : ''}`;
      }).join('');

      return `
        <div class="slot-accordion-item">
          <div class="slot-accordion-header">
            <span class="slot-accordion-clickzone" onclick="Handlers.toggleSlotPanel('${sbuEscaped}')">
              <span class="slot-accordion-arrow ${isOpen ? 'open' : ''}">▶</span>
              <span class="slot-accordion-title">${sbu}</span>
              <span class="slot-accordion-stats">
                <span class="mono">Fix: <strong>${totalSBU}</strong></span>
                <span class="mono">Terisi: <strong>${terisiSBU}</strong></span>
                <span class="mono" style="color:${statusColorSBU};">Sisa: <strong>${sisaSBU}</strong></span>
              </span>
            </span>
            <button class="btn btn-secondary btn-sm slot-edit-btn" onclick="event.stopPropagation(); Handlers.requestSlotEdit('${sbuEscaped}');" title="Edit slot fix (khusus superadmin)">
              🔒 Edit
            </button>
          </div>
          <div class="slot-accordion-body" id="${panelId}" style="display:${isOpen ? 'block' : 'none'};">
            <div class="table-wrap" style="border-top:none;border-radius:0 0 10px 10px;">
              <table>
                <thead><tr><th>Jabatan</th><th style="text-align:center;">Slot Fix</th><th style="text-align:center;">Terisi</th><th style="text-align:center;">Sisa</th></tr></thead>
                <tbody>${jabatanRows}</tbody>
              </table>
            </div>
          </div>
        </div>`;
    }).join('');

    elSlot.innerHTML = `<div class="slot-accordion">${panels}</div>`;
  },

  renderKaryawanTable() {
    const { karyawan, pagination } = AppState;
    const q    = (document.getElementById('searchKaryawan')?.value || '').toLowerCase();
    const fK   = document.getElementById('filterJabatan')?.value || '';
    const fSBU = document.getElementById('filterSBU')?.value || '';
    const fS   = document.getElementById('filterStatus')?.value || '';

    Utils.fillSelect('filterJabatan', [...new Set(karyawan.map(k => k.Jabatan))].filter(Boolean));
    Utils.fillSelect('filterSBU', [...new Set(karyawan.map(k => k.SBU))].filter(Boolean));

    // ✅ BARU: Isi dropdown filter export dengan daftar SBU resmi (bukan hanya yang sudah ada datanya)
    const elExportSBU = document.getElementById('exportFilterSBU');
    if (elExportSBU && !elExportSBU.dataset.filled) {
      elExportSBU.innerHTML = '<option value="">Semua SBU</option>' +
        CONFIG.DEFAULT_SBU.map(s => `<option value="${s}">${s}</option>`).join('');
      elExportSBU.dataset.filled = '1';
    }

    const filtered = karyawan.filter(k =>
      (!q  || k.NIP.toLowerCase().includes(q) || k.Nama.toLowerCase().includes(q) || k.SBU.toLowerCase().includes(q)) &&
      (!fK || k.Jabatan === fK) &&
      (!fSBU || k.SBU === fSBU) &&
      (!fS || k.Status === fS)
    );

    const tbody = document.getElementById('karyawanBody');
    const pageContainer = document.getElementById('paginationKaryawan');

    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="19"><div class="empty"><div class="empty-icon">👥</div><h3>Tidak ada data</h3></div></td></tr>`;
      pageContainer.style.display = 'none';
      return;
    }

    pageContainer.style.display = 'flex';
    document.getElementById('totalData').textContent = filtered.length;
    const totalPages = Math.ceil(filtered.length / pagination.size) || 1;
    if (pagination.page > totalPages) pagination.page = totalPages; 

    const startIdx = (pagination.page - 1) * pagination.size;
    const paginated = filtered.slice(startIdx, startIdx + pagination.size);

    tbody.innerHTML = paginated.map(k => `
      <tr>
        <td style="white-space:nowrap">
          <button class="btn btn-secondary btn-sm" onclick="Handlers.openDetailModal(${k.id})">🔍 Detail</button>
          <button class="btn btn-secondary btn-sm" style="margin-left:4px" onclick="Handlers.openEditModal(${k.id})">✏️ Edit</button>
          <button class="btn btn-danger btn-sm" style="margin-left:4px" onclick="Handlers.deleteKaryawan(${k.id})">🗑 Hapus</button>
        </td>
        <td class="mono">${k.NIP}</td>
        <td style="font-weight:500;cursor:pointer;color:var(--accent2)" onclick="Handlers.openDetailModal(${k.id})" title="Lihat detail karyawan">${k.Nama}</td>
        <td class="mono">${k.NIK || '—'}</td>
        <td>${k.Grade ? `<span class="pill pill-purple">${k.Grade}</span>` : '—'}</td>
        <td><span class="pill pill-blue">${k.Jabatan}</span></td><td>${k.SBU}</td>
        <td>${k.BKOJabatan}</td><td>${k.BKOSBU}</td>
        <td class="mono">${k.NIPBaru}</td>
        <td>${k.Email || '—'}</td>
        <td>${k.EmailKorporat || '—'}</td>
        <td>${k.NamaAkunICRM || '—'}</td>
        <td>${k.NoTelp || '—'}</td>
        <td>${k.UkuranBaju ? `<span class="pill pill-gray">${k.UkuranBaju}</span>` : '—'}</td>
        <td style="font-size:12px;color:var(--text2)">${k.TglMasuk || '—'}</td>
        <td style="font-size:12px;color:var(--text2)">${k.TglKeluar || '—'}</td>
        <td style="font-size:12px;color:var(--text2)">${k.TglUpdate}</td>
        <td>${Utils.statusPill(k.Status)}${k.StatusCatatan ? `<br><span style="font-size:10px;color:var(--text2)">${k.StatusCatatan}</span>` : ''}</td>
      </tr>`).join('');

    this.renderPagination(totalPages);
  },

  // ✅ DIUBAH: renderPagination kini generic, bisa dipakai untuk tabel karyawan maupun log
  renderPaginationGeneric(containerId, page, totalPages, onClickFn) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let html = `<button class="page-btn" ${page === 1 ? 'disabled' : ''} onclick="${onClickFn}(${page - 1})">❮</button>`;

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (start > 1) html += `<button class="page-btn" onclick="${onClickFn}(1)">1</button>${start > 2 ? '<span>...</span>' : ''}`;
    for (let i = start; i <= end; i++) html += `<button class="page-btn ${i === page ? 'active' : ''}" onclick="${onClickFn}(${i})">${i}</button>`;
    if (end < totalPages) html += `${end < totalPages - 1 ? '<span>...</span>' : ''}<button class="page-btn" onclick="${onClickFn}(${totalPages})">${totalPages}</button>`;

    html += `<button class="page-btn" ${page === totalPages ? 'disabled' : ''} onclick="${onClickFn}(${page + 1})">❯</button>`;
    container.innerHTML = html;
  },

  renderPagination(totalPages) {
    this.renderPaginationGeneric('pageControls', AppState.pagination.page, totalPages, 'Handlers.goToPage');
  },

  // ✅ BARU: Render pagination khusus untuk Review Log Perubahan
  renderLogPagination(totalPages) {
    this.renderPaginationGeneric('logPageControls', AppState.logPagination.page, totalPages, 'Handlers.goToLogPage');
  },

  // ✅ DIUBAH: Render Tabel Data Lembur dan SPPD Karyawan — sekarang selalu dibatasi bulan yang dipilih di sidebar
  renderLemburTable() {
    const { lembur, lemburPagination } = AppState;
    const q     = (document.getElementById('searchLembur')?.value || '').toLowerCase();
    const fSBU  = document.getElementById('filterLemburSBU')?.value || '';
    const fTag  = document.getElementById('filterLemburTagihan')?.value || '';

    Utils.fillSelect('filterLemburSBU', CONFIG.DEFAULT_SBU);
    Utils.fillSelect('filterLemburTagihan', CONFIG.TAGIHAN_OPTIONS); // ✅ DIUBAH: satu sumber nilai dgn data, hindari mismatch

    const filtered = lembur.filter(l =>
      l.Bulan === AppState.selectedBulan && // ✅ BARU: breakdown per bulan (bulan dipilih dari sidebar)
      (!q || l.NIP.toLowerCase().includes(q) || l.Nama.toLowerCase().includes(q)) &&
      (!fSBU || l.SBU === fSBU) &&
      (!fTag || Utils.normalizeTagihan(l.Tagihan) === Utils.normalizeTagihan(fTag)) // ✅ DIUBAH: bandingkan versi ternormalisasi
    );

    const tbody = document.getElementById('lemburBody');
    const pageContainer = document.getElementById('paginationLembur');
    if (!tbody) return;

    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="8"><div class="empty"><div class="empty-icon">🧾</div><h3>Tidak ada data</h3></div></td></tr>`;
      if (pageContainer) pageContainer.style.display = 'none';
      return;
    }

    if (pageContainer) pageContainer.style.display = 'flex';
    const elTotal = document.getElementById('totalLemburData');
    if (elTotal) elTotal.textContent = filtered.length;
    const totalPages = Math.ceil(filtered.length / lemburPagination.size) || 1;
    if (lemburPagination.page > totalPages) lemburPagination.page = totalPages;
    const startIdx = (lemburPagination.page - 1) * lemburPagination.size;
    const paginated = filtered.slice(startIdx, startIdx + lemburPagination.size);

    const tagPill = { 'SPPD 1 2': 'pill-blue', 'Lembur': 'pill-yellow' };

    tbody.innerHTML = paginated.map(l => `
      <tr>
        <td style="white-space:nowrap">
          <button class="btn btn-secondary btn-sm" onclick="openModalLembur(${l.id})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="Handlers.deleteLembur(${l.id})">🗑</button>
        </td>
        <td class="mono">${l.NIP}</td>
        <td style="font-weight:500">${l.Nama || '—'}</td>
        <td class="mono">${Utils.formatRupiah(l.Nominal)}</td>
        <td>${l.SBU || '—'}</td>
        <td>${l.Jabatan || '—'}</td>
        <td>${l.Bulan || '—'}</td>
        <td><span class="pill ${tagPill[l.Tagihan] || 'pill-gray'}">${l.Tagihan || '—'}</span></td>
      </tr>`).join('');

    this.renderPaginationGeneric('lemburPageControls', lemburPagination.page, totalPages, 'Handlers.goToLemburPage');
  },

  // ✅ BARU: Hitung data Dashboard Non PO — dipakai oleh render & export Excel supaya konsisten
  getNonPOData() {
    const sbuList = CONFIG.DEFAULT_SBU; // 10 SBU + 1 Pusat
    if (!AppState.lemburSbuConfig) AppState.lemburSbuConfig = {};

    const rows = sbuList.map(sbu => {
      const cfg = AppState.lemburSbuConfig[sbu] || { paguNonPO: 0, bnlp: 0 };
      const paguPerUnit = (Number(cfg.paguNonPO) || 0) / 12;         // poin 3.ii
      const bnlpPerBulan = (Number(cfg.bnlp) || 0) / 12;             // poin 3.iv
      const paguPerBulanStatic = CONFIG.PAGU_PER_BULAN_STATIC;       // poin 3.ix
      const maxTopupPerBulan = bnlpPerBulan - paguPerBulanStatic;    // poin 3.v

      const entriesSBU = AppState.lembur.filter(l => l.SBU === sbu && l.Bulan === AppState.selectedBulan); // ✅ DIUBAH: breakdown per bulan
      // ✅ DIUBAH: dihitung per pengajuan (baris), bukan NIP unik — 1 karyawan boleh punya beberapa pengajuan SPPD/Lembur
      const entriesSPPD = entriesSBU.filter(l => Utils.normalizeTagihan(l.Tagihan) === 'SPPD 1 2');
      const entriesLembur = entriesSBU.filter(l => Utils.normalizeTagihan(l.Tagihan) === 'Lembur');
      const jumlahKaryawanSPPD = entriesSPPD.length;
      const jumlahKaryawanLembur = entriesLembur.length;
      const jumlahKaryawan = entriesSBU.length; // poin 3.vi — total pengajuan SPPD + Lembur di SBU ini
      // ✅ BARU: rincian per jenis Tagihan agar jelas — 1 NIP bisa punya SPPD 1 2 & Lembur sekaligus
      const realisasiSPPD = entriesSPPD.reduce((sum, l) => sum + (Number(l.Nominal) || 0), 0);
      const realisasiLembur = entriesLembur.reduce((sum, l) => sum + (Number(l.Nominal) || 0), 0);
      const realisasi = realisasiSPPD + realisasiLembur; // poin 3.vii — total gabungan SPPD + Lembur (sesuai spesifikasi)

      const realisasiMaxTopupPct = maxTopupPerBulan !== 0 ? (realisasi / maxTopupPerBulan) * 100 : 0; // poin 3.viii
      const persentase = paguPerBulanStatic !== 0 ? (realisasi / paguPerBulanStatic) * 100 : 0;        // poin 3.x

      return { sbu, cfg, paguPerUnit, bnlpPerBulan, maxTopupPerBulan, jumlahKaryawan, jumlahKaryawanSPPD, jumlahKaryawanLembur, realisasiSPPD, realisasiLembur, realisasi, realisasiMaxTopupPct, paguPerBulanStatic, persentase };
    });

    // ✅ DIUBAH: Total Realisasi dihitung dari SEMUA data bulan ini (bukan hanya baris SBU yang cocok).
    // Ini memastikan data karyawan yang resign/dihapus dari Data Karyawan tetap terhitung penuh
    // dan tidak pernah mengurangi Total Realisasi / Grand Total, walau SBU-nya sudah tidak match.
    const totalRealisasi = AppState.lembur
      .filter(l => l.Bulan === AppState.selectedBulan)
      .reduce((sum, l) => sum + (Number(l.Nominal) || 0), 0);

    const tiketHPI = Number(AppState.tiketHPI) || 0;
    const manFee = totalRealisasi * CONFIG.MAN_FEE_PERSEN;
    const grandTotal = totalRealisasi + manFee;

    return { rows, totalRealisasi, tiketHPI, manFee, grandTotal };
  },

  // ✅ BARU: Render Dashboard Non PO (SBU, PAGU, BNLP, Realisasi, dsb — lihat penjelasan fitur)
  renderDashboardNonPO() {
    const { rows, totalRealisasi, tiketHPI, manFee, grandTotal } = this.getNonPOData();

    // ✅ Card ringkasan (poin 4): Total, Tiket HPI (manual), Man Fee 7%, Grand Total
    const elCard = document.getElementById('nonpo-summary-card');
    if (elCard) {
      elCard.innerHTML = `
        <div class="flex-between" style="align-items:center;margin-bottom:14px;">
          <div class="card-title" style="margin:0;">💰 Ringkasan Realisasi</div>
          <button class="btn btn-success btn-sm" onclick="Handlers.exportDashboardNonPOExcel()">⬇ Export Excel</button>
        </div>
        <div class="stat-grid" style="grid-template-columns:repeat(4,1fr);">
          <div class="stat-card"><div class="stat-label">Total Realisasi SPPD/Lembur</div><div class="stat-value accent">${Utils.formatRupiah(totalRealisasi)}</div></div>
          <div class="stat-card">
            <div class="stat-label">🎫 Tiket Dibelikan HPI</div>
            <input type="number" min="0" class="form-control" style="margin-top:6px;" value="${tiketHPI}" onchange="Handlers.updateTiketHPI(this.value)">
          </div>
          <div class="stat-card"><div class="stat-label">Man Fee (7%)</div><div class="stat-value warning">${Utils.formatRupiah(manFee)}</div></div>
          <div class="stat-card"><div class="stat-label">Grand Total</div><div class="stat-value success">${Utils.formatRupiah(grandTotal)}</div></div>
        </div>`;
    }

    const elTable = document.getElementById('nonpo-table');
    if (elTable) {
      elTable.innerHTML = `
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>SBU</th><th>PAGU Non PO (Tahunan)</th><th>PAGU/Unit sblm Man Fee</th>
              <th>BNLP (Tahunan)</th><th>BNLP/Bulan</th><th>Max Topup/Bulan</th>
              <th>Jml Karyawan SPPD</th><th>Jml Karyawan Lembur</th><th>Total Pengajuan</th><th>Realisasi SPPD 1 2</th><th>Realisasi Lembur</th><th>Realisasi SPPD/Lembur</th><th>Realisasi/Max Topup</th>
              <th>PAGU/Bulan</th><th>Persentase</th>
            </tr></thead>
            <tbody>
              ${rows.map(r => {
                const sbuEsc = r.sbu.replace(/'/g, "\\'");
                return `
                <tr>
                  <td style="white-space:nowrap;font-weight:500;">${r.sbu}</td>
                  <td><input type="number" min="0" class="form-control mono" style="min-width:130px" value="${r.cfg.paguNonPO || 0}" onchange="Handlers.updateLemburConfig('${sbuEsc}','paguNonPO',this.value)"></td>
                  <td class="mono">${Utils.formatRupiah(r.paguPerUnit)}</td>
                  <td><input type="number" min="0" class="form-control mono" style="min-width:130px" value="${r.cfg.bnlp || 0}" onchange="Handlers.updateLemburConfig('${sbuEsc}','bnlp',this.value)"></td>
                  <td class="mono">${Utils.formatRupiah(r.bnlpPerBulan)}</td>
                  <td class="mono">${Utils.formatRupiah(r.maxTopupPerBulan)}</td>
                  <td class="mono" style="text-align:center;">${r.jumlahKaryawanSPPD}</td>
                  <td class="mono" style="text-align:center;">${r.jumlahKaryawanLembur}</td>
                  <td class="mono" style="text-align:center;font-weight:600;">${r.jumlahKaryawan}</td>
                  <td class="mono">${Utils.formatRupiah(r.realisasiSPPD)}</td>
                  <td class="mono">${Utils.formatRupiah(r.realisasiLembur)}</td>
                  <td class="mono" style="font-weight:600;">${Utils.formatRupiah(r.realisasi)}</td>
                  <td class="mono">${r.realisasiMaxTopupPct.toFixed(1)}%</td>
                  <td class="mono">${Utils.formatRupiah(r.paguPerBulanStatic)}</td>
                  <td class="mono" style="font-weight:700;">${r.persentase.toFixed(1)}%</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>`;
    }

    // ✅ BARU: Log Perubahan khusus Data Lembur & SPPD (terpisah dari log Data Karyawan)
    this.renderLemburLog();
  },

  // ✅ BARU: Render Log Perubahan khusus Data Lembur & SPPD Karyawan (type diawali "lembur")
  renderLemburLog() {
    const container = document.getElementById('lembur-log-table');
    if (!container) return;
    const lemburLog = AppState.log.filter(c => c.type.startsWith('lembur')).slice().reverse();

    if (!lemburLog.length) {
      container.innerHTML = `<div class="empty"><div class="empty-icon">📋</div><h3>Belum ada perubahan</h3><p>Log akan muncul saat ada upload, hapus, atau perubahan konfigurasi data lembur/SPPD.</p></div>`;
      return;
    }

    const pillColor = { 'lembur upload': 'green', 'lembur hapus': 'yellow', 'lembur config': 'blue', 'lembur tiket': 'purple', 'lembur tambah': 'green', 'lembur edit': 'blue', 'lembur hapus semua': 'red' };
    container.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Tanggal</th><th>NIP / SBU</th><th>Nama</th><th>Tipe</th><th>Detail Perubahan</th></tr></thead>
          <tbody>
            ${lemburLog.map(c => `
              <tr>
                <td style="font-size:11px;color:var(--text2)">${c.ts}</td>
                <td class="mono">${c.nik}</td><td style="font-weight:500">${c.nama}</td>
                <td><span class="pill pill-${pillColor[c.type] || 'gray'}">${c.type.replace('lembur ', '').toUpperCase()}</span></td>
                <td style="font-size:12px"><span class="diff-old">${c.oldVal}</span><br><span class="diff-new">${c.newVal}</span>${c.catatan ? `<br><span style="color:var(--text2);font-size:10px">${c.catatan}</span>` : ''}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  },

  // ✅ BARU: Render Dashboard Laptop — ringkasan status per SBU (mirip Dashboard Non PO)
  renderDashboardLaptop() {
    const sbuList = CONFIG.DEFAULT_SBU;
    const laptop = AppState.laptop;

    const rows = sbuList.map(sbu => {
      const entries = laptop.filter(l => l.SBU === sbu);
      const aktif = entries.filter(l => l.Status === 'Aktif').length;
      const belum = entries.filter(l => l.Status === 'Belum Dikembalikan').length;
      const sudah = entries.filter(l => l.Status === 'Sudah Dikembalikan').length;
      const kosong = entries.filter(l => !l.Status).length;
      return { sbu, total: entries.length, aktif, belum, sudah, kosong };
    });

    const totalAktif = laptop.filter(l => l.Status === 'Aktif').length;
    const totalBelum = laptop.filter(l => l.Status === 'Belum Dikembalikan').length;
    const totalSudah = laptop.filter(l => l.Status === 'Sudah Dikembalikan').length;

    const elCard = document.getElementById('laptop-summary-card');
    if (elCard) {
      elCard.innerHTML = `
        <div class="flex-between" style="align-items:center;margin-bottom:14px;">
          <div class="card-title" style="margin:0;">💻 Ringkasan Status Laptop</div>
          <button class="btn btn-success btn-sm" onclick="Handlers.exportDashboardLaptopExcel()">⬇ Export Excel</button>
        </div>
        <div class="stat-grid" style="grid-template-columns:repeat(4,1fr);">
          <div class="stat-card"><div class="stat-label">Total Laptop</div><div class="stat-value accent">${laptop.length}</div></div>
          <div class="stat-card"><div class="stat-label">🟢 Aktif</div><div class="stat-value success">${totalAktif}</div></div>
          <div class="stat-card"><div class="stat-label">🔴 Belum Dikembalikan</div><div class="stat-value danger">${totalBelum}</div></div>
          <div class="stat-card"><div class="stat-label">✅ Sudah Dikembalikan</div><div class="stat-value warning">${totalSudah}</div></div>
        </div>`;
    }

    const elTable = document.getElementById('laptop-nonpo-table');
    if (elTable) {
      elTable.innerHTML = `
        <div class="table-wrap">
          <table>
            <thead><tr><th>SBU</th><th>Total Laptop</th><th>🟢 Aktif</th><th>🔴 Belum Dikembalikan</th><th>✅ Sudah Dikembalikan</th><th>Belum Diisi Status</th></tr></thead>
            <tbody>
              ${rows.map(r => `
                <tr>
                  <td style="font-weight:500;">${r.sbu}</td>
                  <td class="mono" style="text-align:center;font-weight:600;">${r.total}</td>
                  <td class="mono" style="text-align:center;">${r.aktif}</td>
                  <td class="mono" style="text-align:center;">${r.belum}</td>
                  <td class="mono" style="text-align:center;">${r.sudah}</td>
                  <td class="mono" style="text-align:center;color:var(--text2);">${r.kosong}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>`;
    }

    this.renderLaptopLog();
  },

  // ✅ BARU: Log Perubahan khusus Monitoring Laptop (terpisah dari log Karyawan & Lembur)
  renderLaptopLog() {
    const container = document.getElementById('laptop-log-table');
    if (!container) return;
    const laptopLog = AppState.log.filter(c => c.type.startsWith('laptop')).slice().reverse();

    if (!laptopLog.length) {
      container.innerHTML = `<div class="empty"><div class="empty-icon">📋</div><h3>Belum ada perubahan</h3><p>Log akan muncul saat ada upload, tambah, edit, atau hapus data laptop.</p></div>`;
      return;
    }

    const pillColor = { 'laptop upload': 'green', 'laptop tambah': 'green', 'laptop edit': 'blue', 'laptop hapus': 'yellow', 'laptop hapus semua': 'red' };
    container.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Tanggal</th><th>NIP</th><th>Nama</th><th>Tipe</th><th>Detail Perubahan</th></tr></thead>
          <tbody>
            ${laptopLog.map(c => `
              <tr>
                <td style="font-size:11px;color:var(--text2)">${c.ts}</td>
                <td class="mono">${c.nik}</td><td style="font-weight:500">${c.nama}</td>
                <td><span class="pill pill-${pillColor[c.type] || 'gray'}">${c.type.replace('laptop ', '').toUpperCase()}</span></td>
                <td style="font-size:12px"><span class="diff-old">${c.oldVal}</span><br><span class="diff-new">${c.newVal}</span>${c.catatan ? `<br><span style="color:var(--text2);font-size:10px">${c.catatan}</span>` : ''}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  },

  // ✅ BARU: Render Tabel Monitoring Pengadaan Laptop
  renderLaptopTable() {
    const { laptop, laptopPagination } = AppState;
    const q    = (document.getElementById('searchLaptop')?.value || '').toLowerCase();
    const fSBU = document.getElementById('filterLaptopSBU')?.value || '';
    const fSt  = document.getElementById('filterLaptopStatus')?.value || '';

    Utils.fillSelect('filterLaptopSBU', CONFIG.DEFAULT_SBU);
    Utils.fillSelect('filterLaptopStatus', CONFIG.STATUS_LAPTOP_OPTIONS);

    const filtered = laptop.filter(l =>
      (!q || l.NIP.toLowerCase().includes(q) || l.NamaPengguna.toLowerCase().includes(q) || l.SerialNumber.toLowerCase().includes(q) || l.NamaPerangkat.toLowerCase().includes(q)) &&
      (!fSBU || l.SBU === fSBU) &&
      (!fSt || l.Status === fSt)
    );

    const tbody = document.getElementById('laptopBody');
    const pageContainer = document.getElementById('paginationLaptop');
    if (!tbody) return;

    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="9"><div class="empty"><div class="empty-icon">💻</div><h3>Tidak ada data</h3></div></td></tr>`;
      if (pageContainer) pageContainer.style.display = 'none';
      return;
    }

    if (pageContainer) pageContainer.style.display = 'flex';
    const elTotal = document.getElementById('totalLaptopData');
    if (elTotal) elTotal.textContent = filtered.length;
    const totalPages = Math.ceil(filtered.length / laptopPagination.size) || 1;
    if (laptopPagination.page > totalPages) laptopPagination.page = totalPages;
    const startIdx = (laptopPagination.page - 1) * laptopPagination.size;
    const paginated = filtered.slice(startIdx, startIdx + laptopPagination.size);

    const statusPill = { 'Aktif': 'pill-green', 'Belum Dikembalikan': 'pill-red', 'Sudah Dikembalikan': 'pill-blue' };

    tbody.innerHTML = paginated.map((l, i) => {
      const suggestion = Utils.suggestStatusLaptop(l.NIP, !!l.BuktiBA);
      const mismatch = l.Status && suggestion !== l.Status;
      return `
      <tr>
        <td style="white-space:nowrap">
          <button class="btn btn-secondary btn-sm" onclick="Handlers.openLaptopModal(${l.id})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="Handlers.deleteLaptop(${l.id})">🗑</button>
        </td>
        <td class="mono" style="text-align:center;">${startIdx + i + 1}</td>
        <td>${l.NamaPerangkat || '—'}</td>
        <td>${l.PA || '—'}</td>
        <td${l.NIP ? ` style="font-weight:500;color:var(--accent2);cursor:pointer;" onclick="Handlers.openLaptopDetailModal('${l.NIP}')" title="Lihat detail peminjaman"` : ''}>${l.NamaPengguna || '—'}</td>
        <td class="mono">${l.SerialNumber || '—'}</td>
        <td>${l.SBU || '—'}</td>
        <td>
          <span class="pill ${statusPill[l.Status] || 'pill-gray'}">${l.Status || 'Belum diisi'}</span>
          ${mismatch ? `<div style="font-size:10px;color:var(--warning);margin-top:2px;">⚠️ Saran: ${suggestion}</div>` : ''}
        </td>
        <td style="text-align:center;">
          ${l.BuktiBA
            ? `<img src="${l.BuktiBA}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;cursor:pointer;" onclick="Handlers.viewBuktiBA('${l.id}')" title="Lihat gambar">`
            : `<span style="font-size:11px;color:var(--text2)">—</span>`}
        </td>
      </tr>`;
    }).join('');

    this.renderPaginationGeneric('laptopPageControls', laptopPagination.page, totalPages, 'Handlers.goToLaptopPage');
  },

  renderPindahJabatan() {
    const q  = (document.getElementById('searchPindah')?.value || '').toLowerCase();
    const fK = document.getElementById('filterPindahJabatan')?.value || '';
    Utils.fillSelect('filterPindahJabatan', [...new Set(AppState.karyawan.map(k => k.Jabatan))].filter(Boolean));

    const filtered = AppState.karyawan.filter(k => (!q || k.NIP.toLowerCase().includes(q) || k.Nama.toLowerCase().includes(q)) && (!fK || k.Jabatan === fK));
    const tbody = document.getElementById('pindahBody');

    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="7"><div class="empty"><h3>Tidak ada data</h3></div></td></tr>`;
      return;
    }
    tbody.innerHTML = filtered.map(k => `
      <tr>
        <td class="mono">${k.NIP}</td><td style="font-weight:500">${k.Nama}</td>
        <td>${k.Grade ? `<span class="pill pill-purple">${k.Grade}</span>` : '—'}</td>
        <td><span class="pill pill-blue">${k.Jabatan}</span></td><td>${k.SBU}</td>
        <td style="font-size:12px;color:var(--text2)">${k.TglUpdate}</td>
        <td><button class="btn btn-secondary btn-sm" onclick="Handlers.openQuickMoveModal(${k.id})">🔄 Pindah</button></td>
      </tr>`).join('');
  },

  renderJabatanList() {
    const list = document.getElementById('jabatanListDiv');
    if (!list) return;
    if (!AppState.jabatan.length) {
      list.innerHTML = `<div class="empty"><h3>Belum ada daftar jabatan</h3></div>`;
      return;
    }
    list.innerHTML = AppState.jabatan.map((j, i) => `
      <div class="jabatan-item">
        <div class="jabatan-item-name">${j.nama}</div>
        <button class="btn btn-danger btn-sm" onclick="Handlers.deleteJabatan(${i})">Hapus</button>
      </div>`).join('');
  },

  setupUploadZone() {
    const zone = document.getElementById('uploadZone');
    if (!zone) return;
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
    zone.addEventListener('drop', e => { 
      e.preventDefault(); zone.classList.remove('drag'); 
      if (e.dataTransfer.files[0]) Handlers.processExcel(e.dataTransfer.files[0]); 
    });
  },

  closeModal(id) {
    document.getElementById(id).classList.remove('open');
    AppState.modals.editTargetId = null;
  }
};

// ─── 8. EVENT HANDLERS (EXPOSED TO HTML) ────────────────────────────────────
const Handlers = {
  navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => {
      if (n.getAttribute('onclick')?.includes("'" + page + "'")) n.classList.add('active');
    });

    // ✅ DIUBAH: Dashboard Non PO & Tabel Lembur digabung jadi 1 halaman per-bulan (page-lembur-bulan),
    // dipanggil lewat Handlers.navigateBulan() dari menu sidebar — tidak lagi lewat navigate() biasa.
    const renders = {
      dashboard: 'renderDashboard', karyawan: 'renderKaryawanTable',
      pindah: 'renderPindahJabatan', jabatan: 'renderJabatanList',
      'dashboard-laptop': 'renderDashboardLaptop', laptop: 'renderLaptopTable' // ✅ BARU
    };
    if (renders[page]) UI[renders[page]]();
    if (page === 'upload') this.setUploadType(AppState.uploadDataType || 'karyawan'); // ✅ BARU
  },
  resetPageAndRender() { AppState.pagination.page = 1; UI.renderKaryawanTable(); },
  changePageSize() { AppState.pagination.size = parseInt(document.getElementById('pageSize').value); this.resetPageAndRender(); },
  goToPage(p) { AppState.pagination.page = p; UI.renderKaryawanTable(); },

  // ✅ BARU: Pagination untuk Tabel Monitoring Laptop
  resetLaptopPageAndRender() { AppState.laptopPagination.page = 1; UI.renderLaptopTable(); },
  changeLaptopPageSize() { AppState.laptopPagination.size = parseInt(document.getElementById('laptopPageSize').value); this.resetLaptopPageAndRender(); },
  goToLaptopPage(p) { AppState.laptopPagination.page = p; UI.renderLaptopTable(); },

  // ✅ DIUBAH: Buka/tutup grup menu tahun (2026 / 2027) di sidebar — sekarang menerima parameter tahun
  toggleTahunLembur(tahun) {
    const el = document.getElementById('menuBulanLembur' + tahun);
    const arrow = document.getElementById('tahunLemburArrow' + tahun);
    if (!el) return;
    const isOpen = el.style.display !== 'none';
    el.style.display = isOpen ? 'none' : '';
    if (arrow) arrow.textContent = isOpen ? '▸' : '▾';
  },

  // ✅ BARU: Navigasi ke halaman Data Lembur & SPPD untuk 1 bulan tertentu (dipilih dari sidebar tahun 2026/2027)
  navigateBulan(bulan) {
    // Pastikan grup tahun yang sesuai terbuka supaya bulan yang aktif kelihatan
    const tahunMatch = String(bulan).match(/\b(20\d{2})\b/);
    if (tahunMatch) {
      const tahun = tahunMatch[1];
      const elMonths = document.getElementById('menuBulanLembur' + tahun);
      const arrow = document.getElementById('tahunLemburArrow' + tahun);
      if (elMonths) elMonths.style.display = '';
      if (arrow) arrow.textContent = '▾';
    }

    AppState.selectedBulan = bulan;
    AppState.lemburPagination.page = 1;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-lembur-bulan').classList.add('active');
    document.querySelectorAll('.nav-item.nav-sub').forEach(n => {
      if (n.getAttribute('onclick')?.includes("'" + bulan + "'")) n.classList.add('active');
    });
    document.getElementById('lemburBulanTitle').textContent = `📅 Data Lembur & SPPD — ${bulan}`;
    this.setLemburViewTab(AppState.lemburViewTab || 'dashboard');
  },

  // ✅ BARU: Ganti tab dalam halaman bulan Lembur & SPPD — 'dashboard' (Dashboard Non PO) atau 'tabel' (Tabel Data)
  setLemburViewTab(tab) {
    AppState.lemburViewTab = tab;
    const btnDash = document.getElementById('tabBtnDashboard');
    const btnTabel = document.getElementById('tabBtnTabel');
    if (btnDash) btnDash.className = 'btn ' + (tab === 'dashboard' ? 'btn-primary' : 'btn-secondary');
    if (btnTabel) btnTabel.className = 'btn ' + (tab === 'tabel' ? 'btn-primary' : 'btn-secondary');
    document.getElementById('lemburBulanDashboardView').style.display = tab === 'dashboard' ? 'block' : 'none';
    document.getElementById('lemburBulanTabelView').style.display = tab === 'tabel' ? 'block' : 'none';
    if (tab === 'dashboard') UI.renderDashboardNonPO(); else UI.renderLemburTable();
  },

  // ✅ BARU: Pagination untuk Tabel Data Lembur dan SPPD Karyawan
  resetLemburPageAndRender() { AppState.lemburPagination.page = 1; UI.renderLemburTable(); },
  changeLemburPageSize() { AppState.lemburPagination.size = parseInt(document.getElementById('lemburPageSize').value); this.resetLemburPageAndRender(); },
  goToLemburPage(p) { AppState.lemburPagination.page = p; UI.renderLemburTable(); },

  // ✅ DIUBAH: Pilih jenis data yang akan diupload (poin 1) — mengubah kolom yang dibaca dari Excel. Sekarang 3 pilihan.
  setUploadType(type) {
    AppState.uploadDataType = ['karyawan', 'lembur', 'laptop'].includes(type) ? type : 'karyawan';
    const btnK = document.getElementById('btnUploadTypeKaryawan');
    const btnL = document.getElementById('btnUploadTypeLembur');
    const btnP = document.getElementById('btnUploadTypeLaptop');
    if (btnK) btnK.className = 'btn ' + (AppState.uploadDataType === 'karyawan' ? 'btn-primary' : 'btn-secondary');
    if (btnL) btnL.className = 'btn ' + (AppState.uploadDataType === 'lembur' ? 'btn-primary' : 'btn-secondary');
    if (btnP) btnP.className = 'btn ' + (AppState.uploadDataType === 'laptop' ? 'btn-primary' : 'btn-secondary');

    const desc = document.getElementById('uploadTypeDesc');
    if (desc) {
      if (AppState.uploadDataType === 'karyawan') {
        desc.innerHTML = `Kolom: NIP, Nama, NIK, Grade, Jabatan, SBU, BKO Jabatan, BKO SBU, NIP Baru, Email, Email Korporat, Nama Akun ICRM, Tanggal Masuk, Tanggal Keluar, Ukuran Baju, Nomor Telpon, Status, Catatan Status.<br>
           🔑 <strong>NIP diperlakukan sebagai Primary Key.</strong> NIP yang sudah terdaftar akan otomatis dilewati.`;
      } else if (AppState.uploadDataType === 'lembur') {
        desc.innerHTML = `Kolom: <strong>NIP, Nominal, Bulan, Tagihan</strong> (Bulan: "Januari"–"Desember" ${CONFIG.TAHUN_LEMBUR_LIST.join('/')}; Tagihan: "SPPD 1 2" atau "Lembur").<br>
           ℹ️ Nama, SBU, dan Jabatan otomatis diambil dari Data Karyawan berdasarkan NIP — cukup isi NIP di file Excel.`;
      } else {
        desc.innerHTML = `Kolom: <strong>NIP (opsional), Nama Perangkat, PA, Serial Number, Status</strong> (Status: "Aktif", "Belum Dikembalikan", atau "Sudah Dikembalikan" — boleh dikosongkan).<br>
           ℹ️ NIP <strong>tidak wajib</strong> — kalau diisi &amp; ditemukan di Data Karyawan, Nama Pengguna &amp; Regional (SBU) otomatis terisi. Kalau NIP kosong/tidak ditemukan, isi kolom <strong>Nama Pengguna</strong> &amp; <strong>Regional</strong> secara manual di Excel (wajib salah satu dari NIP/Nama Pengguna terisi).<br>
           📎 <strong>Bukti Berita Acara Pengembalian</strong> (gambar) tidak bisa diupload lewat Excel — upload manual per laptop lewat tombol ✏️ Edit setelah data masuk.`;
      }
    }
    this.cancelUpload();
  },

  // ✅ BARU: Handler pagination untuk Review Log Perubahan
  resetLogPageAndRender() { AppState.logPagination.page = 1; UI.renderDashboard(); },
  changeLogPageSize() { AppState.logPagination.size = parseInt(document.getElementById('logPageSize').value); this.resetLogPageAndRender(); },
  goToLogPage(p) { AppState.logPagination.page = p; UI.renderDashboard(); },

  // ✅ BARU: Bersihkan filter rentang tanggal pada Review Log Perubahan
  resetLogDateFilter() {
    document.getElementById('filterLogDateFrom').value = '';
    document.getElementById('filterLogDateTo').value = '';
    this.resetLogPageAndRender();
  },

  handleFile(e) { if (e.target.files[0]) this.processExcel(e.target.files[0]); },
  processExcel(file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const wb = XLSX.read(ev.target.result, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      if (!raw.length) return Utils.toast('❌ File kosong!');

      // ✅ BARU: cabang berdasarkan jenis data yang dipilih di halaman Upload (poin 1)
      if (AppState.uploadDataType === 'lembur') return this.processExcelLembur(raw);
      if (AppState.uploadDataType === 'laptop') return this.processExcelLaptop(raw);

      const COLS = ['NIP','Nama','NIK','Grade','Jabatan','SBU','BKO Jabatan','BKO SBU','NIP Baru',
        'Email','Email Korporat','Nama Akun ICRM','Tanggal Masuk','Tanggal Keluar','Ukuran Baju','Nomor Telpon','Status','Catatan Status'];
      const header = raw[0].map(h => String(h).trim());

      AppState.previewUpload = raw.slice(1).map(row => {
        let obj = {};
        COLS.forEach(col => {
          const idx = header.findIndex(h => h.toLowerCase() === col.toLowerCase());
          obj[col] = idx >= 0 ? String(row[idx]) : '';
        });
        return obj;
      }).filter(r => r.NIP || r.Nama);

      // ✅ BARU: Klasifikasikan setiap baris berdasarkan status NIP (Primary Key) untuk ditampilkan di preview
      const classified = EmployeeService.classifyUploadRows(AppState.previewUpload);
      const statusBadge = {
        new:               '<span class="pill pill-green">✔ Baru</span>',
        duplicate_existing:'<span class="pill pill-yellow">⚠ NIP Sudah Ada</span>',
        duplicate_infile:  '<span class="pill pill-yellow">⚠ Duplikat di File</span>',
        invalid:           '<span class="pill pill-red">✕ NIP Kosong</span>'
      };
      const rowClass = {
        new: '', duplicate_existing: 'style="opacity:0.55"', duplicate_infile: 'style="opacity:0.55"', invalid: 'style="opacity:0.4"'
      };

      // ✅ BARU: Ringkasan statistik sebelum konfirmasi
      const stats = {
        total: classified.length,
        new: classified.filter(r => r.__uploadStatus === 'new').length,
        duplicateExisting: classified.filter(r => r.__uploadStatus === 'duplicate_existing').length,
        duplicateInFile: classified.filter(r => r.__uploadStatus === 'duplicate_infile').length,
        invalid: classified.filter(r => r.__uploadStatus === 'invalid').length
      };
      const elStats = document.getElementById('previewStats');
      if (elStats) {
        elStats.innerHTML = `
          <div class="stat-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px;">
            <div class="stat-card"><div class="stat-label">✔ Data Baru (akan ditambahkan)</div><div class="stat-value success">${stats.new}</div></div>
            <div class="stat-card"><div class="stat-label">⚠ NIP Sudah Ada di Sistem</div><div class="stat-value warning">${stats.duplicateExisting}</div></div>
            <div class="stat-card"><div class="stat-label">⚠ Duplikat di Dalam File</div><div class="stat-value warning">${stats.duplicateInFile}</div></div>
            <div class="stat-card"><div class="stat-label">✕ NIP Kosong (tidak valid)</div><div class="stat-value danger">${stats.invalid}</div></div>
          </div>
          <div class="info-note">ℹ️ NIP diperlakukan sebagai <strong>Primary Key</strong>. Hanya baris berstatus <strong>Baru</strong> yang akan ditambahkan ke sistem; baris lain akan dilewati otomatis.</div>`;
      }

      document.getElementById('previewHead').innerHTML = '<th>Status</th>' + COLS.map(c => `<th>${c}</th>`).join('');
      document.getElementById('previewBody').innerHTML = classified.slice(0, 50).map(r => `
        <tr ${rowClass[r.__uploadStatus]}><td>${statusBadge[r.__uploadStatus]}</td>${COLS.map(c => `<td class="${c === 'NIP' || c === 'NIK' ? 'mono' : ''}">${r[c]}</td>`).join('')}</tr>
      `).join('') + (classified.length > 50 ? `<tr><td colspan="${COLS.length + 1}" style="text-align:center;color:var(--text2);">... dan ${classified.length - 50} baris lainnya</td></tr>` : '');
      
      document.getElementById('previewCard').style.display = 'block';
      Utils.toast(`✅ Berhasil membaca ${AppState.previewUpload.length} baris data`);
    };
    reader.readAsBinaryString(file);
  },

  // ✅ BARU: Baca & preview file Excel untuk Data Lembur dan SPPD Karyawan (poin 1 & 2)
  // File cukup berisi NIP, Nominal, Bulan, Tagihan — Nama/SBU/Jabatan diambil dari Data Karyawan.
  processExcelLembur(raw) {
    const COLS = ['NIP', 'Nominal', 'Bulan', 'Tagihan'];
    const header = raw[0].map(h => String(h).trim());

    AppState.previewUpload = raw.slice(1).map(row => {
      let obj = {};
      COLS.forEach(col => {
        const idx = header.findIndex(h => h.toLowerCase() === col.toLowerCase());
        obj[col] = idx >= 0 ? String(row[idx]) : '';
      });
      return obj;
    }).filter(r => r.NIP || r.Nominal);

    const classified = LemburService.classifyUploadRows(AppState.previewUpload);
    const statusBadge = {
      new:             '<span class="pill pill-green">✔ Valid</span>',
      invalid_nip:     '<span class="pill pill-red">✕ NIP Kosong</span>',
      invalid_nominal: '<span class="pill pill-red">✕ Nominal Tidak Valid</span>',
      invalid_bulan:   '<span class="pill pill-red">✕ Bulan Tidak Dikenali</span>'
    };
    const rowClass = { new: '', invalid_nip: 'style="opacity:0.4"', invalid_nominal: 'style="opacity:0.4"', invalid_bulan: 'style="opacity:0.4"' };

    const stats = {
      total: classified.length,
      valid: classified.filter(r => r.__uploadStatus === 'new').length,
      invalid: classified.filter(r => r.__uploadStatus !== 'new').length
    };

    const elStats = document.getElementById('previewStats');
    if (elStats) {
      elStats.innerHTML = `
        <div class="stat-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px;">
          <div class="stat-card"><div class="stat-label">✔ Data Valid (akan ditambahkan)</div><div class="stat-value success">${stats.valid}</div></div>
          <div class="stat-card"><div class="stat-label">✕ Tidak Valid (dilewati)</div><div class="stat-value danger">${stats.invalid}</div></div>
        </div>
        <div class="info-note">ℹ️ Nama, SBU, dan Jabatan otomatis diambil dari NIP. Kolom <strong>Bulan</strong> wajib salah satu dari 12 bulan tahun ${CONFIG.TAHUN_LEMBUR_LIST.join(' / ')} (mis. "Januari", "Januari 2027") agar bisa masuk breakdown bulanan.</div>`;
    }

    document.getElementById('previewHead').innerHTML = '<th>Status</th>' + COLS.map(c => `<th>${c}</th>`).join('');
    document.getElementById('previewBody').innerHTML = classified.slice(0, 50).map(r => `
      <tr ${rowClass[r.__uploadStatus]}><td>${statusBadge[r.__uploadStatus]}</td>${COLS.map(c => {
        const val = c === 'Nominal' ? Utils.formatRupiah(Utils.parseNominal(r[c])) : r[c];
        return `<td class="${c === 'NIP' ? 'mono' : ''}">${val}</td>`;
      }).join('')}</tr>
    `).join('') + (classified.length > 50 ? `<tr><td colspan="${COLS.length + 1}" style="text-align:center;color:var(--text2);">... dan ${classified.length - 50} baris lainnya</td></tr>` : '');

    document.getElementById('previewCard').style.display = 'block';
    Utils.toast(`✅ Berhasil membaca ${AppState.previewUpload.length} baris data`);
  },

  // ✅ BARU: Baca & preview file Excel untuk Monitoring Pengadaan Laptop.
  // Nama Pengguna & Regional bersifat opsional (cadangan) — akan ditimpa data Karyawan kalau NIP ketemu.
  processExcelLaptop(raw) {
    const COLS = ['NIP', 'NamaPerangkat', 'PA', 'SerialNumber', 'Status', 'NamaPengguna', 'SBU'];
    const COL_LABEL = { NamaPerangkat: 'Nama Perangkat', SerialNumber: 'Serial Number', NamaPengguna: 'Nama Pengguna', SBU: 'Regional' };
    const header = raw[0].map(h => String(h).trim());

    AppState.previewUpload = raw.slice(1).map(row => {
      let obj = {};
      COLS.forEach(col => {
        const label = COL_LABEL[col] || col;
        const idx = header.findIndex(h => h.toLowerCase() === label.toLowerCase() || h.toLowerCase() === col.toLowerCase());
        obj[col] = idx >= 0 ? String(row[idx]) : '';
      });
      return obj;
    }).filter(r => r.NIP || r.NamaPerangkat || r.SerialNumber);

    const classified = LaptopService.classifyUploadRows(AppState.previewUpload);
    const statusBadge = {
      new:                '<span class="pill pill-green">✔ Valid</span>',
      invalid_identitas:  '<span class="pill pill-red">✕ NIP &amp; Nama Pengguna Kosong</span>',
      invalid_perangkat:  '<span class="pill pill-red">✕ Nama Perangkat Kosong</span>',
      invalid_serial:     '<span class="pill pill-red">✕ Serial Number Kosong</span>'
    };
    const rowClass = { new: '', invalid_identitas: 'style="opacity:0.4"', invalid_perangkat: 'style="opacity:0.4"', invalid_serial: 'style="opacity:0.4"' };

    const stats = {
      total: classified.length,
      valid: classified.filter(r => r.__uploadStatus === 'new').length,
      invalid: classified.filter(r => r.__uploadStatus !== 'new').length
    };

    const elStats = document.getElementById('previewStats');
    if (elStats) {
      elStats.innerHTML = `
        <div class="stat-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px;">
          <div class="stat-card"><div class="stat-label">✔ Data Valid (akan ditambahkan)</div><div class="stat-value success">${stats.valid}</div></div>
          <div class="stat-card"><div class="stat-label">✕ Tidak Valid (dilewati)</div><div class="stat-value danger">${stats.invalid}</div></div>
        </div>
        <div class="info-note">ℹ️ Nama Pengguna &amp; Regional otomatis diambil dari NIP kalau ketemu. Bukti Berita Acara diupload manual per laptop setelah data ini masuk.</div>`;
    }

    const displayCols = ['NIP', 'NamaPerangkat', 'PA', 'SerialNumber', 'Status'];
    document.getElementById('previewHead').innerHTML = '<th>Validasi</th>' + displayCols.map(c => `<th>${COL_LABEL[c] || c}</th>`).join('');
    document.getElementById('previewBody').innerHTML = classified.slice(0, 50).map(r => `
      <tr ${rowClass[r.__uploadStatus]}><td>${statusBadge[r.__uploadStatus]}</td>${displayCols.map(c => {
        const val = c === 'Status' ? (Utils.normalizeStatusLaptop(r[c]) || '<span style="color:var(--text2)">(belum diisi)</span>') : r[c];
        return `<td class="${c === 'NIP' ? 'mono' : ''}">${val}</td>`;
      }).join('')}</tr>
    `).join('') + (classified.length > 50 ? `<tr><td colspan="${displayCols.length + 1}" style="text-align:center;color:var(--text2);">... dan ${classified.length - 50} baris lainnya</td></tr>` : '');

    document.getElementById('previewCard').style.display = 'block';
    Utils.toast(`✅ Berhasil membaca ${AppState.previewUpload.length} baris data`);
  },

  cancelUpload() {
    AppState.previewUpload = [];
    document.getElementById('previewCard').style.display = 'none';
    document.getElementById('fileInput').value = ''; 
    Utils.toast('ℹ️ Review upload dibatalkan');
  },
  confirmUpload() {
    if (!AppState.previewUpload.length) return Utils.toast('❌ Tidak ada data!');

    // ✅ BARU: Cabang upload Data Lembur dan SPPD Karyawan
    if (AppState.uploadDataType === 'lembur') {
      const stats = LemburService.bulkUpload(AppState.previewUpload);
      this.cancelUpload();
      Utils.toast(stats.invalid > 0
        ? `✅ ${stats.added} data lembur/SPPD ditambahkan. ⚠ ${stats.invalid} baris dilewati (tidak valid).`
        : `✅ ${stats.added} data lembur/SPPD berhasil disimpan.`, 5000);
      if (stats.bulanTarget) this.navigateBulan(stats.bulanTarget); // ✅ BARU: langsung ke bulan yang baru diupload
      return;
    }

    // ✅ BARU: Cabang upload Monitoring Pengadaan Laptop
    if (AppState.uploadDataType === 'laptop') {
      const stats = LaptopService.bulkUpload(AppState.previewUpload);
      this.cancelUpload();
      Utils.toast(stats.invalid > 0
        ? `✅ ${stats.added} data laptop ditambahkan. ⚠ ${stats.invalid} baris dilewati (tidak valid).`
        : `✅ ${stats.added} data laptop berhasil disimpan.`, 5000);
      this.resetLaptopPageAndRender();
      this.navigate('dashboard-laptop');
      return;
    }

    // ✅ BARU: Mapping nama kolom Excel ke nama field model
    const mapped = AppState.previewUpload.map(r => ({
      NIP: r['NIP'], Nama: r['Nama'], NIK: r['NIK'], Grade: r['Grade'],
      Jabatan: r['Jabatan'], SBU: r['SBU'],
      BKOJabatan: r['BKO Jabatan'], BKOSBU: r['BKO SBU'],
      NIPBaru: r['NIP Baru'],
      Email: r['Email'], EmailKorporat: r['Email Korporat'],
      NamaAkunICRM: r['Nama Akun ICRM'],
      TglMasuk: r['Tanggal Masuk'], TglKeluar: r['Tanggal Keluar'],
      UkuranBaju: r['Ukuran Baju'], NoTelp: r['Nomor Telpon'],
      Status: r['Status'], StatusCatatan: r['Catatan Status'] // ✅ DIPERBAIKI: sebelumnya tidak dipetakan sama sekali
    }));
    // ✅ DIUBAH: bulkUpload kini mengembalikan statistik (NIP sebagai Primary Key)
    const stats = EmployeeService.bulkUpload(mapped);
    this.cancelUpload();

    const skippedTotal = stats.duplicateExisting + stats.duplicateInFile + stats.invalid;
    const slotNote = stats.slotConfigBuilt
      ? ' 📊 Slot Jabatan per SBU otomatis dibangun mengikuti jumlah karyawan di file ini (bisa disesuaikan lewat Edit Slot).'
      : '';
    if (skippedTotal > 0) {
      Utils.toast(`✅ ${stats.added} data baru ditambahkan. ⚠ ${skippedTotal} baris dilewati (duplikat/tidak valid).${slotNote}`, 6000);
    } else {
      Utils.toast(`✅ ${stats.added} karyawan baru berhasil disimpan.${slotNote}`, stats.slotConfigBuilt ? 6000 : 3000);
    }
    this.resetPageAndRender();
    this.navigate('dashboard');
  },

  // ✅ BARU: Buka modal detail informasi karyawan + histori perpindahan jabatan
  openDetailModal(id) {
    const emp = AppState.karyawan.find(k => k.id === id);
    if (!emp) return;

    const history = EmployeeService.getJabatanHistory(emp);
    // Tampilkan dari yang paling baru dulu
    const historyDesc = history.slice().reverse();

    const historyRows = historyDesc.map(h => {
      const durasiBulan = Utils.monthsBetweenDates(h.mulai, h.selesai);
      const durasiLabel = Utils.formatDurationMonths(durasiBulan);
      return `
        <tr class="${h.current ? 'detail-history-current' : ''}">
          <td><span class="pill pill-blue">${h.jabatan || '—'}</span>${h.current ? ' <span class="pill pill-green" style="margin-left:4px">Saat Ini</span>' : ''}</td>
          <td style="font-size:12px;color:var(--text2)">${Utils.formatDateID(h.mulai)}</td>
          <td style="font-size:12px;color:var(--text2)">${h.current ? '<span style="color:var(--accent2);font-weight:600">Sekarang</span>' : Utils.formatDateID(h.selesai)}</td>
          <td style="font-weight:600">${durasiLabel}</td>
        </tr>`;
    }).join('');

    const infoItem = (label, value) => `
      <div class="detail-info-item">
        <div class="detail-info-label">${label}</div>
        <div class="detail-info-value">${value || '—'}</div>
      </div>`;

    document.getElementById('detailKaryawanBody').innerHTML = `
      <div class="card" style="background:var(--surface2);border-color:var(--border2);margin-bottom:0">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:16px;">
          <div>
            <div style="font-size:18px;font-weight:700">${emp.Nama}</div>
            <div style="font-size:12px;color:var(--text2);margin-top:2px" class="mono">NIP: ${emp.NIP}</div>
          </div>
          <div>${Utils.statusPill(emp.Status)}</div>
        </div>
        <div class="detail-info-grid">
          ${infoItem('NIK', `<span class="mono">${emp.NIK}</span>`)}
          ${infoItem('Grade', emp.Grade ? `<span class="pill pill-purple">${emp.Grade}</span>` : '—')}
          ${infoItem('Jabatan Saat Ini', `<span class="pill pill-blue">${emp.Jabatan}</span>`)}
          ${infoItem('SBU', emp.SBU)}
          ${infoItem('BKO Jabatan', emp.BKOJabatan)}
          ${infoItem('BKO SBU', emp.BKOSBU)}
          ${infoItem('Email', emp.Email)}
          ${infoItem('Email Korporat', emp.EmailKorporat)}
          ${infoItem('Nama Akun ICRM', emp.NamaAkunICRM)}
          ${infoItem('No. Telepon', emp.NoTelp)}
          ${infoItem('Ukuran Baju', emp.UkuranBaju)}
          ${infoItem('Tanggal Masuk', Utils.formatDateID(emp.TglMasuk))}
          ${infoItem('Tanggal Keluar', Utils.formatDateID(emp.TglKeluar))}
          ${infoItem('NIP Baru', emp.NIPBaru)}
          ${infoItem('Terakhir Update', Utils.formatDateID(emp.TglUpdate))}
        </div>
        ${emp.StatusCatatan ? `<div class="info-note" style="margin-top:14px;margin-bottom:0">📝 Catatan Status: ${emp.StatusCatatan}</div>` : ''}
      </div>

      <div class="detail-section-title">📜 Histori Perpindahan Jabatan</div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Jabatan</th><th>Mulai</th><th>Selesai</th><th>Durasi Menjabat</th></tr></thead>
          <tbody>${historyRows || `<tr><td colspan="4"><div class="empty" style="padding:24px"><h3>Belum ada histori</h3></div></td></tr>`}</tbody>
        </table>
      </div>`;

    document.getElementById('modalDetailKaryawan').classList.add('open');
  },

  // ✅ DIUBAH: openEditModal — tambah populate dropdown BKO Jabatan & BKO SBU
  openEditModal(id) {
    AppState.modals.editTargetId = id;
    
    // Populate semua dropdown
    const elJabatan    = document.getElementById('editJabatan');
    const elSBU        = document.getElementById('editSBU');
    const elBKOJabatan = document.getElementById('editBKOJabatan');
    const elBKOSBU     = document.getElementById('editBKOSBU');

    elJabatan.innerHTML = '<option value="">— Pilih Jabatan —</option>' + 
      AppState.jabatan.map(j => `<option value="${j.nama}">${j.nama}</option>`).join('');

    elSBU.innerHTML = '<option value="">— Pilih SBU —</option>' + 
      CONFIG.DEFAULT_SBU.map(s => `<option value="${s}">${s}</option>`).join('');

    // ✅ BKO Jabatan dropdown
    elBKOJabatan.innerHTML = '<option value="">— Pilih BKO Jabatan —</option>' + 
      CONFIG.DEFAULT_BKO_JABATAN.map(b => `<option value="${b}">${b}</option>`).join('');

    // ✅ BKO SBU dropdown
    elBKOSBU.innerHTML = '<option value="">— Pilih BKO SBU —</option>' + 
      CONFIG.DEFAULT_BKO_SBU.map(b => `<option value="${b}">${b}</option>`).join('');

    // ✅ Ukuran baju dropdown
    const elUkuranBaju = document.getElementById('editUkuranBaju');
    if (elUkuranBaju) {
      elUkuranBaju.innerHTML = '<option value="">— Pilih Ukuran —</option>' +
        CONFIG.UKURAN_BAJU.map(u => `<option value="${u}">${u}</option>`).join('');
    }

    const emp = id ? AppState.karyawan.find(k => k.id === id) : Models.Karyawan();

    // Populate field values
    document.getElementById('editNIP').value          = emp.NIP;
    document.getElementById('editNama').value         = emp.Nama;
    document.getElementById('editNIK').value          = emp.NIK || '';                        // ✅ BARU
    document.getElementById('editGrade').value        = emp.Grade || '';                       // ✅ BARU
    document.getElementById('editJabatan').value      = emp.Jabatan;
    document.getElementById('editSBU').value          = emp.SBU;
    document.getElementById('editBKOJabatan').value   = emp.BKOJabatan; // ✅ set value dropdown
    document.getElementById('editBKOSBU').value       = emp.BKOSBU;     // ✅ set value dropdown
    document.getElementById('editNIPBaru').value      = emp.NIPBaru;
    document.getElementById('editEmail').value        = emp.Email;
    document.getElementById('editEmailKorporat').value= emp.EmailKorporat || '';               // ✅ BARU
    document.getElementById('editNamaAkunICRM').value = emp.NamaAkunICRM || '';                // ✅ BARU
    document.getElementById('editTglMasuk').value     = emp.TglMasuk || '';                    // ✅ BARU
    document.getElementById('editTglKeluar').value    = emp.TglKeluar || '';                   // ✅ BARU
    document.getElementById('editUkuranBaju').value   = emp.UkuranBaju || '';                  // ✅ BARU
    document.getElementById('editNoTelp').value       = emp.NoTelp || '+62';                   // ✅ BARU
    document.getElementById('editStatus').value       = emp.Status;
    document.getElementById('editCatatanStatus').value= emp.StatusCatatan;

    document.getElementById('modalEditData').classList.add('open');
  },

  // ✅ BARU: Saat BKO Jabatan dipilih di form edit, langsung sinkronkan dropdown Jabatan
  // (agar user melihat perubahan sebelum menyimpan). Aturan final tetap ditegakkan lagi
  // di saveEditData() supaya konsisten walau user sempat mengubah dropdown Jabatan manual.
  syncJabatanFromBKO() {
    const bko = document.getElementById('editBKOJabatan').value;
    if (bko) document.getElementById('editJabatan').value = bko;
  },

  // ✅ DIUBAH: saveEditData — nilai BKO diambil dari select, di-uppercase via Models.Karyawan
  saveEditData() {
    const NIP  = document.getElementById('editNIP').value.trim();
    const Nama = document.getElementById('editNama').value.trim();
    const TglMasuk = document.getElementById('editTglMasuk').value;
    if (!NIP || !Nama) return Utils.toast('❌ NIP dan Nama wajib diisi!');
    // if (!TglMasuk) return Utils.toast('❌ Tanggal Masuk wajib diisi!'); // ✅ BARU: validasi mandatory

    const BKOJabatanValue = document.getElementById('editBKOJabatan').value.toUpperCase();
    // ✅ BARU: Jika BKO Jabatan diisi, Jabatan resmi mengikuti nilai BKO Jabatan tsb.
    // Kalau BKO Jabatan dikosongkan, Jabatan tetap mengikuti pilihan di dropdown Jabatan seperti biasa.
    const JabatanValue = BKOJabatanValue || document.getElementById('editJabatan').value;

    const formData = {
      NIP, Nama,
      NIK:           document.getElementById('editNIK').value,               // ✅ BARU
      Grade:         document.getElementById('editGrade').value,             // ✅ BARU
      Jabatan:       JabatanValue,
      SBU:           document.getElementById('editSBU').value,
      BKOJabatan:    BKOJabatanValue,
      BKOSBU:        document.getElementById('editBKOSBU').value.toUpperCase(),     // ✅ uppercase
      NIPBaru:       document.getElementById('editNIPBaru').value,
      Email:         document.getElementById('editEmail').value,
      EmailKorporat: document.getElementById('editEmailKorporat').value,     // ✅ BARU
      NamaAkunICRM:  document.getElementById('editNamaAkunICRM').value,      // ✅ BARU
      TglMasuk,                                                              // ✅ DIUBAH: kini wajib diisi
      TglKeluar:     document.getElementById('editTglKeluar').value,         // ✅ BARU
      UkuranBaju:    document.getElementById('editUkuranBaju').value,        // ✅ BARU
      NoTelp:        document.getElementById('editNoTelp').value             // ✅ BARU
    };

    const statusData = {
      Status:  document.getElementById('editStatus').value,
      Catatan: document.getElementById('editCatatanStatus').value.trim()
    };

    // ✅ DIUBAH: NIP diperlakukan sebagai Primary Key — tangani hasil objek {success, error} dari service
    let result;
    if (AppState.modals.editTargetId === null) {
      result = EmployeeService.add({ ...formData, ...statusData });
      if (!result.success) {
        if (result.error === 'duplicate') {
          return Utils.toast(`❌ NIP "${result.nip}" sudah terdaftar! NIP tidak boleh duplikat.`, 4000);
        }
        return Utils.toast('❌ Gagal menyimpan data.');
      }
      AppState.pagination.page = 1;
      Utils.toast(`✅ Karyawan ditambahkan!`);
    } else {
      result = EmployeeService.update(AppState.modals.editTargetId, formData, statusData);
      if (!result.success) {
        if (result.error === 'duplicate') {
          return Utils.toast(`❌ NIP "${result.nip}" sudah dipakai karyawan lain! NIP tidak boleh duplikat.`, 4000);
        }
        return Utils.toast('❌ Gagal memperbarui data.');
      }
      Utils.toast(BKOJabatanValue
        ? `✅ Data diperbarui! Jabatan otomatis disesuaikan mengikuti BKO Jabatan: ${BKOJabatanValue}`
        : `✅ Data diperbarui!`, BKOJabatanValue ? 5000 : 3000);
    }

    UI.closeModal('modalEditData');
    UI.renderKaryawanTable();
    UI.renderDashboard();
    UI.updateBadge();
  },

  openQuickMoveModal(id) {
    AppState.modals.editTargetId = id;
    const emp = AppState.karyawan.find(x => x.id === id);
    if (!emp) return;

    document.getElementById('modalNama').textContent = emp.Nama;
    document.getElementById('modalNIK').textContent  = 'NIP: ' + emp.NIP;
    document.getElementById('modalJabatanLama').textContent = emp.Jabatan;

    const sel = document.getElementById('modalJabatanBaru');
    sel.innerHTML = '<option value="">— Pilih Jabatan —</option>' + AppState.jabatan.map(j => `<option value="${j.nama}">${j.nama}</option>`).join('');
    document.getElementById('modalPindah').classList.add('open');
  },
  saveQuickMove() {
    const newJabatan = document.getElementById('modalJabatanBaru').value;
    if (!newJabatan) return Utils.toast('❌ Pilih jabatan baru terlebih dahulu!');

    EmployeeService.update(AppState.modals.editTargetId, { Jabatan: newJabatan });
    UI.closeModal('modalPindah');
    UI.renderPindahJabatan();
    UI.updateBadge();
    Utils.toast(`✅ Jabatan berhasil diubah`);
  },

  // ✅ BARU: Hapus karyawan dengan modal konfirmasi kustom
  deleteKaryawan(id) {
    const emp = AppState.karyawan.find(k => k.id === id);
    if (!emp) return;

    // Isi data di modal konfirmasi
    document.getElementById('confirmDeleteNama').textContent = emp.Nama;
    document.getElementById('confirmDeleteNIP').textContent  = emp.NIP;
    document.getElementById('confirmDeleteJabatan').textContent = emp.Jabatan || '—';
    document.getElementById('confirmDeleteSBU').textContent  = emp.SBU || '—';

    // Simpan id target ke tombol konfirmasi
    document.getElementById('btnConfirmDelete').setAttribute('data-id', id);
    document.getElementById('modalConfirmDelete').classList.add('open');
  },

  confirmDeleteKaryawan() {
    const id = parseFloat(document.getElementById('btnConfirmDelete').getAttribute('data-id'));
    const emp = AppState.karyawan.find(k => k.id === id);
    if (!emp) return;

    const nama = emp.Nama;
    AppState.log.push(Models.LogChange(emp.NIP, emp.Nama, 'hapus', nama, '(dihapus)'));
    AppState.karyawan = AppState.karyawan.filter(k => k.id !== id);
    DB.save();

    UI.closeModal('modalConfirmDelete');
    UI.renderKaryawanTable();
    UI.renderDashboard();
    UI.updateBadge();
    Utils.toast(`🗑 Karyawan "${nama}" berhasil dihapus`);
  },

  // ✅ BARU: Hapus semua karyawan
  openModalHapusSemua() {
    if (!AppState.karyawan.length) return Utils.toast('ℹ️ Tidak ada data karyawan untuk dihapus.');
    document.getElementById('deleteAllCount').textContent = AppState.karyawan.length + ' karyawan';
    document.getElementById('inputKonfirmasiHapusSemua').value = '';
    document.getElementById('btnConfirmDeleteAll').disabled = true;
    document.getElementById('btnConfirmDeleteAll').style.opacity = '0.5';
    document.getElementById('btnConfirmDeleteAll').style.cursor = 'not-allowed';
    document.getElementById('modalConfirmDeleteAll').classList.add('open');
  },

  confirmHapusSemua() {
    const input = document.getElementById('inputKonfirmasiHapusSemua').value;
    if (input !== 'HAPUS SEMUA') return;

    const jumlah = AppState.karyawan.length;
    AppState.log.push(Models.LogChange('SYSTEM', 'SYSTEM', 'hapus semua', `${jumlah} karyawan`, '(semua dihapus)'));
    AppState.karyawan = [];
    AppState.pagination.page = 1;
    DB.save();

    UI.closeModal('modalConfirmDeleteAll');
    UI.renderKaryawanTable();
    UI.renderDashboard();
    UI.updateBadge();
    Utils.toast(`🗑 Semua data karyawan (${jumlah}) berhasil dihapus`);
  },

  // ✅ BARU: Toggle buka/tutup panel accordion slot jabatan per SBU
  toggleSlotPanel(sbu) {
    AppState.slotPanelOpen[sbu] = !AppState.slotPanelOpen[sbu];
    UI.renderSlotJabatan();
  },

  // ✅ BARU: Toggle dropdown rincian nama karyawan untuk satu kombinasi SBU + Jabatan
  toggleSlotJabatanPanel(jabKey) {
    AppState.slotJabatanPanelOpen[jabKey] = !AppState.slotJabatanPanelOpen[jabKey];
    UI.renderSlotJabatan();
  },

  // ✅ BARU: Minta autentikasi superadmin sebelum mengedit slot suatu SBU
  requestSlotEdit(sbu) {
    if (AppState.superadminAuthed) {
      // Sudah terautentikasi di sesi ini — langsung buka form edit
      this.openEditSlotModal(sbu);
      return;
    }
    // Simpan aksi yang tertunda, lalu tampilkan modal password
    AppState.pendingSuperadminAction = () => Handlers.openEditSlotModal(sbu);
    document.getElementById('inputSuperadminPassword').value = '';
    document.getElementById('superadminAuthError').style.display = 'none';
    document.getElementById('modalSuperadminAuth').classList.add('open');
    setTimeout(() => document.getElementById('inputSuperadminPassword')?.focus(), 100);
  },

  // ✅ BARU: Submit password superadmin
  submitSuperadminAuth() {
    const input = document.getElementById('inputSuperadminPassword').value;
    const errEl = document.getElementById('superadminAuthError');

    if (input !== CONFIG.SUPERADMIN_PASSWORD) {
      errEl.textContent = '❌ Password salah. Coba lagi.';
      errEl.style.display = 'block';
      document.getElementById('inputSuperadminPassword').value = '';
      document.getElementById('inputSuperadminPassword').focus();
      return;
    }

    AppState.superadminAuthed = true;
    UI.closeModal('modalSuperadminAuth');
    Utils.toast('🔓 Akses superadmin diberikan untuk sesi ini');

    const action = AppState.pendingSuperadminAction;
    AppState.pendingSuperadminAction = null;
    if (typeof action === 'function') action();
  },

  // ✅ BARU: Buka form edit slot fix untuk satu SBU (sudah terautentikasi)
  openEditSlotModal(sbu) {
    const detail = AppState.slotConfig[sbu];
    if (!detail) return;

    AppState.editSlotTarget = sbu;
    document.getElementById('editSlotSBUName').textContent = sbu;
    this.renderEditSlotRows();

    // ✅ DIPERBAIKI: Isi dropdown "tambah jabatan baru" dari AppState.jabatan (daftar dinamis,
    // termasuk jabatan baru yang ditambahkan lewat halaman "Daftar Jabatan"), bukan CONFIG.DEFAULT_JABATAN yang statis
    const elAddSelect = document.getElementById('editSlotAddJabatan');
    const existingJabatan = Object.keys(detail.jabatan);
    const available = AppState.jabatan.map(j => j.nama).filter(j => !existingJabatan.includes(j));
    elAddSelect.innerHTML = '<option value="">— Pilih Jabatan untuk Ditambahkan —</option>' +
      available.map(j => `<option value="${j}">${j}</option>`).join('');

    document.getElementById('modalEditSlot').classList.add('open');
  },

  // ✅ BARU: Render baris-baris input slot fix di dalam modal edit
  renderEditSlotRows() {
    const sbu = AppState.editSlotTarget;
    const detail = AppState.slotConfig[sbu];
    if (!detail) return;

    const container = document.getElementById('editSlotRows');
    const entries = Object.entries(detail.jabatan);
    const total = entries.reduce((sum, [, v]) => sum + (Number(v) || 0), 0);

    container.innerHTML = entries.map(([jab, val]) => `
      <div class="edit-slot-row">
        <span class="edit-slot-row-label">${jab}</span>
        <input type="number" min="0" class="form-control edit-slot-row-input" value="${val}"
          data-jabatan="${jab.replace(/"/g, '&quot;')}"
          oninput="Handlers.updateEditSlotTotal()">
        <button class="btn btn-danger btn-sm" onclick="Handlers.removeEditSlotRow('${jab.replace(/'/g, "\\'")}')">✕</button>
      </div>`).join('');

    document.getElementById('editSlotTotalPreview').textContent = total;
  },

  // ✅ BARU: Update preview total saat angka slot diubah (tanpa menyimpan dulu)
  updateEditSlotTotal() {
    const inputs = document.querySelectorAll('#editSlotRows .edit-slot-row-input');
    let total = 0;
    inputs.forEach(inp => { total += Number(inp.value) || 0; });
    document.getElementById('editSlotTotalPreview').textContent = total;
  },

  // ✅ BARU: Hapus satu baris jabatan dari slot SBU yang sedang diedit (belum tersimpan)
  removeEditSlotRow(jab) {
    const sbu = AppState.editSlotTarget;
    if (!confirm(`Hapus slot jabatan "${jab}" dari ${sbu}?`)) return;
    delete AppState.slotConfig[sbu].jabatan[jab];
    this.openEditSlotModal(sbu); // re-render (refresh dropdown tambah & baris)
  },

  // ✅ BARU: Tambah baris jabatan baru ke slot SBU yang sedang diedit (belum tersimpan)
  addEditSlotRow() {
    const sbu = AppState.editSlotTarget;
    const jab = document.getElementById('editSlotAddJabatan').value;
    if (!jab) return Utils.toast('❌ Pilih jabatan terlebih dahulu!');
    AppState.slotConfig[sbu].jabatan[jab] = 0;
    this.openEditSlotModal(sbu);
  },

  // ✅ BARU: Simpan perubahan slot fix — mencatat log setiap perubahan angka
  saveEditSlot() {
    const sbu = AppState.editSlotTarget;
    const detail = AppState.slotConfig[sbu];
    if (!detail) return;

    const inputs = document.querySelectorAll('#editSlotRows .edit-slot-row-input');
    let adaPerubahan = false;

    inputs.forEach(inp => {
      const jab = inp.getAttribute('data-jabatan');
      const newVal = Math.max(0, parseInt(inp.value) || 0);
      const oldVal = detail.jabatan[jab];
      if (oldVal !== newVal) {
        AppState.log.push(Models.LogChange('SLOT', sbu, 'slot jabatan', `${jab}: ${oldVal}`, `${jab}: ${newVal}`, `Diubah oleh superadmin`));
        detail.jabatan[jab] = newVal;
        adaPerubahan = true;
      }
    });

    DB.save();
    UI.closeModal('modalEditSlot');
    UI.renderSlotJabatan();
    UI.renderDashboard();
    UI.updateBadge();
    Utils.toast(adaPerubahan ? `✅ Slot fix "${sbu}" berhasil diperbarui` : 'ℹ️ Tidak ada perubahan');
  },

  // ✅ BARU: Validasi tombol "Hapus Semua" — tombol aktif hanya jika user mengetik persis "HAPUS SEMUA"
  validateHapusSemuaInput(inputId, btnId) {
    const ok = document.getElementById(inputId).value === 'HAPUS SEMUA';
    const btn = document.getElementById(btnId);
    btn.disabled = !ok;
    btn.style.opacity = ok ? '1' : '0.5';
    btn.style.cursor = ok ? 'pointer' : 'not-allowed';
  },

  // ✅ DIUBAH: Hapus semua data Lembur & SPPD — dibatasi hanya bulan yang sedang aktif dipilih
  openModalHapusSemuaLembur() {
    const bulan = AppState.selectedBulan;
    const jumlah = AppState.lembur.filter(l => l.Bulan === bulan).length;
    if (!jumlah) return Utils.toast(`ℹ️ Tidak ada data lembur/SPPD bulan ${bulan} untuk dihapus.`);
    document.getElementById('deleteAllLemburCount').textContent = `${jumlah} data (${bulan})`;
    document.getElementById('inputKonfirmasiHapusSemuaLembur').value = '';
    const btn = document.getElementById('btnConfirmDeleteAllLembur');
    btn.disabled = true; btn.style.opacity = '0.5'; btn.style.cursor = 'not-allowed';
    document.getElementById('modalConfirmDeleteAllLembur').classList.add('open');
  },

  confirmHapusSemuaLembur() {
    const input = document.getElementById('inputKonfirmasiHapusSemuaLembur').value;
    if (input !== 'HAPUS SEMUA') return;

    const bulan = AppState.selectedBulan;
    const jumlah = AppState.lembur.filter(l => l.Bulan === bulan).length;
    AppState.log.push(Models.LogChange('SYSTEM', 'SYSTEM', 'lembur hapus semua', `${jumlah} data (${bulan})`, '(semua dihapus)'));
    AppState.lembur = AppState.lembur.filter(l => l.Bulan !== bulan); // ✅ DIUBAH: hanya hapus bulan yang dipilih
    AppState.lemburPagination.page = 1;
    DB.save();

    UI.closeModal('modalConfirmDeleteAllLembur');
    UI.renderLemburTable();
    UI.renderDashboardNonPO();
    Utils.toast(`🗑 Semua data lembur/SPPD bulan ${bulan} (${jumlah}) berhasil dihapus`);
  },

  // ✅ BARU: Buka modal Tambah/Edit Manual Data Lembur & SPPD (id null = tambah baru)
  openLemburModal(id) {
    AppState.modals.lemburEditId = id;
    const isEdit = id !== null && id !== undefined;
    document.getElementById('modalLemburTitle').textContent = isEdit ? '✏️ Edit Data Lembur/SPPD' : '➕ Tambah Data Lembur/SPPD';
    document.getElementById('lemburNIPWarning').style.display = 'none';

    if (isEdit) {
      const item = AppState.lembur.find(l => l.id === id);
      if (!item) return;
      document.getElementById('lemburNIP').value = item.NIP;
      document.getElementById('lemburNominal').value = item.Nominal;
      document.getElementById('lemburBulan').value = item.Bulan;
      document.getElementById('lemburTagihan').value = item.Tagihan;
    } else {
      document.getElementById('lemburNIP').value = '';
      document.getElementById('lemburNominal').value = '';
      document.getElementById('lemburBulan').value = AppState.selectedBulan || CONFIG.BULAN_OPTIONS[0]; // ✅ DIUBAH: default ke bulan yg sedang dibuka
      document.getElementById('lemburTagihan').value = 'SPPD 1 2';
    }
    this.lookupLemburNIP();
    document.getElementById('modalEditLembur').classList.add('open');
  },

  // ✅ DIUBAH: Auto-lookup Nama/SBU/Jabatan dari Data Karyawan berdasarkan NIP yang diketik.
  // Kalau karyawan tidak ditemukan (resign/dihapus) TAPI data lembur ini sudah punya Nama/SBU/Jabatan
  // tersimpan sebelumnya, tampilkan data arsip itu — bukan dikosongkan — supaya jelas datanya tetap ada.
  lookupLemburNIP() {
    const nip = document.getElementById('lemburNIP').value.trim();
    const emp = Utils.findKaryawanByNIP(nip);
    const editId = AppState.modals.lemburEditId;
    const existing = (editId !== null && editId !== undefined) ? AppState.lembur.find(l => l.id === editId) : null;
    const fallback = (existing && existing.NIP === nip) ? existing : null;

    document.getElementById('lemburNamaPreview').value = emp ? emp.Nama : (fallback ? fallback.Nama : '');
    document.getElementById('lemburSBUPreview').value = emp ? emp.SBU : (fallback ? fallback.SBU : '');
    document.getElementById('lemburJabatanPreview').value = emp ? emp.Jabatan : (fallback ? fallback.Jabatan : '');

    const warning = document.getElementById('lemburNIPWarning');
    if (!nip || emp) {
      warning.style.display = 'none';
    } else if (fallback) {
      warning.style.display = 'block';
      warning.style.color = 'var(--warning)';
      warning.style.background = 'rgba(234,179,8,.08)';
      warning.style.borderColor = 'rgba(234,179,8,.25)';
      warning.textContent = '📌 Karyawan ini sudah tidak ada di Data Karyawan (resign/dihapus). Nama/SBU/Jabatan yang ditampilkan adalah data arsip — tetap tersimpan & tetap dihitung di Realisasi.';
    } else {
      warning.style.display = 'block';
      warning.style.color = 'var(--danger)';
      warning.style.background = 'rgba(239,68,68,.08)';
      warning.style.borderColor = 'rgba(239,68,68,.2)';
      warning.textContent = '⚠️ NIP tidak ditemukan di Data Karyawan. Nama/SBU/Jabatan akan dikosongkan.';
    }
  },

  // ✅ BARU: Simpan data Lembur/SPPD manual (tambah baru atau edit), dicatat ke log "lembur"
  saveLemburManual() {
    const nip = document.getElementById('lemburNIP').value.trim();
    const nominal = Utils.parseNominal(document.getElementById('lemburNominal').value);
    const bulan = document.getElementById('lemburBulan').value.trim();
    const tagihan = document.getElementById('lemburTagihan').value;

    if (!nip) return Utils.toast('❌ NIP wajib diisi!');
    if (!nominal || nominal <= 0) return Utils.toast('❌ Nominal harus lebih dari 0!');
    if (!bulan) return Utils.toast('❌ Bulan wajib diisi!');

    const emp = Utils.findKaryawanByNIP(nip);
    const editId = AppState.modals.lemburEditId;
    const existing = (editId !== null && editId !== undefined) ? AppState.lembur.find(l => l.id === editId) : null;
    // ✅ DIUBAH: kalau karyawan sudah resign/dihapus dari Data Karyawan (emp tidak ditemukan) saat mengedit
    // data lama, JANGAN kosongkan Nama/SBU/Jabatan yang sudah tersimpan — pertahankan datanya supaya
    // tidak hilang dari perhitungan Realisasi SPPD/Lembur per SBU.
    const enriched = { NIP: nip, Nominal: nominal, Bulan: bulan, Tagihan: tagihan,
      Nama:    emp ? emp.Nama    : (existing ? existing.Nama    : ''),
      SBU:     emp ? emp.SBU     : (existing ? existing.SBU     : ''),
      Jabatan: emp ? emp.Jabatan : (existing ? existing.Jabatan : '') };

    if (existing) {
      const idx = AppState.lembur.findIndex(l => l.id === editId);
      AppState.lembur[idx] = Models.Lembur({ ...enriched, id: editId });
      AppState.log.push(Models.LogChange(nip, enriched.Nama || nip, 'lembur edit',
        '-', `${tagihan} · ${bulan} · ${Utils.formatRupiah(nominal)}`, 'Data diedit manual'));
      Utils.toast('✅ Data berhasil diperbarui');
    } else {
      AppState.lembur.push(Models.Lembur(enriched));
      AppState.log.push(Models.LogChange(nip, enriched.Nama || nip, 'lembur tambah',
        '-', `${tagihan} · ${bulan} · ${Utils.formatRupiah(nominal)}`, 'Data ditambahkan manual'));
      Utils.toast('✅ Data berhasil ditambahkan');
    }

    DB.save();
    closeModal('modalEditLembur');
    this.resetLemburPageAndRender();
    UI.renderDashboardNonPO();
  },

  // ✅ BARU: Hapus satu baris Data Lembur / SPPD Karyawan (dicatat ke log terpisah "lembur hapus")
  deleteLembur(id) {
    const item = AppState.lembur.find(l => l.id === id);
    if (!item) return;
    if (!confirm(`Hapus data ${item.Tagihan || '—'} untuk ${item.Nama || item.NIP} (${item.Bulan || '—'})?`)) return;
    LemburService.deleteById(id);
    AppState.log.push(Models.LogChange(
      item.NIP, item.Nama || item.NIP, 'lembur hapus',
      `${item.Tagihan || '-'} · ${item.Bulan || '-'} · ${Utils.formatRupiah(item.Nominal)}`, '-',
      'Baris data lembur/SPPD dihapus manual'
    ));
    DB.save();
    this.resetLemburPageAndRender();
    UI.renderDashboardNonPO();
    UI.renderLemburLog();
    Utils.toast('🗑 Data dihapus');
  },

  // ✅ BARU: Update konfigurasi manual per SBU di Dashboard Non PO (PAGU Non PO / BNLP, keduanya tahunan)
  // Dicatat ke log terpisah "lembur config"
  updateLemburConfig(sbu, field, value) {
    if (!AppState.lemburSbuConfig[sbu]) AppState.lemburSbuConfig[sbu] = { paguNonPO: 0, bnlp: 0 };
    const oldVal = AppState.lemburSbuConfig[sbu][field] || 0;
    const newVal = Math.max(0, Number(value) || 0);
    if (oldVal !== newVal) {
      const label = field === 'paguNonPO' ? 'PAGU Non PO' : 'BNLP';
      AppState.log.push(Models.LogChange(
        'SYSTEM', sbu, 'lembur config',
        `${label}: ${Utils.formatRupiah(oldVal)}`, `${label}: ${Utils.formatRupiah(newVal)}`,
        `Diubah pada Dashboard Non PO`
      ));
    }
    AppState.lemburSbuConfig[sbu][field] = newVal;
    DB.save();
    UI.renderDashboardNonPO();
    UI.renderLemburLog();
  },

  // ✅ BARU: Update input manual "Tiket Dibelikan HPI" di Card ringkasan Dashboard Non PO
  updateTiketHPI(value) {
    const oldVal = Number(AppState.tiketHPI) || 0;
    const newVal = Math.max(0, Number(value) || 0);
    if (oldVal !== newVal) {
      AppState.log.push(Models.LogChange(
        'SYSTEM', 'SYSTEM', 'lembur tiket',
        Utils.formatRupiah(oldVal), Utils.formatRupiah(newVal),
        'Tiket Dibelikan HPI diubah pada Dashboard Non PO'
      ));
    }
    AppState.tiketHPI = newVal;
    DB.save();
    UI.renderDashboardNonPO();
    UI.renderLemburLog();
  },

  // ✅ BARU: Export Excel — Tabel Data Lembur dan SPPD Karyawan (poin baru)
  // ✅ DIUBAH: Export Excel — Tabel Data Lembur & SPPD, dibatasi bulan yang sedang dipilih
  exportLemburExcel() {
    const bulan = AppState.selectedBulan;
    const data = AppState.lembur.filter(l => l.Bulan === bulan);
    if (!data.length) return Utils.toast('❌ Tidak ada data untuk diexport pada bulan ini!');
    const rows = data.map(l => ({
      'NIP': l.NIP, 'Nama': l.Nama, 'Nominal': l.Nominal, 'SBU': l.SBU,
      'Jabatan': l.Jabatan, 'Bulan': l.Bulan, 'Tagihan': l.Tagihan
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), 'Data Lembur SPPD');

    const lemburLog = AppState.log.filter(c => c.type.startsWith('lembur'));
    if (lemburLog.length) {
      const logRows = lemburLog.map(c => ({
        'Tanggal': c.ts, 'NIP/SBU': c.nik, 'Nama': c.nama, 'Tipe': c.type.toUpperCase(),
        'Data Lama': c.oldVal, 'Data Baru': c.newVal, 'Catatan': c.catatan
      }));
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(logRows), 'Log Perubahan Lembur');
    }
    XLSX.writeFile(wb, `data-lembur-sppd-${bulan.replace(/\s+/g, '-')}-${Utils.getTodayDate()}.xlsx`);
    Utils.toast('✅ Excel berhasil diexport!');
  },

  // ✅ DIUBAH: Export Excel — Dashboard Non PO, dibatasi bulan yang sedang dipilih
  exportDashboardNonPOExcel() {
    const bulan = AppState.selectedBulan;
    const { rows, totalRealisasi, tiketHPI, manFee, grandTotal } = UI.getNonPOData();
    const dataRows = rows.map(r => ({
      'SBU': r.sbu,
      'PAGU Non PO (Tahunan)': r.cfg.paguNonPO || 0,
      'PAGU per Unit sebelum Man Fee': r.paguPerUnit,
      'BNLP (Tahunan)': r.cfg.bnlp || 0,
      'BNLP per Bulan': r.bnlpPerBulan,
      'Max Topup per Bulan': r.maxTopupPerBulan,
      'Jumlah Karyawan SPPD 1 2': r.jumlahKaryawanSPPD,
      'Jumlah Karyawan Lembur': r.jumlahKaryawanLembur,
      'Total Pengajuan per SBU': r.jumlahKaryawan,
      'Realisasi SPPD 1 2': r.realisasiSPPD,
      'Realisasi Lembur': r.realisasiLembur,
      'Realisasi SPPD/Lembur (Total)': r.realisasi,
      'Realisasi/Max Topup (%)': Number(r.realisasiMaxTopupPct.toFixed(2)),
      'PAGU per Bulan': r.paguPerBulanStatic,
      'Persentase (%)': Number(r.persentase.toFixed(2))
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(dataRows), 'Dashboard Non PO');

    const summaryRows = [
      { 'Keterangan': 'Total Realisasi SPPD/Lembur', 'Nilai': totalRealisasi },
      { 'Keterangan': 'Tiket Dibelikan HPI', 'Nilai': tiketHPI },
      { 'Keterangan': 'Man Fee (7%)', 'Nilai': manFee },
      { 'Keterangan': 'Grand Total', 'Nilai': grandTotal }
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(summaryRows), 'Ringkasan');
    XLSX.writeFile(wb, `dashboard-non-po-${bulan.replace(/\s+/g, '-')}-${Utils.getTodayDate()}.xlsx`);
    Utils.toast('✅ Excel berhasil diexport!');
  },

  // ✅ BARU: Buka modal Tambah/Edit Monitoring Laptop (id null = tambah baru)
  openLaptopModal(id) {
    AppState.modals.laptopEditId = id;
    AppState.modals.pendingBuktiBA = null;
    AppState.modals.pendingBuktiBAFileName = null;
    const isEdit = id !== null && id !== undefined;
    document.getElementById('modalLaptopTitle').textContent = isEdit ? '✏️ Edit Data Laptop' : '➕ Tambah Data Laptop';
    document.getElementById('laptopFileInput').value = '';
    document.getElementById('laptopBuktiPreviewWrap').style.display = 'none';
    Utils.fillSelect('laptopSBU', CONFIG.DEFAULT_SBU); // ✅ BARU: isi opsi dropdown Regional/SBU (fillSelect menambahkan opsi "Semua" — dihapus di bawah)
    document.querySelector('#laptopSBU option[value=""]').textContent = '— Pilih Regional/SBU —';

    if (isEdit) {
      const item = AppState.laptop.find(l => l.id === id);
      if (!item) return;
      document.getElementById('laptopNIP').value = item.NIP;
      document.getElementById('laptopNamaPengguna').value = item.NamaPengguna;
      document.getElementById('laptopSBU').value = item.SBU;
      document.getElementById('laptopNamaPerangkat').value = item.NamaPerangkat;
      document.getElementById('laptopPA').value = item.PA;
      document.getElementById('laptopSerialNumber').value = item.SerialNumber;
      document.getElementById('laptopStatus').value = item.Status || '';
      if (item.BuktiBA) {
        document.getElementById('laptopBuktiPreviewWrap').style.display = 'block';
        document.getElementById('laptopBuktiPreviewImg').src = item.BuktiBA;
      }
    } else {
      document.getElementById('laptopNIP').value = '';
      document.getElementById('laptopNamaPengguna').value = '';
      document.getElementById('laptopSBU').value = '';
      document.getElementById('laptopNamaPerangkat').value = '';
      document.getElementById('laptopPA').value = '';
      document.getElementById('laptopSerialNumber').value = '';
      document.getElementById('laptopStatus').value = '';
    }
    this.lookupLaptopNIP();
    document.getElementById('modalEditLaptop').classList.add('open');
  },

  // ✅ DIUBAH: NIP sekarang OPSIONAL — dipakai untuk auto-isi Nama Pengguna & Regional kalau ditemukan
  // di Data Karyawan, tapi field Nama Pengguna & Regional tetap bisa diisi/diubah manual kapan saja.
  lookupLaptopNIP() {
    const nip = document.getElementById('laptopNIP').value.trim();
    const emp = Utils.findKaryawanByNIP(nip);

    // Auto-isi HANYA kalau NIP ditemukan di Data Karyawan — kalau tidak, biarkan isian manual apa adanya.
    if (emp) {
      document.getElementById('laptopNamaPengguna').value = emp.Nama;
      document.getElementById('laptopSBU').value = emp.SBU;
    }

    const namaPengguna = document.getElementById('laptopNamaPengguna').value.trim();
    const currentStatus = document.getElementById('laptopStatus').value;
    const hasBukti = !!(AppState.modals.pendingBuktiBA || document.getElementById('laptopBuktiPreviewWrap').style.display === 'block');
    const suggestion = Utils.suggestStatusLaptop(nip, hasBukti);
    const note = document.getElementById('laptopStatusSuggestion');
    if (namaPengguna && currentStatus && currentStatus !== suggestion) {
      note.style.display = 'block';
      note.style.color = 'var(--warning)';
      note.textContent = `⚠️ Saran berdasarkan data karyawan: "${suggestion}" (status yang dipilih berbeda).`;
    } else if (namaPengguna) {
      note.style.display = 'block';
      note.style.color = 'var(--text2)';
      note.textContent = `💡 Saran status: "${suggestion}".`;
    } else {
      note.style.display = 'none';
    }

    const warning = document.getElementById('laptopNIPWarning');
    warning.style.display = (nip && !emp) ? 'block' : 'none';
  },

  // ✅ BARU: Baca & kompres file gambar Bukti Berita Acara Pengembalian sebelum disimpan
  async handleLaptopFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { Utils.toast('❌ File harus berupa gambar!'); return; }
    try {
      const dataUrl = await Utils.compressImageFile(file);
      AppState.modals.pendingBuktiBA = dataUrl;
      AppState.modals.pendingBuktiBAFileName = file.name;
      document.getElementById('laptopBuktiPreviewWrap').style.display = 'block';
      document.getElementById('laptopBuktiPreviewImg').src = dataUrl;
      this.lookupLaptopNIP(); // refresh saran status (bukti baru bisa mengubah saran)
      Utils.toast('✅ Gambar berhasil dimuat — klik Simpan untuk menyimpan data.');
    } catch (err) {
      Utils.toast('❌ Gagal memproses gambar: ' + err.message);
    }
  },

  // ✅ BARU: Simpan data Laptop manual (tambah baru atau edit), dicatat ke log "laptop"
  // ✅ DIUBAH: NIP tidak lagi wajib — Nama Pengguna & Regional diambil langsung dari isian form
  // (yang sudah otomatis terisi dari NIP kalau ketemu, atau diisi manual oleh user).
  saveLaptopManual() {
    const nip = document.getElementById('laptopNIP').value.trim();
    const namaPengguna = document.getElementById('laptopNamaPengguna').value.trim();
    const sbu = document.getElementById('laptopSBU').value;
    const namaPerangkat = document.getElementById('laptopNamaPerangkat').value.trim();
    const pa = document.getElementById('laptopPA').value.trim();
    const serial = document.getElementById('laptopSerialNumber').value.trim();
    const status = document.getElementById('laptopStatus').value;

    if (!namaPengguna) return Utils.toast('❌ Nama Pengguna wajib diisi!');
    if (!sbu) return Utils.toast('❌ Regional/SBU wajib dipilih!');
    if (!namaPerangkat) return Utils.toast('❌ Nama Perangkat wajib diisi!');
    if (!serial) return Utils.toast('❌ Serial Number wajib diisi!');

    const editId = AppState.modals.laptopEditId;
    const existing = (editId !== null && editId !== undefined) ? AppState.laptop.find(l => l.id === editId) : null;
    const enriched = {
      NIP: nip, NamaPengguna: namaPengguna, SBU: sbu,
      NamaPerangkat: namaPerangkat, PA: pa, SerialNumber: serial, Status: status,
      BuktiBA:         AppState.modals.pendingBuktiBA || (existing ? existing.BuktiBA : null),
      BuktiBAFileName: AppState.modals.pendingBuktiBAFileName || (existing ? existing.BuktiBAFileName : null)
    };

    if (existing) {
      const idx = AppState.laptop.findIndex(l => l.id === editId);
      AppState.laptop[idx] = Models.Laptop({ ...enriched, id: editId });
      AppState.log.push(Models.LogChange(nip || '-', namaPengguna, 'laptop edit',
        '-', `${namaPerangkat} · ${serial} · ${status || '(belum diisi)'}`, 'Data diedit manual'));
      Utils.toast('✅ Data laptop berhasil diperbarui');
    } else {
      AppState.laptop.push(Models.Laptop(enriched));
      AppState.log.push(Models.LogChange(nip || '-', namaPengguna, 'laptop tambah',
        '-', `${namaPerangkat} · ${serial} · ${status || '(belum diisi)'}`, 'Data ditambahkan manual'));
      Utils.toast('✅ Data laptop berhasil ditambahkan');
    }

    DB.save();
    closeModal('modalEditLaptop');
    this.resetLaptopPageAndRender();
    UI.renderDashboardLaptop();
  },

  // ✅ BARU: Hapus satu baris data Laptop
  deleteLaptop(id) {
    const item = AppState.laptop.find(l => l.id === id);
    if (!item) return;
    if (!confirm(`Hapus data laptop "${item.NamaPerangkat}" (SN: ${item.SerialNumber}) milik ${item.NamaPengguna || item.NIP}?`)) return;
    LaptopService.deleteById(id);
    AppState.log.push(Models.LogChange(item.NIP, item.NamaPengguna || item.NIP, 'laptop hapus',
      `${item.NamaPerangkat} · ${item.SerialNumber}`, '-', 'Data laptop dihapus manual'));
    DB.save();
    this.resetLaptopPageAndRender();
    UI.renderDashboardLaptop();
    Utils.toast('🗑 Data laptop dihapus');
  },

  // ✅ BARU: Hapus semua data Laptop — validasi sama seperti fitur Hapus Semua lain (wajib ketik "HAPUS SEMUA")
  openModalHapusSemuaLaptop() {
    if (!AppState.laptop.length) return Utils.toast('ℹ️ Tidak ada data laptop untuk dihapus.');
    document.getElementById('deleteAllLaptopCount').textContent = AppState.laptop.length + ' data';
    document.getElementById('inputKonfirmasiHapusSemuaLaptop').value = '';
    const btn = document.getElementById('btnConfirmDeleteAllLaptop');
    btn.disabled = true; btn.style.opacity = '0.5'; btn.style.cursor = 'not-allowed';
    document.getElementById('modalConfirmDeleteAllLaptop').classList.add('open');
  },

  confirmHapusSemuaLaptop() {
    const input = document.getElementById('inputKonfirmasiHapusSemuaLaptop').value;
    if (input !== 'HAPUS SEMUA') return;
    const jumlah = AppState.laptop.length;
    AppState.log.push(Models.LogChange('SYSTEM', 'SYSTEM', 'laptop hapus semua', `${jumlah} data`, '(semua dihapus)'));
    AppState.laptop = [];
    AppState.laptopPagination.page = 1;
    DB.save();
    UI.closeModal('modalConfirmDeleteAllLaptop');
    UI.renderLaptopTable();
    UI.renderDashboardLaptop();
    Utils.toast(`🗑 Semua data laptop (${jumlah}) berhasil dihapus`);
  },

  // ✅ BARU: Lihat gambar Bukti Berita Acara Pengembalian ukuran penuh
  viewBuktiBA(id) {
    const item = AppState.laptop.find(l => l.id === id);
    if (!item || !item.BuktiBA) return;
    document.getElementById('viewBuktiImg').src = item.BuktiBA;
    document.getElementById('viewBuktiTitle').textContent = `${item.NamaPerangkat} — ${item.SerialNumber}`;
    document.getElementById('modalViewBukti').classList.add('open');
  },

  // ✅ BARU: Modal detail informasi peminjaman laptop untuk 1 orang (klik Nama Pengguna di tabel)
  openLaptopDetailModal(nip) {
    const items = AppState.laptop.filter(l => l.NIP === nip);
    if (!items.length) return;
    const emp = Utils.findKaryawanByNIP(nip);
    const nama = emp ? emp.Nama : (items[0].NamaPengguna || nip);

    document.getElementById('laptopDetailTitle').textContent = `💻 Riwayat Peminjaman Laptop — ${nama}`;
    document.getElementById('laptopDetailSubtitle').textContent =
      `NIP: ${nip} · SBU: ${emp ? emp.SBU : (items[0].SBU || '—')}${emp && emp.Status === 'Resign' ? ' · ⚠️ Status Karyawan: RESIGN' : ''}`;

    const statusPill = { 'Aktif': 'pill-green', 'Belum Dikembalikan': 'pill-red', 'Sudah Dikembalikan': 'pill-blue' };
    document.getElementById('laptopDetailBody').innerHTML = items.map(l => `
      <div class="card" style="background:var(--surface2);margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:start;gap:12px;">
          <div>
            <div style="font-weight:600;">${l.NamaPerangkat}</div>
            <div style="font-size:12px;color:var(--text2);margin-top:2px;">SN: ${l.SerialNumber} · PA: ${l.PA || '—'}</div>
            <div style="margin-top:6px;"><span class="pill ${statusPill[l.Status] || 'pill-gray'}">${l.Status || 'Belum diisi'}</span></div>
          </div>
          ${l.BuktiBA
            ? `<img src="${l.BuktiBA}" style="width:56px;height:56px;object-fit:cover;border-radius:8px;cursor:pointer;flex-shrink:0;" onclick="Handlers.viewBuktiBA(${l.id})" title="Lihat Bukti Berita Acara">`
            : `<span style="font-size:11px;color:var(--text2);flex-shrink:0;">Tanpa bukti</span>`}
        </div>
      </div>`).join('');

    document.getElementById('modalLaptopDetail').classList.add('open');
  },

  // ✅ BARU: Export Excel — Tabel Monitoring Laptop (gambar bukti tidak diexport, hanya status ada/tidaknya)
  exportLaptopExcel() {
    if (!AppState.laptop.length) return Utils.toast('❌ Tidak ada data untuk diexport!');
    const rows = AppState.laptop.map((l, i) => ({
      'No': i + 1, 'Nama Perangkat': l.NamaPerangkat, 'PA': l.PA, 'Nama Pengguna': l.NamaPengguna,
      'Serial Number': l.SerialNumber, 'Regional (SBU)': l.SBU, 'Status Laptop': l.Status || '',
      'Bukti Berita Acara': l.BuktiBA ? 'Ada' : 'Belum Ada'
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), 'Monitoring Laptop');

    const laptopLog = AppState.log.filter(c => c.type.startsWith('laptop'));
    if (laptopLog.length) {
      const logRows = laptopLog.map(c => ({
        'Tanggal': c.ts, 'NIP': c.nik, 'Nama': c.nama, 'Tipe': c.type.toUpperCase(),
        'Data Lama': c.oldVal, 'Data Baru': c.newVal, 'Catatan': c.catatan
      }));
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(logRows), 'Log Perubahan Laptop');
    }
    XLSX.writeFile(wb, `monitoring-laptop-${Utils.getTodayDate()}.xlsx`);
    Utils.toast('✅ Excel berhasil diexport!');
  },

  // ✅ BARU: Export Excel — Dashboard Laptop (ringkasan status per SBU)
  exportDashboardLaptopExcel() {
    if (!AppState.laptop.length) return Utils.toast('❌ Tidak ada data untuk diexport!');
    const sbuList = CONFIG.DEFAULT_SBU;
    const rows = sbuList.map(sbu => {
      const entries = AppState.laptop.filter(l => l.SBU === sbu);
      return {
        'SBU': sbu, 'Total Laptop': entries.length,
        'Aktif': entries.filter(l => l.Status === 'Aktif').length,
        'Belum Dikembalikan': entries.filter(l => l.Status === 'Belum Dikembalikan').length,
        'Sudah Dikembalikan': entries.filter(l => l.Status === 'Sudah Dikembalikan').length,
        'Belum Diisi Status': entries.filter(l => !l.Status).length
      };
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), 'Dashboard Laptop');
    XLSX.writeFile(wb, `dashboard-laptop-${Utils.getTodayDate()}.xlsx`);
    Utils.toast('✅ Excel berhasil diexport!');
  },

  // ✅ BARU: Buka modal daftar karyawan berdasarkan status (klik card Baru/Aktif/Resign di Dashboard Karyawan)
  openStatusListModal(status) {
    AppState.modals.statusListTarget = status;
    const titleMap = {
      'Baru Masuk': '🟢 Daftar Karyawan Baru',
      'Aktif':      '🔵 Daftar Karyawan Aktif',
      'Resign':     '🔴 Daftar Karyawan Resign'
    };
    document.getElementById('statusListTitle').textContent = titleMap[status] || 'Daftar Karyawan';
    document.getElementById('searchStatusList').value = '';
    this.renderStatusListModal();
    document.getElementById('modalStatusList').classList.add('open');
  },

  // ✅ BARU: Render isi tabel modal daftar karyawan berdasarkan status + pencarian
  renderStatusListModal() {
    const status = AppState.modals.statusListTarget;
    const q = (document.getElementById('searchStatusList')?.value || '').toLowerCase();
    const list = AppState.karyawan.filter(k =>
      k.Status === status &&
      (!q || k.NIP.toLowerCase().includes(q) || k.Nama.toLowerCase().includes(q) || k.SBU.toLowerCase().includes(q))
    );

    const tbody = document.getElementById('statusListBody');
    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="5"><div class="empty"><h3>Tidak ada data</h3></div></td></tr>`;
      return;
    }
    tbody.innerHTML = list.map(k => `
      <tr style="cursor:pointer" onclick="closeModal('modalStatusList');Handlers.openDetailModal(${k.id})" title="Lihat detail karyawan">
        <td class="mono">${k.NIP}</td>
        <td style="font-weight:500;color:var(--accent2)">${k.Nama}</td>
        <td><span class="pill pill-blue">${k.Jabatan}</span></td>
        <td>${k.SBU}</td>
        <td style="font-size:12px;color:var(--text2)">${k.TglMasuk || '—'}</td>
      </tr>`).join('');
  },

  addJabatan() {
    const nama = document.getElementById('inputJabatanNama').value.trim().toUpperCase();
    if (!nama) return Utils.toast('❌ Nama jabatan wajib diisi!');
    if (AppState.jabatan.find(j => j.nama === nama)) return Utils.toast('❌ Jabatan sudah ada!');
    
    AppState.jabatan.push({ nama });
    DB.save();
    document.getElementById('inputJabatanNama').value = '';
    UI.renderJabatanList();
    Utils.toast(`✅ Jabatan ditambahkan`);
  },
  deleteJabatan(index) {
    if (!confirm(`Hapus jabatan "${AppState.jabatan[index].nama}"?`)) return;
    AppState.jabatan.splice(index, 1);
    DB.save();
    UI.renderJabatanList();
    Utils.toast('🗑 Jabatan dihapus');
  },

  // ✅ DIUBAH: exportToExcel kini menerima data opsional (default semua karyawan) untuk dipakai ulang oleh export terfilter
  exportToExcel(data = null, labelSuffix = '') {
    const sourceData = data || AppState.karyawan;
    if (!sourceData.length) return Utils.toast('❌ Tidak ada data untuk diexport!');

    const rows = sourceData.map(k => ({
      'NIP': k.NIP, 'Nama': k.Nama, 'NIK': k.NIK, 'Grade': k.Grade, 'Jabatan': k.Jabatan, 'SBU': k.SBU,
      'BKO Jabatan': k.BKOJabatan, 'BKO SBU': k.BKOSBU, 'NIP Baru': k.NIPBaru,
      'Email': k.Email, 'Email Korporat': k.EmailKorporat, 'Nama Akun ICRM': k.NamaAkunICRM,
      'Tanggal Masuk': k.TglMasuk, 'Tanggal Keluar': k.TglKeluar,
      'Ukuran Baju': k.UkuranBaju, 'Nomor Telpon': k.NoTelp,
      'Tanggal Update': k.TglUpdate, 'Status': k.Status, 'Catatan Status': k.StatusCatatan
    }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), 'Data Karyawan');

    // Sheet log hanya disertakan pada export lengkap (tanpa filter)
    if (!data && AppState.log.length) {
      const logRows = AppState.log.map(c => ({
        'Tanggal': c.ts, 'NIP': c.nik, 'Nama': c.nama, 'Tipe Ubah': c.type.toUpperCase(),
        'Data Lama': c.oldVal, 'Data Baru': c.newVal, 'Catatan': c.catatan
      }));
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(logRows), 'Log Perubahan');
    }

    const fileSuffix = labelSuffix ? `-${labelSuffix}` : '';
    XLSX.writeFile(wb, `data-karyawan${fileSuffix}-${Utils.getTodayDate()}.xlsx`);
    Utils.toast('✅ Excel berhasil diexport!');
  },

  // ✅ BARU: Export karyawan terfilter berdasarkan SBU dan/atau tipe status
  exportFiltered() {
    const sbu = document.getElementById('exportFilterSBU')?.value || '';
    const status = document.getElementById('exportFilterStatus')?.value || '';

    let filtered = AppState.karyawan;
    if (sbu) filtered = filtered.filter(k => k.SBU === sbu);
    if (status) filtered = filtered.filter(k => k.Status === status);

    if (!filtered.length) return Utils.toast('❌ Tidak ada data karyawan yang cocok dengan filter tersebut!');

    // Bangun akhiran nama file berdasarkan filter yang aktif
    const parts = [];
    if (sbu) parts.push(sbu.replace(/[^a-zA-Z0-9]+/g, '-'));
    if (status) parts.push(status.replace(/[^a-zA-Z0-9]+/g, '-'));
    const labelSuffix = parts.join('_') || 'semua';

    this.exportToExcel(filtered, labelSuffix);
  }
};

// ─── 9. GLOBAL BINDINGS (Bridges to HTML) ───────────────────────────────────
window.navigate         = (page) => Handlers.navigate(page);
window.handleFile       = (e)    => Handlers.handleFile(e);
window.batalUpload      = ()     => Handlers.cancelUpload();
window.confirmUpload    = ()     => Handlers.confirmUpload();
window.renderDashboard  = ()     => UI.renderDashboard();
window.resetPageAndRender = ()   => Handlers.resetPageAndRender();
window.changePageSize   = ()     => Handlers.changePageSize();
window.resetLogPageAndRender = () => Handlers.resetLogPageAndRender(); // ✅ BARU
window.changeLogPageSize     = () => Handlers.changeLogPageSize();     // ✅ BARU
window.resetLogDateFilter    = () => Handlers.resetLogDateFilter();    // ✅ BARU
window.renderPindah     = ()     => UI.renderPindahJabatan();
window.openModalEdit    = (id)   => Handlers.openEditModal(id);
window.simpanEditData   = ()     => Handlers.saveEditData();
window.closeModal       = (id)   => UI.closeModal(id);
window.openModalPindah  = (id)   => Handlers.openQuickMoveModal(id);
window.simpanPindah     = ()     => Handlers.saveQuickMove();
window.tambahJabatan    = ()     => Handlers.addJabatan();
window.exportExcel      = ()     => Handlers.exportToExcel();
window.confirmDeleteKaryawan = () => Handlers.confirmDeleteKaryawan();
window.openModalHapusSemua   = () => Handlers.openModalHapusSemua();   // ✅ BARU
window.confirmHapusSemua     = () => Handlers.confirmHapusSemua();     // ✅ BARU
window.HandlersFormatPhone   = (val) => Utils.normalizePhone(val);     // ✅ BARU: format real-time saat mengetik
window.requestSlotEdit       = (sbu) => Handlers.requestSlotEdit(sbu);         // ✅ BARU
window.submitSuperadminAuth  = ()    => Handlers.submitSuperadminAuth();      // ✅ BARU
window.addEditSlotRow        = ()    => Handlers.addEditSlotRow();            // ✅ BARU
window.saveEditSlot          = ()    => Handlers.saveEditSlot();              // ✅ BARU
window.exportFiltered        = ()    => Handlers.exportFiltered();            // ✅ BARU
window.setUploadType         = (t)   => Handlers.setUploadType(t);            // ✅ BARU
window.deleteLembur          = (id)  => Handlers.deleteLembur(id);            // ✅ BARU
window.updateLemburConfig    = (sbu, field, val) => Handlers.updateLemburConfig(sbu, field, val); // ✅ BARU
window.updateTiketHPI        = (val) => Handlers.updateTiketHPI(val);         // ✅ BARU
window.resetLemburPageAndRender = () => Handlers.resetLemburPageAndRender();  // ✅ BARU
window.changeLemburPageSize     = () => Handlers.changeLemburPageSize();      // ✅ BARU
window.exportLemburExcel        = () => Handlers.exportLemburExcel();         // ✅ BARU
window.exportDashboardNonPOExcel= () => Handlers.exportDashboardNonPOExcel(); // ✅ BARU
window.openModalLembur          = (id) => Handlers.openLemburModal(id);      // ✅ BARU
window.openModalLaptop          = (id) => Handlers.openLaptopModal(id);      // ✅ BARU
window.resetLaptopPageAndRender = () => Handlers.resetLaptopPageAndRender(); // ✅ BARU
window.changeLaptopPageSize     = () => Handlers.changeLaptopPageSize();     // ✅ BARU
window.exportLaptopExcel        = () => Handlers.exportLaptopExcel();        // ✅ BARU

// Initialize application
ThemeService.init();
UI.init();
