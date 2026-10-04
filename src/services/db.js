import { INITIAL_CANDIDATES, INITIAL_VOTERS, KELAS_OPTIONS } from '../data/seeds.js';

// Default credentials provided by SMPN 15 Semarang
export const DEFAULT_SUPABASE_URL = 'https://aqwujacqosyrcqhtfhdl.supabase.co';
export const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxd3VqYWNxb3N5cmNxaHRmaGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMDAwMTMsImV4cCI6MjEwNjY3NjAxM30.xSHq79aKjS9DBcCt2n9DH_JuCZN2hhjcEE-yJ6iFtGM';

export function normalizeSupabaseUrl(rawUrl) {
  if (!rawUrl) return '';
  let clean = rawUrl.trim();
  // Strip trailing /rest/v1 or /rest/v1/
  clean = clean.replace(/\/rest\/v1\/?$/i, '');
  clean = clean.replace(/\/+$/, '');
  return clean;
}

// Configuration keys for localStorage
const STORAGE_KEYS = {
  SUPABASE_URL: 'molas_supabase_url',
  SUPABASE_KEY: 'molas_supabase_key',
  LOCAL_CANDIDATES: 'molas_local_candidates',
  LOCAL_VOTERS: 'molas_local_voters',
  LOCAL_VOTES: 'molas_local_votes',
  ADMIN_AUTH: 'molas_admin_auth',
  ADMIN_ACCOUNTS: 'molas_admin_accounts',
  HEADER_CONFIG: 'molas_header_config'
};

export const DEFAULT_HEADER_CONFIG = {
  logo_url: '',
  judul_utama: 'E-Voting Mas & Mbak Molas 2026',
  sub_judul: 'SMP Negeri 15 Semarang • Mandiri, Unggul, Berkarakter',
  badge_text: 'Molas Fest',
  footer_text: '© 2026 SMP Negeri 15 Semarang. All Rights Reserved.'
};

export const DEFAULT_ADMINS = [
  { id: 'admin-01', username: 'admin', password: 'adminmolas2026', nama: 'Administrator Utama', created_at: new Date().toISOString() }
];

class DatabaseService {
  constructor() {
    this.client = null;
    this.isLive = false;
    this.init();
  }

  init() {
    // Check if Supabase credentials exist in localStorage or use provided defaults
    let savedUrl = localStorage.getItem(STORAGE_KEYS.SUPABASE_URL);
    let savedKey = localStorage.getItem(STORAGE_KEYS.SUPABASE_KEY);

    if (!savedUrl || !savedKey) {
      savedUrl = DEFAULT_SUPABASE_URL;
      savedKey = DEFAULT_SUPABASE_KEY;
      localStorage.setItem(STORAGE_KEYS.SUPABASE_URL, savedUrl);
      localStorage.setItem(STORAGE_KEYS.SUPABASE_KEY, savedKey);
    }

    savedUrl = normalizeSupabaseUrl(savedUrl);

    if (savedUrl && savedKey && window.supabase) {
      try {
        this.client = window.supabase.createClient(savedUrl, savedKey);
        this.isLive = true;
      } catch (e) {
        console.warn('Supabase initialization failed, falling back to local simulated database.', e);
        this.isLive = false;
      }
    } else {
      this.isLive = false;
    }

    // Ensure LocalStorage has initial seed data for local/offline simulation
    if (!localStorage.getItem(STORAGE_KEYS.LOCAL_CANDIDATES)) {
      localStorage.setItem(STORAGE_KEYS.LOCAL_CANDIDATES, JSON.stringify(INITIAL_CANDIDATES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LOCAL_VOTERS)) {
      localStorage.setItem(STORAGE_KEYS.LOCAL_VOTERS, JSON.stringify(INITIAL_VOTERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LOCAL_VOTES)) {
      localStorage.setItem(STORAGE_KEYS.LOCAL_VOTES, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN_ACCOUNTS)) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_ACCOUNTS, JSON.stringify(DEFAULT_ADMINS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.HEADER_CONFIG)) {
      localStorage.setItem(STORAGE_KEYS.HEADER_CONFIG, JSON.stringify(DEFAULT_HEADER_CONFIG));
    }
  }

  getConfig() {
    return {
      url: localStorage.getItem(STORAGE_KEYS.SUPABASE_URL) || '',
      key: localStorage.getItem(STORAGE_KEYS.SUPABASE_KEY) || '',
      isLive: this.isLive
    };
  }

  async setConfig(url, key) {
    if (!url || !key) {
      localStorage.removeItem(STORAGE_KEYS.SUPABASE_URL);
      localStorage.removeItem(STORAGE_KEYS.SUPABASE_KEY);
      this.client = null;
      this.isLive = false;
      return { success: true, message: 'Kembali ke mode Simulasi Lokal (Offline).' };
    }

    try {
      if (!window.supabase) {
        throw new Error('Supabase SDK belum terpasang di peramban.');
      }
      const cleanUrl = normalizeSupabaseUrl(url);
      const cleanKey = key.trim();
      const testClient = window.supabase.createClient(cleanUrl, cleanKey);
      
      // Quick test query to candidates table
      const { data, error } = await testClient.from('candidates').select('id').limit(1);
      
      if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
        console.log('Query warning:', error.message);
      }

      localStorage.setItem(STORAGE_KEYS.SUPABASE_URL, cleanUrl);
      localStorage.setItem(STORAGE_KEYS.SUPABASE_KEY, cleanKey);
      this.client = testClient;
      this.isLive = true;

      // Check if candidates are empty, if so, seed them
      if (!error && data && data.length === 0) {
        await this.seedCandidatesToSupabase();
      }

      return { success: true, message: 'Berhasil terhubung ke Supabase Cloud!' };
    } catch (err) {
      console.error('Error connecting to Supabase:', err);
      return { success: false, message: 'Gagal terhubung: ' + err.message };
    }
  }

