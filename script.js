/**
 * ============================================================================
 * HRIS APP - CLEAN ARCHITECTURE
 * ============================================================================
 */

// ─── 1. CONFIGURATION & CONSTANTS ───────────────────────────────────────────
const CONFIG = {
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

  // ✅ BARU: Total slot karyawan keseluruhan (fix/ditetapkan)
  TOTAL_SLOT_KARYAWAN: 264,

  // ✅ BARU: Rincian slot per SBU dan Jabatan (fix/ditetapkan)
  // Struktur: { [SBU]: { total: number, jabatan: { [NamaJabatan]: jumlahSlot } } }
  SLOT_PER_SBU: {
    'BALI & NUSA TENGGARA': {
      total: 21,
      jabatan: {
        'ACCOUNT EXECUTIVE GRADE 1': 4, 'ACCOUNT EXECUTIVE GRADE 2': 4,
        'ACCOUNT MANAGER JUNIOR': 1, 'ACCOUNT MANAGER SENIOR': 1,
        'COLLECTION SBU': 7, 'OFFICER MARKETING': 2, 'VALIDASI SBU': 2
      }
    },
    'JAKARTA & BANTEN': {
      total: 26,
      jabatan: {
        'ACCOUNT EXECUTIVE GRADE 1': 7, 'ACCOUNT EXECUTIVE GRADE 2': 4,
        'ACCOUNT MANAGER JUNIOR': 1, 'ACCOUNT MANAGER SENIOR': 1, 'ADMINISTRASI SALES': 1,
        'COLLECTION SBU': 8, 'OFFICER MARKETING': 2, 'VALIDASI SBU': 2
      }
    },
    'JAWA BAGIAN BARAT': {
      total: 26,
      jabatan: {
        'ACCOUNT EXECUTIVE GRADE 1': 9, 'ACCOUNT EXECUTIVE GRADE 2': 4,
        'ACCOUNT MANAGER JUNIOR': 1, 'ACCOUNT MANAGER SENIOR': 1, 'ADMINISTRASI SALES': 1,
        'COLLECTION SBU': 6, 'OFFICER MARKETING': 2, 'VALIDASI SBU': 2
      }
    },
    'JAWA BAGIAN TENGAH': {
      total: 26,
      jabatan: {
        'ACCOUNT EXECUTIVE GRADE 1': 10, 'ACCOUNT EXECUTIVE GRADE 2': 4,
        'ACCOUNT MANAGER JUNIOR': 1, 'ACCOUNT MANAGER SENIOR': 1,
        'COLLECTION SBU': 6, 'OFFICER MARKETING': 2, 'VALIDASI SBU': 2
      }
    },
    'JAWA BAGIAN TIMUR': {
      total: 24,
      jabatan: {
        'ACCOUNT EXECUTIVE GRADE 1': 7, 'ACCOUNT EXECUTIVE GRADE 2': 4,
        'ACCOUNT MANAGER JUNIOR': 1, 'ACCOUNT MANAGER SENIOR': 1,
        'COLLECTION SBU': 7, 'OFFICER MARKETING': 2, 'VALIDASI SBU': 2
      }
    },
    'KALIMANTAN': {
      total: 22,
      jabatan: {
        'ACCOUNT EXECUTIVE GRADE 1': 6, 'ACCOUNT EXECUTIVE GRADE 2': 4,
        'ACCOUNT MANAGER JUNIOR': 1, 'ACCOUNT MANAGER SENIOR': 1,
        'COLLECTION SBU': 6, 'OFFICER MARKETING': 2, 'VALIDASI SBU': 2
      }
    },
    'PUSAT': {
      total: 26,
      jabatan: {
        'ADMINISTRASI SALES': 13, 'COLLECTION PUSAT': 9,
        'DATA ANALYST & DESIGN ENGINEER': 2, 'OFFICER MARKETING': 2
      }
    },
    'SULAWESI & INDONESIA TIMUR': {
      total: 20,
      jabatan: {
        'ACCOUNT EXECUTIVE GRADE 1': 7, 'ACCOUNT EXECUTIVE GRADE 2': 4,
        'COLLECTION SBU': 5, 'OFFICER MARKETING': 2, 'VALIDASI SBU': 2
      }
    },
    'SUMATERA BAGIAN SELATAN': {
      total: 24,
      jabatan: {
        'ACCOUNT EXECUTIVE GRADE 1': 8, 'ACCOUNT EXECUTIVE GRADE 2': 4,
        'ACCOUNT MANAGER JUNIOR': 1, 'ACCOUNT MANAGER SENIOR': 1,
        'COLLECTION SBU': 6, 'OFFICER MARKETING': 2, 'VALIDASI SBU': 2
      }
    },
    'SUMATERA BAGIAN TENGAH': {
      total: 23,
      jabatan: {
        'ACCOUNT EXECUTIVE GRADE 1': 6, 'ACCOUNT EXECUTIVE GRADE 2': 4,
        'ACCOUNT MANAGER JUNIOR': 1, 'ACCOUNT MANAGER SENIOR': 1,
        'COLLECTION SBU': 7, 'OFFICER MARKETING': 2, 'VALIDASI SBU': 2
      }
    },
    'SUMATERA BAGIAN UTARA': {
      total: 25,
      jabatan: {
        'ACCOUNT EXECUTIVE GRADE 1': 15, 'ACCOUNT EXECUTIVE GRADE 2': 2,
        'ACCOUNT MANAGER JUNIOR': 1, 'ACCOUNT MANAGER SENIOR': 1,
        'COLLECTION SBU': 4, 'OFFICER MARKETING': 2
      }
    }
  }
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
  slotConfig: {}, // ✅ BARU: salinan CONFIG.SLOT_PER_SBU yang bisa diedit & disimpan

  pagination: { page: 1, size: 10 },
  logPagination: { page: 1, size: 10 }, // ✅ BARU: pagination untuk Review Log Perubahan
  modals: { editTargetId: null, statusTargetId: null },
  slotPanelOpen: {}, // ✅ BARU: state buka/tutup accordion slot per SBU, key = nama SBU

  // ✅ BARU: State autentikasi superadmin (khusus sesi ini, reset saat reload halaman)
  superadminAuthed: false,
  pendingSuperadminAction: null, // fungsi yang dijalankan setelah password benar
  editSlotTarget: null // nama SBU yang sedang diedit slotnya
};

