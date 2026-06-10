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
    LOG:      'hris_changes_v9'
  },
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
  ]
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
  
  pagination: { page: 1, size: 10 },
  modals: { editTargetId: null, statusTargetId: null }
};

// ─── 3. DATA MODELS (CONTROLLED STRUCTURE) ──────────────────────────────────
const Models = {
  // Memastikan struktur data karyawan selalu seragam
  Karyawan(data = {}) {
    return {
      id:            data.id || Date.now() + Math.random(),
      NIP:           String(data.NIP || '').trim(),
      Nama:          String(data.Nama || '').trim(),
      Jabatan:       String(data.Jabatan || '').trim(),
      SBU:           String(data.SBU || '').trim().toUpperCase(),
      BKOJabatan:    String(data.BKOJabatan || '').trim(),
      BKOSBU:        String(data.BKOSBU || '').trim(),
      SlotBOQ:       String(data.SlotBOQ || '').trim(),
      SlotReal:      String(data.SlotReal || '').trim(),
      NIPBaru:       String(data.NIPBaru || '').trim(),
      Email:         String(data.Email || '').trim(),
      TglUpdate:     data.TglUpdate || Utils.getTodayDate(),
      Status:        data.Status || 'Aktif',
      StatusManual:  typeof data.StatusManual === 'boolean' ? data.StatusManual : false,
      StatusCatatan: data.StatusCatatan || ''
    };
  },

  // Memastikan log histori seragam
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
    el.innerHTML = '<option value="">Semua</option>'; // Default empty
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
    
    AppState.karyawan = cK ? JSON.parse(cK) : [];
    AppState.log      = cC ? JSON.parse(cC) : [];
    AppState.jabatan  = cJ ? JSON.parse(cJ) : CONFIG.DEFAULT_JABATAN.map(nama => ({ nama }));
  },
  save() {
    localStorage.setItem(CONFIG.STORAGE_KEYS.KARYAWAN, JSON.stringify(AppState.karyawan));
    localStorage.setItem(CONFIG.STORAGE_KEYS.JABATAN,  JSON.stringify(AppState.jabatan));
    localStorage.setItem(CONFIG.STORAGE_KEYS.LOG,      JSON.stringify(AppState.log));
  }
};

// ─── 6. BUSINESS LOGIC (SERVICES) ───────────────────────────────────────────
const EmployeeService = {
  add(rawData) {
    const newEmployee = Models.Karyawan(rawData);
    AppState.karyawan.unshift(newEmployee);
    DB.save();
    return newEmployee;
  },

  update(id, newData, newStatusData = null) {
    const emp = AppState.karyawan.find(k => k.id === id);
    if (!emp) return false;

    // Track Multi-Changes
    if (newData.Jabatan && emp.Jabatan !== newData.Jabatan) {
      AppState.log.push(Models.LogChange(emp.NIP, emp.Nama, 'jabatan', emp.Jabatan, newData.Jabatan));
      emp.Jabatan = newData.Jabatan;
    }
    if (newData.SBU !== undefined && emp.SBU !== newData.SBU.toUpperCase()) {
      AppState.log.push(Models.LogChange(emp.NIP, emp.Nama, 'sbu', emp.SBU, newData.SBU.toUpperCase()));
      emp.SBU = newData.SBU.toUpperCase();
    }
    if (newStatusData && (emp.Status !== newStatusData.Status || emp.StatusCatatan !== newStatusData.Catatan)) {
      AppState.log.push(Models.LogChange(emp.NIP, emp.Nama, 'status', emp.Status, newStatusData.Status, newStatusData.Catatan));
      emp.Status = newStatusData.Status;
      emp.StatusCatatan = newStatusData.Catatan;
      emp.StatusManual = true;
    }

    // Update remaining data using Model properties
    Object.assign(emp, Models.Karyawan({ ...emp, ...newData }));
    emp.TglUpdate = Utils.getTodayDate(); // Force update date

    DB.save();
    return true;
  },

  bulkUpload(dataArray) {
    const newEmployees = dataArray.map(data => Models.Karyawan(data));
    AppState.karyawan = AppState.karyawan.concat(newEmployees);
    DB.save();
    return newEmployees.length;
  }
};