  async seedCandidatesToSupabase() {
    if (!this.isLive || !this.client) return false;
    try {
      const payload = INITIAL_CANDIDATES.map(c => ({
        kategori: c.kategori,
        nomor_urut: c.nomor_urut,
        nama: c.nama,
        foto_url: c.foto_url,
        visi_misi: c.visi_misi
      }));
      const { error } = await this.client.from('candidates').insert(payload);
      if (error) {
        console.warn('Seeding candidates error:', error.message);
        return false;
      }
      return true;
    } catch (e) {
      console.warn('Exception during seeding:', e);
      return false;
    }
  }

  // Helper to read local data
  _getLocal(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      return [];
    }
  }

  _setLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- CANDIDATES API ---
  async getCandidates() {
    if (this.isLive && this.client) {
      try {
        const { data, error } = await this.client
          .from('candidates')
          .select('*')
          .order('nomor_urut', { ascending: true });
        
        if (!error && data && data.length > 0) {
          return data;
        }

        // If table exists but has 0 candidates, auto-seed and re-query
        if (!error && data && data.length === 0) {
          const seeded = await this.seedCandidatesToSupabase();
          if (seeded) {
            const { data: refreshed } = await this.client
              .from('candidates')
              .select('*')
              .order('nomor_urut', { ascending: true });
            if (refreshed && refreshed.length > 0) return refreshed;
          }
        }
      } catch (err) {
        console.warn('Error fetching candidates from Supabase, using local fallback:', err.message);
      }
    }
    const local = this._getLocal(STORAGE_KEYS.LOCAL_CANDIDATES);
    return local.sort((a, b) => a.nomor_urut - b.nomor_urut);
  }

  async saveCandidate(candidate) {
    if (this.isLive && this.client) {
      try {
        if (candidate.id && !candidate.id.startsWith('c-')) {
          // Update
          const { data, error } = await this.client
            .from('candidates')
            .update({
              kategori: candidate.kategori,
              nama: candidate.nama,
              nomor_urut: parseInt(candidate.nomor_urut),
              foto_url: candidate.foto_url,
              visi_misi: candidate.visi_misi
            })
            .eq('id', candidate.id)
            .select();
          if (error) throw error;
        } else {
          // Insert
          const { data, error } = await this.client
            .from('candidates')
            .insert([{
              kategori: candidate.kategori,
              nama: candidate.nama,
              nomor_urut: parseInt(candidate.nomor_urut),
              foto_url: candidate.foto_url,
              visi_misi: candidate.visi_misi
            }])
            .select();
          if (error) throw error;
        }
      } catch (err) {
        console.warn('Supabase save candidate error, saving locally:', err.message);
      }
    }

    // Always keep local in sync
    const list = this._getLocal(STORAGE_KEYS.LOCAL_CANDIDATES);
    if (candidate.id) {
      const idx = list.findIndex(c => c.id === candidate.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...candidate, nomor_urut: parseInt(candidate.nomor_urut) };
      } else {
        list.push({ ...candidate, id: candidate.id || 'c-' + Date.now(), nomor_urut: parseInt(candidate.nomor_urut) });
      }
    } else {
      list.push({ ...candidate, id: 'c-' + Date.now(), nomor_urut: parseInt(candidate.nomor_urut) });
    }
    this._setLocal(STORAGE_KEYS.LOCAL_CANDIDATES, list);
    return true;
  }

  async deleteCandidate(id) {
    if (this.isLive && this.client) {
      try {
        await this.client.from('candidates').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase delete error:', e);
      }
    }
    const list = this._getLocal(STORAGE_KEYS.LOCAL_CANDIDATES).filter(c => c.id !== id);
    this._setLocal(STORAGE_KEYS.LOCAL_CANDIDATES, list);
    return true;
  }

  // --- VOTERS API ---
  async getVoterByLogin(username, password) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (this.isLive && this.client) {
      try {
        const { data, error } = await this.client
          .from('voters')
          .select('*')
          .ilike('username', cleanUser)
          .eq('password', cleanPass)
          .maybeSingle();
        if (error) throw error;
        if (data) return data;
      } catch (err) {
        console.warn('Supabase voter login query error, checking local:', err.message);
      }
    }

    const voters = this._getLocal(STORAGE_KEYS.LOCAL_VOTERS);
    return voters.find(v => v.username.toLowerCase() === cleanUser && v.password === cleanPass);
  }

  async getVoters(filterClass = 'ALL', search = '', status = 'ALL') {
    let voters = [];
    if (this.isLive && this.client) {
      try {
        let query = this.client.from('voters').select('*').order('nama', { ascending: true });
        if (filterClass && filterClass !== 'ALL') {
          query = query.eq('kelas', filterClass);
        }
        if (status === 'VOTED') {
          query = query.eq('status_voted', true);
        } else if (status === 'NOT_VOTED') {
          query = query.eq('status_voted', false);
        }
        if (search) {
          query = query.or(`nama.ilike.%${search}%,username.ilike.%${search}%`);
        }
        const { data, error } = await query;
        if (!error && data) voters = data;
      } catch (e) {
        console.warn('Supabase getVoters error:', e);
      }
    }

    if (voters.length === 0) {
      voters = this._getLocal(STORAGE_KEYS.LOCAL_VOTERS);
      if (filterClass && filterClass !== 'ALL') {
        voters = voters.filter(v => v.kelas === filterClass);
      }
      if (status === 'VOTED') {
        voters = voters.filter(v => v.status_voted === true);
      } else if (status === 'NOT_VOTED') {
        voters = voters.filter(v => v.status_voted === false);
      }
      if (search) {
        const s = search.toLowerCase();
        voters = voters.filter(v => v.nama.toLowerCase().includes(s) || v.username.toLowerCase().includes(s));
      }
    }
    return voters;
  }

  async addVoter(voter) {
    const newVoter = {
      username: voter.username.trim(),
      password: voter.password.trim(),
      nama: voter.nama.trim(),
      kelas: voter.kelas,
      status_voted: false,
      created_at: new Date().toISOString()
    };

    if (this.isLive && this.client) {
      try {
        const { data, error } = await this.client.from('voters').insert([newVoter]).select();
        if (error) throw error;
        if (data && data[0]) newVoter.id = data[0].id;
      } catch (e) {
        console.warn('Supabase add voter failed, adding locally:', e);
        newVoter.id = 'v-' + Date.now();
      }
    } else {
      newVoter.id = 'v-' + Date.now();
    }

    const list = this._getLocal(STORAGE_KEYS.LOCAL_VOTERS);
    // Replace if exists, or append
    const existingIdx = list.findIndex(v => v.username.toLowerCase() === newVoter.username.toLowerCase());
    if (existingIdx !== -1) {
      list[existingIdx] = { ...list[existingIdx], ...newVoter };
    } else {
      list.push(newVoter);
    }
    this._setLocal(STORAGE_KEYS.LOCAL_VOTERS, list);
    return newVoter;
  }

  async deleteVoter(id) {
    if (this.isLive && this.client) {
      try {
        await this.client.from('votes').delete().eq('voter_id', id);
        await this.client.from('voters').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase delete voter error:', e);
      }
    }
    const list = this._getLocal(STORAGE_KEYS.LOCAL_VOTERS).filter(v => v.id !== id);
    this._setLocal(STORAGE_KEYS.LOCAL_VOTERS, list);
    const votes = this._getLocal(STORAGE_KEYS.LOCAL_VOTES).filter(v => v.voter_id !== id);
    this._setLocal(STORAGE_KEYS.LOCAL_VOTES, votes);
    return true;
  }

  async importBatchVoters(voterList) {
    if (!Array.isArray(voterList) || voterList.length === 0) return { count: 0 };

    const formatted = voterList.map((item, i) => ({
      username: String(item.username || `user_${Date.now()}_${i}`).trim(),
      password: String(item.password || '123').trim(),
      nama: String(item.nama || 'Siswa Molas').trim(),
      kelas: String(item.kelas || '7A').trim(),
      status_voted: false,
      created_at: new Date().toISOString()
    }));

    if (this.isLive && this.client) {
      try {
        const { error } = await this.client.from('voters').upsert(formatted, { onConflict: 'username' });
        if (error) throw error;
      } catch (e) {
        console.warn('Supabase batch upsert error:', e.message);
      }
    }

    // Merge into local
    const current = this._getLocal(STORAGE_KEYS.LOCAL_VOTERS);
    const map = new Map(current.map(v => [v.username.toLowerCase(), v]));
    formatted.forEach((item, idx) => {
      const key = item.username.toLowerCase();
      map.set(key, { ...item, id: map.get(key)?.id || `v-batch-${Date.now()}-${idx}` });
    });

    const merged = Array.from(map.values());
    this._setLocal(STORAGE_KEYS.LOCAL_VOTERS, merged);
    return { count: formatted.length, total: merged.length };
  }

  async generateSample1000Voters() {
    const indonesianNames = [
      'Budi', 'Siti', 'Agus', 'Dewi', 'Reza', 'Putri', 'Dimas', 'Lestari', 'Bagas', 'Anisa',
      'Fajar', 'Nadia', 'Rian', 'Zahra', 'Bayu', 'Tiara', 'Ilham', 'Nurul', 'Arif', 'Maya',
      'Yusuf', 'Aulia', 'Doni', 'Kartika', 'Rizky', 'Syifa', 'Alvin', 'Kusuma', 'Wahyu', 'Rini'
    ];
    const lastNames = [
      'Pratama', 'Saputra', 'Kusuma', 'Wijaya', 'Permana', 'Santoso', 'Utomo', 'Nugroho',
      'Hidayat', 'Wibowo', 'Setiawan', 'Ramadhan', 'Gunawan', 'Suherman', 'Siregar', 'Mahendra'
    ];

    const generated = [];
    const classes = KELAS_OPTIONS.filter(k => k !== 'Guru dan Karyawan'); // 27 classes 7A-9I
    const perClassCount = 36; // 27 * 36 = 972 students
    const teachersCount = 28; // 972 + 28 = 1000 voters total!

    let serial = 1;
    // Generate students
    for (const k of classes) {
      for (let s = 1; s <= perClassCount; s++) {
        const fn = indonesianNames[Math.floor(Math.random() * indonesianNames.length)];
        const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
        const padSerial = String(serial).padStart(4, '0');
        generated.push({
          username: `nisn${padSerial}`,
          password: '123',
          nama: `${fn} ${ln}`,
          kelas: k,
          status_voted: false
        });
        serial++;
      }
    }

    // Generate Teachers & Staff
    for (let t = 1; t <= teachersCount; t++) {
      const fn = indonesianNames[Math.floor(Math.random() * indonesianNames.length)];
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      const padSerial = String(serial).padStart(4, '0');
      generated.push({
        username: `guru${padSerial}`,
        password: '123',
        nama: `${fn} ${ln}, S.Pd.`,
        kelas: 'Guru dan Karyawan',
        status_voted: false
      });
      serial++;
    }

    return await this.importBatchVoters(generated);
  }

  // --- VOTING API ---
  async castVote(voterId, masId, mbakId) {
    const voteRecord = {
      voter_id: voterId,
      candidate_mas_id: masId,
      candidate_mbak_id: mbakId,
      voted_at: new Date().toISOString()
    };

    if (this.isLive && this.client) {
      try {
        // 1. Insert vote
        const { error: voteErr } = await this.client.from('votes').insert([voteRecord]);
        if (voteErr) throw voteErr;
        // 2. Mark voter as voted
        const { error: voterErr } = await this.client
          .from('voters')
          .update({ status_voted: true })
          .eq('id', voterId);
        if (voterErr) throw voterErr;
      } catch (err) {
        console.warn('Supabase castVote error, proceeding with local fallback:', err.message);
      }
    }

    // Update Local Storage
    const localVotes = this._getLocal(STORAGE_KEYS.LOCAL_VOTES);
    localVotes.push({ ...voteRecord, id: 'vote-' + Date.now() });
    this._setLocal(STORAGE_KEYS.LOCAL_VOTES, localVotes);

    const localVoters = this._getLocal(STORAGE_KEYS.LOCAL_VOTERS);
    const vIndex = localVoters.findIndex(v => v.id === voterId);
    if (vIndex !== -1) {
      localVoters[vIndex].status_voted = true;
      this._setLocal(STORAGE_KEYS.LOCAL_VOTERS, localVoters);
    }

    return { success: true, timestamp: voteRecord.voted_at };
  }

  // --- ANALYTICS / STATISTICS API ---
  async getVoteStats() {
    const candidates = await this.getCandidates();
    let voters = [];
    let votes = [];

    if (this.isLive && this.client) {
      try {
        const { data: vData } = await this.client.from('voters').select('id, status_voted, kelas');
        if (vData) voters = vData;
        const { data: voteData } = await this.client.from('votes').select('*');
        if (voteData) votes = voteData;
      } catch (e) {
        console.warn('Error fetching stats from Supabase:', e);
      }
    }

    if (voters.length === 0) {
      voters = this._getLocal(STORAGE_KEYS.LOCAL_VOTERS);
      votes = this._getLocal(STORAGE_KEYS.LOCAL_VOTES);
    }

    const totalVoters = voters.length;
    const votedCount = voters.filter(v => v.status_voted).length;
    const notVotedCount = totalVoters - votedCount;
    const turnoutPercentage = totalVoters > 0 ? ((votedCount / totalVoters) * 100).toFixed(1) : 0;

    // Per-candidate vote counts
    const masCandidates = candidates.filter(c => c.kategori === 'mas');
    const mbakCandidates = candidates.filter(c => c.kategori === 'mbak');

    const masStats = masCandidates.map(c => {
      const count = votes.filter(v => v.candidate_mas_id === c.id).length;
      const pct = votedCount > 0 ? ((count / votedCount) * 100).toFixed(1) : 0;
      return { ...c, votes: count, percentage: pct };
    }).sort((a, b) => b.votes - a.votes);

    const mbakStats = mbakCandidates.map(c => {
      const count = votes.filter(v => v.candidate_mbak_id === c.id).length;
      const pct = votedCount > 0 ? ((count / votedCount) * 100).toFixed(1) : 0;
      return { ...c, votes: count, percentage: pct };
    }).sort((a, b) => b.votes - a.votes);

    // Participation by class
    const classStats = {};
    KELAS_OPTIONS.forEach(k => {
      classStats[k] = { total: 0, voted: 0 };
    });

    voters.forEach(v => {
      const k = v.kelas || 'Lainnya';
      if (!classStats[k]) classStats[k] = { total: 0, voted: 0 };
      classStats[k].total++;
      if (v.status_voted) classStats[k].voted++;
    });

    return {
      totalVoters,
      votedCount,
      notVotedCount,
      turnoutPercentage,
      masStats,
      mbakStats,
      classStats,
      totalVotesSubmitted: votes.length
    };
  }

  async resetAllVotes() {
    if (this.isLive && this.client) {
      try {
        await this.client.from('votes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await this.client.from('voters').update({ status_voted: false }).neq('id', '00000000-0000-0000-0000-000000000000');
      } catch (e) {
        console.warn('Supabase reset error:', e);
      }
    }

    this._setLocal(STORAGE_KEYS.LOCAL_VOTES, []);
    const voters = this._getLocal(STORAGE_KEYS.LOCAL_VOTERS).map(v => ({ ...v, status_voted: false }));
    this._setLocal(STORAGE_KEYS.LOCAL_VOTERS, voters);
    return true;
  }

  async clearAllVoters() {
    if (this.isLive && this.client) {
      try {
        await this.client.from('votes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await this.client.from('voters').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      } catch (e) {
        console.warn('Supabase clear voters error:', e);
      }
    }
    this._setLocal(STORAGE_KEYS.LOCAL_VOTES, []);
    this._setLocal(STORAGE_KEYS.LOCAL_VOTERS, []);
    return true;
  }

  // --- HEADER & SCHOOL IDENTITY CONFIG ---
  getHeaderConfig() {
    try {
      const cfg = JSON.parse(localStorage.getItem(STORAGE_KEYS.HEADER_CONFIG));
      return { ...DEFAULT_HEADER_CONFIG, ...(cfg || {}) };
    } catch (e) {
      return DEFAULT_HEADER_CONFIG;
    }
  }

  saveHeaderConfig(newConfig) {
    const updated = {
      ...this.getHeaderConfig(),
      ...newConfig
    };
    localStorage.setItem(STORAGE_KEYS.HEADER_CONFIG, JSON.stringify(updated));
    return updated;
  }

  resetHeaderConfig() {
    localStorage.setItem(STORAGE_KEYS.HEADER_CONFIG, JSON.stringify(DEFAULT_HEADER_CONFIG));
    return DEFAULT_HEADER_CONFIG;
  }

  // --- ADMIN ACCOUNTS MANAGEMENT ---
  getAdmins() {
    try {
      const admins = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN_ACCOUNTS));
      return Array.isArray(admins) && admins.length > 0 ? admins : DEFAULT_ADMINS;
    } catch (e) {
      return DEFAULT_ADMINS;
    }
  }

  addAdmin({ username, password, nama }) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();
    const cleanNama = (nama || '').trim() || 'Petugas Panitia';

    if (!cleanUser || !cleanPass) {
      throw new Error('Username dan Password admin tidak boleh kosong.');
    }

    const admins = this.getAdmins();
    if (admins.some(a => a.username.toLowerCase() === cleanUser)) {
      throw new Error(`Username admin "${cleanUser}" sudah terdaftar.`);
    }

    const newAdmin = {
      id: 'admin-' + Date.now(),
      username: cleanUser,
      password: cleanPass,
      nama: cleanNama,
      created_at: new Date().toISOString()
    };

    admins.push(newAdmin);
    localStorage.setItem(STORAGE_KEYS.ADMIN_ACCOUNTS, JSON.stringify(admins));
    return newAdmin;
  }

  deleteAdmin(id) {
    let admins = this.getAdmins();
    if (admins.length <= 1) {
      throw new Error('Tidak dapat menghapus admin terakhir. Minimal harus ada 1 akun admin aktif.');
    }
    admins = admins.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ADMIN_ACCOUNTS, JSON.stringify(admins));
    return true;
  }

  verifyAdminCredentials(username, password) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();
    const admins = this.getAdmins();
    return admins.find(a => a.username.toLowerCase() === cleanUser && a.password === cleanPass);
  }

  verifyAnyAdminPassword(password) {
    const cleanPass = (password || '').trim();
    const admins = this.getAdmins();
    return admins.some(a => a.password === cleanPass);
  }
}

export const db = new DatabaseService();