// ─── 3. DATA MODELS (CONTROLLED STRUCTURE) ──────────────────────────────────
const Models = {
  Karyawan(data = {}) {
    return {
      id:            data.id || Date.now() + Math.random(),
      NIP:           String(data.NIP || '').trim(),
      Nama:          String(data.Nama || '').trim(),
      NIK:           String(data.NIK || '').trim(),                          // ✅ BARU
      Jabatan:       Utils.resolveJabatan(String(data.Jabatan || '').trim()),
      SBU:           Utils.resolveSBU(String(data.SBU || '').trim()),
      BKOJabatan:    Utils.resolveJabatan(String(data.BKOJabatan || '').trim()),
      BKOSBU:        Utils.resolveSBU(String(data.BKOSBU || '').trim()),
      SlotBOQ:       String(data.SlotBOQ || '').trim(),
      SlotReal:      String(data.SlotReal || '').trim(),
      NIPBaru:       String(data.NIPBaru || '').trim(),
      Email:         String(data.Email || '').trim(),                        // Email Pribadi (lama)
      EmailKorporat: String(data.EmailKorporat || '').trim(),                // ✅ BARU
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
      id: Date.now() + Math.random(),
      ts: Utils.getTodayDate(),
      nik, nama, type,
      oldVal: oldVal || '-',
      newVal: newVal || '-',
      catatan
    };
  }
};

