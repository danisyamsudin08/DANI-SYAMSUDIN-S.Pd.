// ============================================================================
// E-VOTING MAS & MBAK MOLAS 2026 - SMP NEGERI 15 SEMARANG
// Core Single Page Application (SPA) Controller
// ============================================================================

import { db } from './services/db.js';
import { parseExcelFile, downloadExcelTemplate, exportVotersToExcel } from './utils/excel.js';
import { renderAnalyticsCharts, destroyCharts } from './utils/charts.js';
import { SQL_SCHEMA_SCRIPT, INITIAL_VOTERS } from './data/seeds.js';
import {
  renderLandingView,
  renderVoterStep1View,
  renderVoterStep2View,
  renderThankYouView,
  renderAdminLoginView,
  renderAdminDashboardView
} from './views/templates.js';

// ----------------------------------------------------------------------------
// 1. SUPABASE CLIENT INITIALIZATION (USING PROVIDED CREDENTIALS)
// ----------------------------------------------------------------------------
export const SUPABASE_URL = 'https://aqwujacqosyrcqhtfhdl.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxd3VqYWNxb3N5cmNxaHRmaGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMDAwMTMsImV4cCI6MjEwNjY3NjAxM30.xSHq79aKjS9DBcCt2n9DH_JuCZN2hhjcEE-yJ6iFtGM';