// ─── 7. UI RENDERER ─────────────────────────────────────────────────────────
const UI = {
  init() {
    DB.load();
    this.renderAll();
    this.setupUploadZone();
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

    // Log Filter
    const qLog = (document.getElementById('searchLog')?.value || '').toLowerCase();
    const filteredLog = log.filter(c => 
      !qLog || c.nik.toLowerCase().includes(qLog) || c.nama.toLowerCase().includes(qLog) || 
      c.type.toLowerCase().includes(qLog) || c.oldVal.toLowerCase().includes(qLog) || c.newVal.toLowerCase().includes(qLog)
    );

    const container = document.getElementById('dash-changes');
    if (!log.length) {
      container.innerHTML = `<div class="empty"><div class="empty-icon">📋</div><h3>Belum ada perubahan</h3><p>Log akan muncul saat ada perubahan data.</p></div>`;
      return;
    }
    if (!filteredLog.length) {
      container.innerHTML = `<div class="empty"><div class="empty-icon">🔍</div><h3>Tidak ada log yang cocok</h3></div>`;
      return;
    }

    container.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Tanggal</th><th>NIP</th><th>Nama</th><th>Tipe Perubahan</th><th>Detail Perubahan</th></tr></thead>
          <tbody>
            ${filteredLog.slice().reverse().map(c => {
              const isStatus = c.type === 'status';
              const badge = `<span class="pill pill-${isStatus ? 'purple' : (c.type === 'sbu' ? 'blue' : 'yellow')}">${c.type.toUpperCase()}</span>`;
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
  },

  renderKaryawanTable() {
    const { karyawan, pagination } = AppState;
    const q    = (document.getElementById('searchKaryawan')?.value || '').toLowerCase();
    const fK   = document.getElementById('filterJabatan')?.value || '';
    const fSBU = document.getElementById('filterSBU')?.value || '';
    const fS   = document.getElementById('filterStatus')?.value || '';

    // Update Dropdown Filters Dynamically
    Utils.fillSelect('filterJabatan', [...new Set(karyawan.map(k => k.Jabatan))].filter(Boolean));
    Utils.fillSelect('filterSBU', [...new Set(karyawan.map(k => k.SBU))].filter(Boolean));

    const filtered = karyawan.filter(k =>
      (!q  || k.NIP.toLowerCase().includes(q) || k.Nama.toLowerCase().includes(q) || k.SBU.toLowerCase().includes(q)) &&
      (!fK || k.Jabatan === fK) &&
      (!fSBU || k.SBU === fSBU) &&
      (!fS || k.Status === fS)
    );

    const tbody = document.getElementById('karyawanBody');
    const pageContainer = document.getElementById('paginationKaryawan');

    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="13"><div class="empty"><div class="empty-icon">👥</div><h3>Tidak ada data</h3></div></td></tr>`;
      pageContainer.style.display = 'none';
      return;
    }

    // Pagination Calculation
    pageContainer.style.display = 'flex';
    document.getElementById('totalData').textContent = filtered.length;
    const totalPages = Math.ceil(filtered.length / pagination.size) || 1;
    if (pagination.page > totalPages) pagination.page = totalPages; 

    const startIdx = (pagination.page - 1) * pagination.size;
    const paginated = filtered.slice(startIdx, startIdx + pagination.size);

    tbody.innerHTML = paginated.map(k => `
      <tr>
        <td><button class="btn btn-secondary btn-sm" onclick="Handlers.openEditModal(${k.id})">✏️ Edit</button></td>
        <td class="mono">${k.NIP}</td><td style="font-weight:500">${k.Nama}</td>
        <td><span class="pill pill-blue">${k.Jabatan}</span></td><td>${k.SBU}</td>
        <td>${k.BKOJabatan}</td><td>${k.BKOSBU}</td><td>${k.SlotBOQ}</td><td>${k.SlotReal}</td>
        <td class="mono">${k.NIPBaru}</td><td>${k.Email}</td><td style="font-size:12px;color:var(--text2)">${k.TglUpdate}</td>
        <td>${Utils.statusPill(k.Status)}${k.StatusCatatan ? `<br><span style="font-size:10px;color:var(--text2)">${k.StatusCatatan}</span>` : ''}</td>
      </tr>`).join('');

    this.renderPagination(totalPages);
  },

  renderPagination(totalPages) {
    const container = document.getElementById('pageControls');
    const p = AppState.pagination.page;
    let html = `<button class="page-btn" ${p === 1 ? 'disabled' : ''} onclick="Handlers.goToPage(${p - 1})">❮</button>`;
    
    let start = Math.max(1, p - 2);
    let end = Math.min(totalPages, p + 2);

    if (start > 1) html += `<button class="page-btn" onclick="Handlers.goToPage(1)">1</button>${start > 2 ? '<span>...</span>' : ''}`;
    for (let i = start; i <= end; i++) html += `<button class="page-btn ${i === p ? 'active' : ''}" onclick="Handlers.goToPage(${i})">${i}</button>`;
    if (end < totalPages) html += `${end < totalPages - 1 ? '<span>...</span>' : ''}<button class="page-btn" onclick="Handlers.goToPage(${totalPages})">${totalPages}</button>`;
    
    html += `<button class="page-btn" ${p === totalPages ? 'disabled' : ''} onclick="Handlers.goToPage(${p + 1})">❯</button>`;
    container.innerHTML = html;
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
  // Navigation & Pagination
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

  // Upload Handlers
  handleFile(e) { if (e.target.files[0]) this.processExcel(e.target.files[0]); },
  processExcel(file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const wb = XLSX.read(ev.target.result, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      if (!raw.length) return Utils.toast('❌ File kosong!');

      const COLS = ['NIP','Nama','Jabatan','SBU','BKO Jabatan','BKO SBU','Slot BOQ','Slot Real','NIP Baru','Email'];
      const header = raw[0].map(h => String(h).trim());

      AppState.previewUpload = raw.slice(1).map(row => {
        let obj = {};
        COLS.forEach(col => {
          const idx = header.findIndex(h => h.toLowerCase() === col.toLowerCase());
          obj[col] = idx >= 0 ? String(row[idx]) : '';
        });
        return obj;
      }).filter(r => r.NIP || r.Nama);

      // Render Preview
      document.getElementById('previewHead').innerHTML = COLS.map(c => `<th>${c}</th>`).join('');
      document.getElementById('previewBody').innerHTML = AppState.previewUpload.slice(0, 20).map(r => `
        <tr>${COLS.map(c => `<td class="${c === 'NIP' ? 'mono' : ''}">${r[c]}</td>`).join('')}</tr>
      `).join('');
      
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
    EmployeeService.bulkUpload(AppState.previewUpload);
    this.cancelUpload(); // Reset UI
    Utils.toast(`✅ Karyawan berhasil disimpan`);
    this.resetPageAndRender();
    this.navigate('dashboard');
  },

  // Modal: Edit Karyawan
  openEditModal(id) {
    AppState.modals.editTargetId = id;
    
    // Fill Dropdowns
    const elJabatan = document.getElementById('editJabatan');
    const elSBU = document.getElementById('editSBU');
    elJabatan.innerHTML = '<option value="">— Pilih Jabatan —</option>' + AppState.jabatan.map(j => `<option value="${j.nama}">${j.nama}</option>`).join('');
    elSBU.innerHTML = '<option value="">— Pilih SBU —</option>' + CONFIG.DEFAULT_SBU.map(s => `<option value="${s}">${s}</option>`).join('');

    const emp = id ? AppState.karyawan.find(k => k.id === id) : Models.Karyawan(); // Empty if null

    // Populate Fields
    document.getElementById('editNIP').value = emp.NIP;
    document.getElementById('editNama').value = emp.Nama;
    document.getElementById('editJabatan').value = emp.Jabatan;
    document.getElementById('editSBU').value = emp.SBU;
    document.getElementById('editBKOJabatan').value = emp.BKOJabatan;
    document.getElementById('editBKOSBU').value = emp.BKOSBU;
    document.getElementById('editSlotBOQ').value = emp.SlotBOQ;
    document.getElementById('editSlotReal').value = emp.SlotReal;
    document.getElementById('editNIPBaru').value = emp.NIPBaru;
    document.getElementById('editEmail').value = emp.Email;
    document.getElementById('editStatus').value = emp.Status;
    document.getElementById('editCatatanStatus').value = emp.StatusCatatan;

    document.getElementById('modalEditData').classList.add('open');
  },
  saveEditData() {
    const NIP = document.getElementById('editNIP').value.trim();
    const Nama = document.getElementById('editNama').value.trim();
    if (!NIP || !Nama) return Utils.toast('❌ NIP dan Nama wajib diisi!');

    const formData = {
      NIP, Nama,
      Jabatan: document.getElementById('editJabatan').value,
      SBU: document.getElementById('editSBU').value,
      BKOJabatan: document.getElementById('editBKOJabatan').value,
      BKOSBU: document.getElementById('editBKOSBU').value,
      SlotBOQ: document.getElementById('editSlotBOQ').value,
      SlotReal: document.getElementById('editSlotReal').value,
      NIPBaru: document.getElementById('editNIPBaru').value,
      Email: document.getElementById('editEmail').value
    };

    const statusData = {
      Status: document.getElementById('editStatus').value,
      Catatan: document.getElementById('editCatatanStatus').value.trim()
    };

    if (AppState.modals.editTargetId === null) {
      EmployeeService.add({ ...formData, ...statusData });
      AppState.pagination.page = 1;
      Utils.toast(`✅ Karyawan ditambahkan!`);
    } else {
      EmployeeService.update(AppState.modals.editTargetId, formData, statusData);
      Utils.toast(`✅ Data diperbarui!`);
    }

    UI.closeModal('modalEditData');
    UI.renderKaryawanTable();
    UI.updateBadge();
  },

  // Modal: Quick Move Jabatan
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

  // Jabatan Management
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

  // Export
  exportToExcel() {
    if (!AppState.karyawan.length) return Utils.toast('❌ Tidak ada data untuk diexport!');

    const rows = AppState.karyawan.map(k => ({
      'NIP': k.NIP, 'Nama': k.Nama, 'Jabatan': k.Jabatan, 'SBU': k.SBU,
      'BKO Jabatan': k.BKOJabatan, 'BKO SBU': k.BKOSBU, 'Slot BOQ': k.SlotBOQ, 
      'Slot Real': k.SlotReal, 'NIP Baru': k.NIPBaru, 'Email': k.Email,
      'Tanggal Update': k.TglUpdate, 'Status': k.Status, 'Catatan Status': k.StatusCatatan
    }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), 'Data Karyawan');

    if (AppState.log.length) {
      const logRows = AppState.log.map(c => ({
        'Tanggal': c.ts, 'NIP': c.nik, 'Nama': c.nama, 'Tipe Ubah': c.type.toUpperCase(),
        'Data Lama': c.oldVal, 'Data Baru': c.newVal, 'Catatan': c.catatan
      }));
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(logRows), 'Log Perubahan');
    }

    XLSX.writeFile(wb, `data-karyawan-${Utils.getTodayDate()}.xlsx`);
    Utils.toast('✅ Excel berhasil diexport!');
  }
};

// ─── 9. GLOBAL BINDINGS (Bridges to HTML) ───────────────────────────────────
// Agar fungsi-fungsi bisa dipanggil langsung dari onclick HTML
window.navigate = (page) => Handlers.navigate(page);
window.handleFile = (e) => Handlers.handleFile(e);
window.batalUpload = () => Handlers.cancelUpload();
window.confirmUpload = () => Handlers.confirmUpload();
window.renderDashboard = () => UI.renderDashboard();
window.resetPageAndRender = () => Handlers.resetPageAndRender();
window.changePageSize = () => Handlers.changePageSize();
window.renderPindah = () => UI.renderPindahJabatan();
window.openModalEdit = (id) => Handlers.openEditModal(id);
window.simpanEditData = () => Handlers.saveEditData();
window.closeModal = (id) => UI.closeModal(id);
window.openModalPindah = (id) => Handlers.openQuickMoveModal(id);
window.simpanPindah = () => Handlers.saveQuickMove();
window.tambahJabatan = () => Handlers.addJabatan();
window.exportExcel = () => Handlers.exportToExcel();

// Initialize application
UI.init();