// ─── 4. UTILITIES ───────────────────────────────────────────────────────────
const Utils = {
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
const DB = {
  load() {
    const cK = localStorage.getItem(CONFIG.STORAGE_KEYS.KARYAWAN);
    const cJ = localStorage.getItem(CONFIG.STORAGE_KEYS.JABATAN);
    const cC = localStorage.getItem(CONFIG.STORAGE_KEYS.LOG);
    const cS = localStorage.getItem(CONFIG.STORAGE_KEYS.SLOT_CONFIG); // ✅ BARU

    AppState.karyawan = cK ? JSON.parse(cK) : [];
    AppState.log      = cC ? JSON.parse(cC) : [];
    AppState.jabatan  = cJ ? JSON.parse(cJ) : CONFIG.DEFAULT_JABATAN.map(nama => ({ nama }));
    // ✅ BARU: Slot config — pakai data tersimpan jika ada, kalau tidak fallback ke default di CONFIG
    AppState.slotConfig = cS ? JSON.parse(cS) : Utils.deepClone(CONFIG.SLOT_PER_SBU);
  },
  save() {
    localStorage.setItem(CONFIG.STORAGE_KEYS.KARYAWAN, JSON.stringify(AppState.karyawan));
    localStorage.setItem(CONFIG.STORAGE_KEYS.JABATAN,  JSON.stringify(AppState.jabatan));
    localStorage.setItem(CONFIG.STORAGE_KEYS.LOG,      JSON.stringify(AppState.log));
    localStorage.setItem(CONFIG.STORAGE_KEYS.SLOT_CONFIG, JSON.stringify(AppState.slotConfig)); // ✅ BARU
  }
};

// ─── 6. BUSINESS LOGIC (SERVICES) ───────────────────────────────────────────
const EmployeeService = {
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
  bulkUpload(dataArray) {
    const classified = this.classifyUploadRows(dataArray);
    const toInsert = classified.filter(r => r.__uploadStatus === 'new');

    const newEmployees = toInsert.map(data => Models.Karyawan(data));
    AppState.karyawan = AppState.karyawan.concat(newEmployees);

    const stats = {
      total: classified.length,
      added: toInsert.length,
      duplicateExisting: classified.filter(r => r.__uploadStatus === 'duplicate_existing').length,
      duplicateInFile: classified.filter(r => r.__uploadStatus === 'duplicate_infile').length,
      invalid: classified.filter(r => r.__uploadStatus === 'invalid').length
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
  }
};

// ─── 7. UI RENDERER ─────────────────────────────────────────────────────────
const UI = {
  init() {
    DB.load();
    // ✅ BARU: Deteksi & ubah otomatis karyawan "Baru Masuk" yang sudah genap 1 bulan menjadi "Aktif"
    const autoUpdatedCount = EmployeeService.autoUpdateNewEmployeeStatus();
    this.renderAll();
    this.setupUploadZone();
    if (autoUpdatedCount > 0) {
      Utils.toast(`🔄 ${autoUpdatedCount} karyawan otomatis diubah dari "Baru Masuk" menjadi "Aktif" (sudah genap 1 bulan)`, 5000);
    }
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
    const { karyawan, log, jabatan } = AppState;
    document.getElementById('stat-total').textContent  = karyawan.length;
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
        const terisi = aktifKaryawan.filter(k => k.SBU === sbu && k.Jabatan === jab).length;
        const sisa = slotFix - terisi;
        const statusColor = sisa < 0 ? 'var(--danger)' : sisa === 0 ? 'var(--success)' : 'var(--warning)';
        return `<tr>
          <td style="padding-left:24px;color:var(--text2);font-size:12px;">${jab}</td>
          <td class="mono" style="text-align:center;">${slotFix}</td>
          <td class="mono" style="text-align:center;">${terisi}</td>
          <td class="mono" style="text-align:center;color:${statusColor};font-weight:600;">${sisa}</td>
        </tr>`;
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
      tbody.innerHTML = `<tr><td colspan="20"><div class="empty"><div class="empty-icon">👥</div><h3>Tidak ada data</h3></div></td></tr>`;
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
          <button class="btn btn-secondary btn-sm" onclick="Handlers.openEditModal(${k.id})">✏️ Edit</button>
          <button class="btn btn-danger btn-sm" style="margin-left:4px" onclick="Handlers.deleteKaryawan(${k.id})">🗑 Hapus</button>
        </td>
        <td class="mono">${k.NIP}</td><td style="font-weight:500">${k.Nama}</td>
        <td class="mono">${k.NIK || '—'}</td>
        <td><span class="pill pill-blue">${k.Jabatan}</span></td><td>${k.SBU}</td>
        <td>${k.BKOJabatan}</td><td>${k.BKOSBU}</td><td>${k.SlotBOQ}</td><td>${k.SlotReal}</td>
        <td class="mono">${k.NIPBaru}</td>
        <td>${k.Email || '—'}</td>
        <td>${k.EmailKorporat || '—'}</td>
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
        <td><span class="pill pill-blue">${k.Jabatan}</span></td><td>${k.SBU}</td>
        <td>${k.SlotReal}</td><td style="font-size:12px;color:var(--text2)">${k.TglUpdate}</td>
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

    const renders = { dashboard: 'renderDashboard', karyawan: 'renderKaryawanTable', pindah: 'renderPindahJabatan', jabatan: 'renderJabatanList' };
    if (renders[page]) UI[renders[page]]();
  },
  resetPageAndRender() { AppState.pagination.page = 1; UI.renderKaryawanTable(); },
  changePageSize() { AppState.pagination.size = parseInt(document.getElementById('pageSize').value); this.resetPageAndRender(); },
  goToPage(p) { AppState.pagination.page = p; UI.renderKaryawanTable(); },

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

      const COLS = ['NIP','Nama','NIK','Jabatan','SBU','BKO Jabatan','BKO SBU','Slot BOQ','Slot Real','NIP Baru',
        'Email','Email Korporat','Tanggal Masuk','Tanggal Keluar','Ukuran Baju','Nomor Telpon','Status','Catatan Status'];
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
  cancelUpload() {
    AppState.previewUpload = [];
    document.getElementById('previewCard').style.display = 'none';
    document.getElementById('fileInput').value = ''; 
    Utils.toast('ℹ️ Review upload dibatalkan');
  },
  confirmUpload() {
    if (!AppState.previewUpload.length) return Utils.toast('❌ Tidak ada data!');
    // ✅ BARU: Mapping nama kolom Excel ke nama field model
    const mapped = AppState.previewUpload.map(r => ({
      NIP: r['NIP'], Nama: r['Nama'], NIK: r['NIK'],
      Jabatan: r['Jabatan'], SBU: r['SBU'],
      BKOJabatan: r['BKO Jabatan'], BKOSBU: r['BKO SBU'],
      SlotBOQ: r['Slot BOQ'], SlotReal: r['Slot Real'], NIPBaru: r['NIP Baru'],
      Email: r['Email'], EmailKorporat: r['Email Korporat'],
      TglMasuk: r['Tanggal Masuk'], TglKeluar: r['Tanggal Keluar'],
      UkuranBaju: r['Ukuran Baju'], NoTelp: r['Nomor Telpon'],
      Status: r['Status'], StatusCatatan: r['Catatan Status'] // ✅ DIPERBAIKI: sebelumnya tidak dipetakan sama sekali
    }));
    // ✅ DIUBAH: bulkUpload kini mengembalikan statistik (NIP sebagai Primary Key)
    const stats = EmployeeService.bulkUpload(mapped);
    this.cancelUpload();

    const skippedTotal = stats.duplicateExisting + stats.duplicateInFile + stats.invalid;
    if (skippedTotal > 0) {
      Utils.toast(`✅ ${stats.added} data baru ditambahkan. ⚠ ${skippedTotal} baris dilewati (duplikat/tidak valid).`, 5000);
    } else {
      Utils.toast(`✅ ${stats.added} karyawan baru berhasil disimpan`);
    }
    this.resetPageAndRender();
    this.navigate('dashboard');
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
    document.getElementById('editJabatan').value      = emp.Jabatan;
    document.getElementById('editSBU').value          = emp.SBU;
    document.getElementById('editBKOJabatan').value   = emp.BKOJabatan; // ✅ set value dropdown
    document.getElementById('editBKOSBU').value       = emp.BKOSBU;     // ✅ set value dropdown
    document.getElementById('editSlotBOQ').value      = emp.SlotBOQ;
    document.getElementById('editSlotReal').value     = emp.SlotReal;
    document.getElementById('editNIPBaru').value      = emp.NIPBaru;
    document.getElementById('editEmail').value        = emp.Email;
    document.getElementById('editEmailKorporat').value= emp.EmailKorporat || '';               // ✅ BARU
    document.getElementById('editTglMasuk').value     = emp.TglMasuk || '';                    // ✅ BARU
    document.getElementById('editTglKeluar').value    = emp.TglKeluar || '';                   // ✅ BARU
    document.getElementById('editUkuranBaju').value   = emp.UkuranBaju || '';                  // ✅ BARU
    document.getElementById('editNoTelp').value       = emp.NoTelp || '+62';                   // ✅ BARU
    document.getElementById('editStatus').value       = emp.Status;
    document.getElementById('editCatatanStatus').value= emp.StatusCatatan;

    document.getElementById('modalEditData').classList.add('open');
  },

  // ✅ DIUBAH: saveEditData — nilai BKO diambil dari select, di-uppercase via Models.Karyawan
  saveEditData() {
    const NIP  = document.getElementById('editNIP').value.trim();
    const Nama = document.getElementById('editNama').value.trim();
    const TglMasuk = document.getElementById('editTglMasuk').value;
    if (!NIP || !Nama) return Utils.toast('❌ NIP dan Nama wajib diisi!');
    if (!TglMasuk) return Utils.toast('❌ Tanggal Masuk wajib diisi!'); // ✅ BARU: validasi mandatory

    const formData = {
      NIP, Nama,
      NIK:           document.getElementById('editNIK').value,               // ✅ BARU
      Jabatan:       document.getElementById('editJabatan').value,
      SBU:           document.getElementById('editSBU').value,
      BKOJabatan:    document.getElementById('editBKOJabatan').value.toUpperCase(), // ✅ uppercase
      BKOSBU:        document.getElementById('editBKOSBU').value.toUpperCase(),     // ✅ uppercase
      SlotBOQ:       document.getElementById('editSlotBOQ').value,
      SlotReal:      document.getElementById('editSlotReal').value,
      NIPBaru:       document.getElementById('editNIPBaru').value,
      Email:         document.getElementById('editEmail').value,
      EmailKorporat: document.getElementById('editEmailKorporat').value,     // ✅ BARU
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
      Utils.toast(`✅ Data diperbarui!`);
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
      'NIP': k.NIP, 'Nama': k.Nama, 'NIK': k.NIK, 'Jabatan': k.Jabatan, 'SBU': k.SBU,
      'BKO Jabatan': k.BKOJabatan, 'BKO SBU': k.BKOSBU, 'Slot BOQ': k.SlotBOQ, 
      'Slot Real': k.SlotReal, 'NIP Baru': k.NIPBaru,
      'Email': k.Email, 'Email Korporat': k.EmailKorporat,
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

// Initialize application
UI.init();