// Initialize Supabase JS Client on global window context
export const supabase = (typeof window !== 'undefined' && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ----------------------------------------------------------------------------
// 2. CORE SPA STATE MANAGEMENT SYSTEM
// ----------------------------------------------------------------------------
class AppController {
  constructor() {
    // Current Active View State:
    // 'landing' | 'voter-step1' | 'voter-step2' | 'voter-thankyou' | 'admin-login' | 'admin-dashboard'
    this.currentView = 'landing';

    // Admin Dashboard Active Tab State:
    // 'analytics' | 'voters' | 'candidates' | 'excel' | 'supabase'
    this.activeAdminTab = 'analytics';

    // Active Voter Session State
    this.currentVoter = null;
    this.selectedMasId = null;
    this.selectedMbakId = null;
    this.votingTimestamp = null;

    // Admin Session State
    this.isAdmin = sessionStorage.getItem('molas_is_admin') === 'true';

    // DPT Filtering & Search State
    this.voterFilters = { kelas: 'ALL', status: 'ALL', search: '' };
    
    // Cached Data Collections
    this.candidates = [];
    this.voters = [];
    this.stats = null;
  }

  async init() {
    this.applyHeaderConfig();
    await this.loadData();
    this.updateNavbarUser();
    this.updateDbStatusPill();
    this.render();
  }

  applyHeaderConfig() {
    const cfg = db.getHeaderConfig();
    
    // Logo
    const logoBox = document.getElementById('header-logo-container');
    if (logoBox) {
      if (cfg.logo_url) {
        logoBox.innerHTML = `<img src="${cfg.logo_url}" alt="Logo Sekolah" class="w-full h-full object-contain">`;
      } else {
        logoBox.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-slate-950">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span class="absolute -bottom-1 -right-1 bg-blue-700 text-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded shadow">15</span>
        `;
      }
    }

    // Title & Texts
    const titleEl = document.getElementById('header-title');
    if (titleEl) titleEl.innerText = cfg.judul_utama;

    const subEl = document.getElementById('header-subtitle');
    if (subEl) subEl.innerText = cfg.sub_judul;

    const badgeEl = document.getElementById('header-badge');
    if (badgeEl) badgeEl.innerText = cfg.badge_text;

    const footerEl = document.getElementById('footer-copyright');
    if (footerEl) footerEl.innerHTML = cfg.footer_text;

    if (cfg.judul_utama) {
      document.title = `${cfg.judul_utama} - SMP Negeri 15 Semarang`;
    }
  }

  async loadData() {
    this.candidates = await db.getCandidates();
    this.voters = await db.getVoters(this.voterFilters.kelas, this.voterFilters.search, this.voterFilters.status);
    this.stats = await db.getVoteStats();
  }

  updateNavbarUser() {
    const navContainer = document.getElementById('nav-user-actions');
    if (!navContainer) return;

    if (this.isAdmin) {
      navContainer.innerHTML = `
        <span class="hidden sm:inline-block text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3 py-1 rounded-full">
          Mode Admin
        </span>
        <button onclick="appState.navigate('admin-dashboard')" class="px-3 py-1.5 bg-blue-800 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5">
          <i data-lucide="layout-dashboard" class="w-3.5 h-3.5"></i> Dashboard
        </button>
      `;
    } else if (this.currentVoter) {
      navContainer.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="text-right hidden sm:block">
            <p class="text-xs font-bold text-white">${this.currentVoter.nama}</p>
            <p class="text-[10px] text-blue-200">${this.currentVoter.kelas}</p>
          </div>
          <button onclick="appState.logoutVoter()" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1">
            <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Keluar
          </button>
        </div>
      `;
    } else {
      navContainer.innerHTML = `
        <button onclick="appState.navigate('admin-login')" class="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition flex items-center gap-1.5">
          <i data-lucide="shield" class="w-3.5 h-3.5 text-amber-400"></i>
          <span>Login Admin</span>
        </button>
      `;
    }
    this.refreshIcons();
  }

  updateDbStatusPill() {
    const dot = document.getElementById('db-status-dot');
    const text = document.getElementById('db-status-text');
    const pill = document.getElementById('db-status-pill');
    const cfg = db.getConfig();

    if (!pill || !dot || !text) return;

    if (cfg.isLive) {
      pill.className = 'hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition cursor-pointer';
      dot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
      text.innerText = 'Supabase Cloud';
    } else {
      pill.className = 'hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-amber-950/60 border-amber-500/40 text-amber-300 hover:bg-amber-900/60 transition cursor-pointer';
      dot.className = 'w-2 h-2 rounded-full bg-amber-400';
      text.innerText = 'Simulasi Lokal (Demo)';
    }
  }

  refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // --- NAVIGATION ---
  async navigate(view) {
    destroyCharts();
    this.currentView = view;
    this.updateNavbarUser();

    if (view === 'admin-dashboard') {
      if (!this.isAdmin) {
        this.currentView = 'admin-login';
      } else {
        await this.loadData();
      }
    }

    this.render();
  }

  render() {
    const container = document.getElementById('app-view');
    if (!container) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (this.currentView) {
      case 'landing':
        container.innerHTML = renderLandingView();
        this.bindLandingEvents();
        break;

      case 'voter-step1':
        if (!this.currentVoter) {
          this.navigate('landing');
          return;
        }
        container.innerHTML = renderVoterStep1View(this.currentVoter, this.candidates, this.selectedMasId);
        break;

      case 'voter-step2':
        if (!this.currentVoter || !this.selectedMasId) {
          this.navigate('voter-step1');
          return;
        }
        container.innerHTML = renderVoterStep2View(this.currentVoter, this.candidates, this.selectedMasId, this.selectedMbakId);
        break;

      case 'voter-thankyou':
        if (!this.currentVoter) {
          this.navigate('landing');
          return;
        }
        const mas = this.candidates.find(c => c.id === this.selectedMasId);
        const mbak = this.candidates.find(c => c.id === this.selectedMbakId);
        container.innerHTML = renderThankYouView(this.currentVoter, mas, mbak, this.votingTimestamp);
        break;

      case 'admin-login':
        container.innerHTML = renderAdminLoginView();
        this.bindAdminLoginEvents();
        break;

      case 'admin-dashboard':
        container.innerHTML = renderAdminDashboardView(this.activeAdminTab, this.stats, this.voters, this.candidates, this.voterFilters);
        this.bindAdminDashboardEvents();
        if (this.activeAdminTab === 'analytics') {
          setTimeout(() => renderAnalyticsCharts(this.stats), 50);
        }
        break;

      default:
        container.innerHTML = renderLandingView();
        this.bindLandingEvents();
    }

    this.refreshIcons();
  }

  // --- EVENT BINDINGS ---
  bindLandingEvents() {
    const form = document.getElementById('form-voter-login');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('voter-username').value;
        const password = document.getElementById('voter-password').value;
        await this.handleVoterLogin(username, password);
      });
    }
  }

  bindAdminLoginEvents() {
    const form = document.getElementById('form-admin-login');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('admin-username').value.trim();
        const p = document.getElementById('admin-password').value.trim();

        const admin = db.verifyAdminCredentials(u, p);
        if (admin) {
          this.isAdmin = true;
          sessionStorage.setItem('molas_is_admin', 'true');
          sessionStorage.setItem('molas_admin_nama', admin.nama || admin.username);
          this.showToast(`Login Admin Berhasil! Selamat datang, ${admin.nama || admin.username}.`, 'success');
          this.navigate('admin-dashboard');
        } else {
          this.showToast('Username atau Password Admin salah! Periksa kembali kredensial Anda.', 'error');
        }
      });
    }
  }

  bindAdminDashboardEvents() {
    // Manual voter add form
    const manualForm = document.getElementById('form-manual-voter');
    if (manualForm) {
      manualForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const voterData = {
          username: document.getElementById('manual-user').value,
          password: document.getElementById('manual-pass').value,
          nama: document.getElementById('manual-nama').value,
          kelas: document.getElementById('manual-kelas').value
        };
        await db.addVoter(voterData);
        this.showToast(`Pemilih ${voterData.nama} (${voterData.kelas}) berhasil ditambahkan!`, 'success');
        manualForm.reset();
        await this.refreshVotersList();
      });
    }

    // Supabase config form
    const cfgForm = document.getElementById('form-supabase-config');
    if (cfgForm) {
      cfgForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = document.getElementById('cfg-supabase-url').value;
        const key = document.getElementById('cfg-supabase-key').value;
        const res = await db.setConfig(url, key);
        this.updateDbStatusPill();
        if (res.success) {
          this.showToast(res.message, 'success');
          await this.loadData();
          this.render();
        } else {
          this.showToast(res.message, 'error');
        }
      });
    }

    // Create new admin form
    const adminForm = document.getElementById('form-create-admin');
    if (adminForm) {
      adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCreateAdmin();
      });
    }
  }

  // --- VOTER ACTIONS ---
  async handleVoterLogin(username, password) {
    if (!username || !password) {
      this.showToast('Silakan isi Username dan Password!', 'warning');
      return;
    }

    const voter = await db.getVoterByLogin(username, password);

    if (!voter) {
      this.showToast('Akun pemilih tidak ditemukan atau sandi salah!', 'error');
      return;
    }

    if (voter.status_voted) {
      this.showToast(`Akun Anda (${voter.nama} - ${voter.kelas}) telah melakukan voting sebelumnya. Setiap pemilih hanya memiliki 1 kali kesempatan hak suara!`, 'warning');
      return;
    }

    this.currentVoter = voter;
    this.selectedMasId = null;
    this.selectedMbakId = null;
    this.showToast(`Selamat datang, ${voter.nama}! Silakan gunakan hak suara Anda secara bijak.`, 'success');
    this.navigate('voter-step1');
  }

  fillQuickLogin(user, pass) {
    const uInput = document.getElementById('voter-username');
    const pInput = document.getElementById('voter-password');
    if (uInput && pInput) {
      uInput.value = user;
      pInput.value = pass;
      this.showToast(`Akun simulasi ${user} terisi otomatis. Klik Masuk!`, 'info');
    }
  }

  selectCandidateMas(id) {
    if (this.selectedMasId === id) {
      this.selectedMasId = null;
    } else {
      this.selectedMasId = id;
      const c = this.candidates.find(cand => cand.id === id);
      if (c) this.showToast(`Anda memilih: 0${c.nomor_urut} - ${c.nama}`, 'info');
    }
    this.render();
  }

  selectCandidateMbak(id) {
    if (this.selectedMbakId === id) {
      this.selectedMbakId = null;
    } else {
      this.selectedMbakId = id;
      const c = this.candidates.find(cand => cand.id === id);
      if (c) this.showToast(`Anda memilih: 0${c.nomor_urut} - ${c.nama}`, 'info');
    }
    this.render();
  }

  goToStep1() {
    this.navigate('voter-step1');
  }

  goToStep2() {
    if (!this.selectedMasId) {
      this.showToast('Silakan pilih salah satu kandidat Mas Molas terlebih dahulu!', 'warning');
      return;
    }
    this.navigate('voter-step2');
  }

  openConfirmVoteModal() {
    if (!this.selectedMasId || !this.selectedMbakId) {
      this.showToast('Anda harus memilih 1 Mas Molas dan 1 Mbak Molas sebelum mengirim suara!', 'warning');
      return;
    }

    const mas = this.candidates.find(c => c.id === this.selectedMasId);
    const mbak = this.candidates.find(c => c.id === this.selectedMbakId);

    const modalHtml = `
      <div id="confirm-modal-overlay" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
          
          <div class="text-center space-y-2">
            <div class="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border-2 border-amber-300">
              <i data-lucide="help-circle" class="w-8 h-8"></i>
            </div>
            <h3 class="text-xl font-black text-slate-900">Konfirmasi Hak Suara Anda</h3>
            <p class="text-xs text-slate-600">Pastikan pasangan Mas dan Mbak Molas pilihan Anda telah sesuai:</p>
          </div>

          <div class="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <!-- Mas chosen -->
            <div class="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
              <img src="${mas?.foto_url || ''}" class="w-12 h-12 rounded-lg object-cover">
              <div>
                <span class="text-[10px] uppercase font-bold text-blue-700">Mas Molas 2026</span>
                <p class="text-sm font-bold text-slate-900">0${mas?.nomor_urut}. ${mas?.nama}</p>
              </div>
            </div>

            <!-- Mbak chosen -->
            <div class="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
              <img src="${mbak?.foto_url || ''}" class="w-12 h-12 rounded-lg object-cover">
              <div>
                <span class="text-[10px] uppercase font-bold text-amber-700">Mbak Molas 2026</span>
                <p class="text-sm font-bold text-slate-900">0${mbak?.nomor_urut}. ${mbak?.nama}</p>
              </div>
            </div>
          </div>

          <div class="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-amber-900 text-xs font-medium flex items-start gap-2">
            <i data-lucide="alert-triangle" class="w-4 h-4 shrink-0 text-amber-700 mt-0.5"></i>
            <span>Pilihan yang telah dikirim bersifat <strong>FINAL</strong> dan tidak dapat diubah kembali demi menjaga kerahasiaan & integritas pemilu.</span>
          </div>

          <div class="flex items-center gap-3">
            <button 
              type="button" 
              onclick="appState.closeModal()" 
              class="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition"
            >
              Periksa Kembali
            </button>
            <button 
              type="button" 
              onclick="appState.submitVote()" 
              class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <i data-lucide="check-check" class="w-4 h-4"></i>
              <span>Ya, Kirim Suara!</span>
            </button>
          </div>

        </div>
      </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHtml;
    this.refreshIcons();
  }

  async submitVote() {
    this.closeModal();
    if (!this.currentVoter || !this.selectedMasId || !this.selectedMbakId) return;

    const res = await db.castVote(this.currentVoter.id, this.selectedMasId, this.selectedMbakId);
    if (res.success) {
      this.votingTimestamp = res.timestamp;
      this.showToast('Suara Anda berhasil tercatat! Terima kasih telah berpartisipasi.', 'success');
      this.navigate('voter-thankyou');
    }
  }

  logoutVoter() {
    this.currentVoter = null;
    this.selectedMasId = null;
    this.selectedMbakId = null;
    this.votingTimestamp = null;
    this.updateNavbarUser();
    this.showToast('Anda telah keluar. Bilik suara siap digunakan pemilih berikutnya.', 'info');
    this.navigate('landing');
  }

  // --- ADMIN ACTIONS ---
  logoutAdmin() {
    this.isAdmin = false;
    sessionStorage.removeItem('molas_is_admin');
    this.updateNavbarUser();
    this.showToast('Admin berhasil keluar.', 'info');
    this.navigate('landing');
  }

  switchAdminTab(tab) {
    destroyCharts();
    this.activeAdminTab = tab;
    this.render();
  }

  async refreshDashboard() {
    await this.loadData();
    this.showToast('Data statistik dan DPT diperbarui.', 'info');
    this.render();
  }

  async updateVoterFilter(key, value) {
    this.voterFilters[key] = value;
    this.voters = await db.getVoters(this.voterFilters.kelas, this.voterFilters.search, this.voterFilters.status);
    // Partial update to avoid re-rendering entire dashboard
    const container = document.getElementById('admin-tab-content');
    if (container && this.activeAdminTab === 'voters') {
      container.innerHTML = renderVotersMonitoringTab(this.voters, this.voterFilters, this.stats);
      this.refreshIcons();
    }
  }

  async refreshVotersList() {
    this.voters = await db.getVoters(this.voterFilters.kelas, this.voterFilters.search, this.voterFilters.status);
    this.stats = await db.getVoteStats();
    this.render();
  }

  // --- CANDIDATE DETAIL & FORM MODALS ---
  openCandidateDetailModal(candidateId) {
    const c = this.candidates.find(item => item.id === candidateId);
    if (!c) return;

    const isMas = c.kategori === 'mas';
    const modalHtml = `
      <div id="detail-modal-overlay" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onclick="if(event.target.id === 'detail-modal-overlay') appState.closeModal()">
        <div class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
          
          <div class="relative aspect-[16/10] bg-slate-900 w-full overflow-hidden shrink-0">
            <img src="${c.foto_url || ''}" alt="${c.nama}" class="w-full h-full object-cover">
            <button onclick="appState.closeModal()" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
            <div class="absolute bottom-3 left-4 right-4">
              <span class="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${isMas ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'} uppercase mb-1">
                Kandidat ${isMas ? 'Mas' : 'Mbak'} Molas 2026
              </span>
              <h3 class="text-xl font-black text-white leading-tight drop-shadow">0${c.nomor_urut}. ${c.nama}</h3>
            </div>
          </div>

          <div class="p-6 space-y-4 overflow-y-auto custom-scroll text-slate-700 text-xs sm:text-sm leading-relaxed">
            <h4 class="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <i data-lucide="file-text" class="w-4 h-4 text-blue-600"></i> Visi & Misi Duta Pelajar
            </h4>
            <div class="whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-200 text-slate-800">
              ${c.visi_misi || 'Visi & Misi belum dimasukkan.'}
            </div>
          </div>

          <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
            <button onclick="appState.closeModal()" class="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition">
              Tutup
            </button>
          </div>

        </div>
      </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHtml;
    this.refreshIcons();
  }

  openCandidateFormModal(candidateId = null) {
    const c = candidateId ? this.candidates.find(item => item.id === candidateId) : null;
    const isEdit = !!c;

    const modalHtml = `
      <div id="form-modal-overlay" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onclick="if(event.target.id === 'form-modal-overlay') appState.closeModal()">
        <div class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
          
          <div class="p-5 bg-slate-900 text-white flex items-center justify-between border-b-2 border-amber-500">
            <h3 class="font-bold text-sm sm:text-base">${isEdit ? 'Edit Data Kandidat' : 'Tambah Kandidat Baru'}</h3>
            <button onclick="appState.closeModal()" class="text-slate-400 hover:text-white">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="form-candidate-crud" class="p-6 space-y-4 overflow-y-auto custom-scroll text-xs">
            <input type="hidden" id="cand-id" value="${c?.id || ''}">
            
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-slate-700 uppercase mb-1">Kategori</label>
                <select id="cand-kategori" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold">
                  <option value="mas" ${c?.kategori === 'mas' ? 'selected' : ''}>Mas Molas</option>
                  <option value="mbak" ${c?.kategori === 'mbak' ? 'selected' : ''}>Mbak Molas</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-slate-700 uppercase mb-1">Nomor Urut (1-9)</label>
                <input type="number" id="cand-nomor" required min="1" max="99" value="${c?.nomor_urut || 1}" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold">
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Nama Lengkap Siswa</label>
              <input type="text" id="cand-nama" required placeholder="Contoh: Raden Arya Wicaksana" value="${c?.nama || ''}" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl">
            </div>

            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">URL Foto Profil</label>
              <input type="url" id="cand-foto" placeholder="https://..." value="${c?.foto_url || ''}" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl">
              <p class="text-[10px] text-slate-400 mt-1">Gunakan URL foto resmi kandidat berseragam/jas sekolah.</p>
            </div>

            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Visi & Misi</label>
              <textarea id="cand-visi" rows="5" placeholder="Visi: ...&#10;&#10;Misi:&#10;1. ...&#10;2. ..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl leading-relaxed">${c?.visi_misi || ''}</textarea>
            </div>

            <div class="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button type="button" onclick="appState.closeModal()" class="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold">Batal</button>
              <button type="submit" class="px-5 py-2 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold flex items-center gap-1.5 shadow">
                <i data-lucide="save" class="w-4 h-4"></i> Simpan Kandidat
              </button>
            </div>
          </form>

        </div>
      </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHtml;
    this.refreshIcons();

    document.getElementById('form-candidate-crud').addEventListener('submit', async (e) => {
      e.preventDefault();
      const candData = {
        id: document.getElementById('cand-id').value || null,
        kategori: document.getElementById('cand-kategori').value,
        nomor_urut: parseInt(document.getElementById('cand-nomor').value),
        nama: document.getElementById('cand-nama').value,
        foto_url: document.getElementById('cand-foto').value || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
        visi_misi: document.getElementById('cand-visi').value
      };

      await db.saveCandidate(candData);
      this.showToast(`Kandidat ${candData.nama} berhasil disimpan!`, 'success');
      this.closeModal();
      await this.loadData();
      this.render();
    });
  }

  async deleteCandidate(id) {
    if (confirm('Apakah Anda yakin ingin menghapus kandidat ini?')) {
      await db.deleteCandidate(id);
      this.showToast('Kandidat berhasil dihapus.', 'info');
      await this.loadData();
      this.render();
    }
  }

  closeModal() {
    const mc = document.getElementById('modal-container');
    if (mc) mc.innerHTML = '';
  }

  // --- EXCEL & BATCH TOOLS ---
  async handleExcelUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('excel-status');
    if (statusEl) {
      statusEl.className = 'p-3 rounded-xl text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200 block';
      statusEl.innerText = 'Memproses file Excel via SheetJS...';
    }

    try {
      const parsed = await parseExcelFile(file);
      const res = await db.importBatchVoters(parsed);
      this.showToast(`Berhasil mengimpor ${res.count} data pemilih dari Excel!`, 'success');
      
      if (statusEl) {
        statusEl.className = 'p-3 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 block';
        statusEl.innerText = `Sukses: ${res.count} pemilih baru diimpor. Total pemilih saat ini: ${res.total}.`;
      }

      await this.loadData();
    } catch (err) {
      this.showToast(err.message, 'error');
      if (statusEl) {
        statusEl.className = 'p-3 rounded-xl text-xs font-medium bg-red-50 text-red-800 border border-red-200 block';
        statusEl.innerText = 'Error: ' + err.message;
      }
    }
  }

  downloadTemplate() {
    downloadExcelTemplate();
    this.showToast('Format Excel berhasil diunduh.', 'info');
  }

  exportCurrentVotersExcel() {
    exportVotersToExcel(this.voters);
    this.showToast('Data pemilih berhasil diekspor ke Excel.', 'success');
  }

  async generateSample1000() {
    if (confirm('Generate 1000 data pemilih otomatis untuk seluruh kelas (7A-9I + Guru/Karyawan)?')) {
      const res = await db.generateSample1000Voters();
      this.showToast(`1000 pemilih berhasil dibuat! Total DPT: ${res.total}`, 'success');
      await this.loadData();
      this.render();
    }
  }

  async resetAllVotesConfirm() {
    const input = prompt('PERINGATAN: Ketik "RESET" untuk mengosongkan seluruh perolehan suara masuk:');
    if (input === 'RESET') {
      await db.resetAllVotes();
      this.showToast('Seluruh data perolehan suara berhasil dikosongkan (0 suara).', 'info');
      await this.loadData();
      this.render();
    }
  }

  // --- DPT DELETION (SINGLE & ALL WITH PASSWORD) ---
  async deleteSingleVoter(id, name) {
    if (confirm(`Apakah Anda yakin ingin menghapus pemilih "${name}" dari DPT? Tindakan ini tidak dapat dibatalkan.`)) {
      await db.deleteVoter(id);
      this.showToast(`Pemilih "${name}" berhasil dihapus dari DPT.`, 'success');
      await this.refreshVotersList();
    }
  }

  promptDeleteAllVoters() {
    const modalHtml = `
      <div id="delete-dpt-overlay" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
        <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-red-200">
          
          <div class="text-center space-y-2">
            <div class="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto border-2 border-red-300">
              <i data-lucide="alert-triangle" class="w-8 h-8"></i>
            </div>
            <h3 class="text-xl font-black text-slate-900">Hapus Seluruh Data Pemilih (DPT)?</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Tindakan ini akan <strong>menghapus permanen seluruh akun pemilih (${this.voters.length} pemilih)</strong> beserta riwayat suara masuk di database.
            </p>
          </div>

          <form id="form-confirm-delete-all-dpt" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Konfirmasi Kata Sandi Admin
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <i data-lucide="lock" class="w-4 h-4"></i>
                </span>
                <input 
                  type="password" 
                  id="confirm-admin-password" 
                  required 
                  placeholder="Masukkan kata sandi admin Anda..." 
                  class="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-red-600 outline-none"
                />
              </div>
              <p class="text-[11px] text-red-600 mt-1 font-medium">Diperlukan autentikasi admin untuk mencegah penghapusan data secara tidak sengaja.</p>
            </div>

            <div class="flex items-center gap-3 pt-2">
              <button 
                type="button" 
                onclick="appState.closeModal()" 
                class="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition"
              >
                Batal
              </button>
              <button 
                type="submit" 
                class="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
                <span>Ya, Hapus Semua DPT</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHtml;
    this.refreshIcons();

    document.getElementById('form-confirm-delete-all-dpt').addEventListener('submit', async (e) => {
      e.preventDefault();
      const enteredPass = document.getElementById('confirm-admin-password').value;
      if (db.verifyAnyAdminPassword(enteredPass)) {
        this.closeModal();
        await db.clearAllVoters();
        this.showToast('Seluruh data pemilih (DPT) dan suara berhasil dihapus.', 'info');
        await this.loadData();
        this.render();
      } else {
        this.showToast('Kata sandi admin salah! Penghapusan seluruh DPT dibatalkan.', 'error');
      }
    });
  }

  // --- HEADER & SCHOOL IDENTITY CONFIG ---
  getHeaderConfig() {
    return db.getHeaderConfig();
  }

  handleLogoFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.showToast('File yang dipilih harus berupa gambar (PNG, JPG, SVG, WebP).', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const logoInput = document.getElementById('cfg-logo-url');
      if (logoInput) logoInput.value = dataUrl;

      // Update preview in form
      const previewBox = document.getElementById('preview-logo-box');
      if (previewBox) {
        previewBox.innerHTML = `<img src="${dataUrl}" class="w-full h-full object-contain">`;
      }
      this.showToast('Gambar logo berhasil dimuat. Klik "Simpan Pengaturan Header" untuk menerapkan.', 'info');
    };
    reader.readAsDataURL(file);
  }

  saveHeaderSettings() {
    const newConfig = {
      logo_url: document.getElementById('cfg-logo-url').value.trim(),
      judul_utama: document.getElementById('cfg-judul-utama').value.trim() || 'E-Voting Mas & Mbak Molas 2026',
      sub_judul: document.getElementById('cfg-sub-judul').value.trim() || 'SMP Negeri 15 Semarang',
      badge_text: document.getElementById('cfg-badge-text').value.trim() || 'Molas Fest',
      footer_text: document.getElementById('cfg-footer-text').value.trim() || '© 2026 SMP Negeri 15 Semarang. All Rights Reserved.'
    };

    db.saveHeaderConfig(newConfig);
    this.applyHeaderConfig();
    this.showToast('Pengaturan identitas sekolah & header berhasil disimpan!', 'success');
    this.render();
  }

  resetHeaderSettings() {
    if (confirm('Kembalikan logo dan header ke pengaturan default SMP Negeri 15 Semarang?')) {
      db.resetHeaderConfig();
      this.applyHeaderConfig();
      this.showToast('Pengaturan header dikembalikan ke default.', 'info');
      this.render();
    }
  }

  // --- ADMIN ACCOUNTS MANAGEMENT ---
  getAdmins() {
    return db.getAdmins();
  }

  handleCreateAdmin() {
    const nama = document.getElementById('new-admin-nama').value;
    const username = document.getElementById('new-admin-username').value;
    const password = document.getElementById('new-admin-password').value;

    try {
      db.addAdmin({ nama, username, password });
      this.showToast(`Akun admin "${username}" (${nama}) berhasil ditambahkan!`, 'success');
      this.render();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  handleDeleteAdmin(id, username) {
    if (confirm(`Apakah Anda yakin ingin menghapus akun admin "${username}"?`)) {
      try {
        db.deleteAdmin(id);
        this.showToast(`Akun admin "${username}" berhasil dihapus.`, 'info');
        this.render();
      } catch (err) {
        this.showToast(err.message, 'error');
      }
    }
  }

  // --- SUPABASE UTILS ---
  getDbConfig() {
    return db.getConfig();
  }

  async resetToLocalDb() {
    await db.setConfig('', '');
    this.updateDbStatusPill();
    this.showToast('Kembali ke mode Simulasi Lokal (Demo).', 'info');
    await this.loadData();
    this.render();
  }

  copySqlSchema() {
    navigator.clipboard.writeText(SQL_SCHEMA_SCRIPT);
    this.showToast('Skrip SQL berhasil disalin ke clipboard!', 'success');
  }

  async seedSupabaseCandidates() {
    if (!db.isLive) {
      this.showToast('Supabase belum terhubung! Silakan periksa kredensial.', 'warning');
      return;
    }
    this.showToast('Menginisialisasi 18 kandidat ke Supabase...', 'info');
    const ok = await db.seedCandidatesToSupabase();
    if (ok) {
      this.showToast('18 Kandidat berhasil disinkronkan ke Supabase!', 'success');
      await this.loadData();
      this.render();
    } else {
      this.showToast('Gagal menyinkronkan kandidat. Pastikan tabel candidates sudah dibuat via SQL Editor Supabase.', 'error');
    }
  }

  async seedSupabaseVoters() {
    if (!db.isLive) {
      this.showToast('Supabase belum terhubung! Silakan periksa kredensial.', 'warning');
      return;
    }
    this.showToast('Mengunggah data pemilih sampel ke Supabase...', 'info');
    const res = await db.importBatchVoters(INITIAL_VOTERS);
    if (res.count > 0) {
      this.showToast(`${res.count} Pemilih berhasil diunggah ke Supabase!`, 'success');
      await this.loadData();
      this.render();
    } else {
      this.showToast('Gagal mengunggah data pemilih. Pastikan tabel voters sudah dibuat via SQL Editor Supabase.', 'error');
    }
  }

  openSupabaseConfig() {
    if (this.isAdmin) {
      this.navigate('admin-dashboard');
      this.switchAdminTab('supabase');
    } else {
      this.navigate('admin-login');
      this.showToast('Silakan login admin terlebih dahulu untuk mengubah konfigurasi Supabase.', 'info');
    }
  }

  // --- STANDALONE HTML EXPORTER ---
  downloadStandaloneHtml() {
    // Generates a complete standalone single HTML file combining all CSS, JS and assets
    const fullHtml = `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>E-Voting Mas dan Mbak Molas 2026 - SMP Negeri 15 Semarang</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: { navy: '#0b192c', dark: '#1e293b', blue: '#1d4ed8', sky: '#0284c7', gold: '#d97706', goldlight: '#fef3c7', accent: '#f59e0b' }
          }
        }
      }
    }
  </script>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @media print { .no-print { display: none !important; } }
    .custom-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans">
  ${document.body.innerHTML.replace(/<script[\s\S]*?<\/script>/gi, '')}
  <script>
    // Embedded standalone launcher
    window.location.reload();
  </script>
</body>
</html>`;

    const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast('File index.html tunggal siap pakai berhasil diunduh!', 'success');
  }

  // --- TOAST SYSTEM ---
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const colors = {
      success: 'bg-emerald-900/90 text-white border-emerald-500',
      error: 'bg-red-900/90 text-white border-red-500',
      warning: 'bg-amber-900/90 text-white border-amber-500',
      info: 'bg-slate-900/90 text-white border-blue-500'
    };

    const icons = {
      success: '<i data-lucide="check-circle" class="w-5 h-5 text-emerald-400 shrink-0"></i>',
      error: '<i data-lucide="alert-circle" class="w-5 h-5 text-red-400 shrink-0"></i>',
      warning: '<i data-lucide="alert-triangle" class="w-5 h-5 text-amber-400 shrink-0"></i>',
      info: '<i data-lucide="info" class="w-5 h-5 text-blue-400 shrink-0"></i>'
    };

    toast.className = `p-4 rounded-2xl shadow-2xl border flex items-start gap-3 text-xs font-semibold backdrop-blur-md transition-all duration-300 pointer-events-auto transform translate-y-2 opacity-0 ${colors[type] || colors.info}`;
    toast.innerHTML = `
      ${icons[type] || icons.info}
      <div class="flex-1">${message}</div>
      <button onclick="this.parentElement.remove()" class="text-white/60 hover:text-white shrink-0">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    `;

    container.appendChild(toast);
    this.refreshIcons();

    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }
}

// Global instance for inline event handlers (onclick="appState...")
export const appState = new AppController();
window.appState = appState;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  appState.init();
});

// Also trigger immediate init if already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  appState.init();
}
