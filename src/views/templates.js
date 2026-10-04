// View templates for E-Voting Mas dan Mbak Molas 2026 - SMP Negeri 15 Semarang
import { KELAS_OPTIONS, SQL_SCHEMA_SCRIPT } from '../data/seeds.js';

export function renderLandingView() {
  return `
    <div class="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      <!-- Hero Header Section -->
      <div class="text-center space-y-4 pt-2 sm:pt-4">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide uppercase shadow-sm">
          <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-600"></i>
          Pesta Demokrasi Pelajar 2026
        </div>

        <h1 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Pemilihan <span class="text-blue-900">Mas & Mbak</span> <span class="text-amber-600">Molas 2026</span>
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
          SMP Negeri 15 Semarang &bull; Wujudkan Duta Pelajar yang Berkarakter, Berbudi Luhur, Mandiri, dan Menginspirasi.
        </p>

        <!-- LUBER JURDIL Badge -->
        <div class="flex flex-wrap justify-center items-center gap-2 text-xs font-semibold text-slate-500">
          <span class="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Langsung</span>
          <span class="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Umum</span>
          <span class="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Bebas</span>
          <span class="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Rahasia</span>
          <span class="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Jujur</span>
          <span class="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Adil</span>
        </div>
      </div>

      <!-- Main Login & Quick Info Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Login Card -->
        <div class="md:col-span-7 bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold">Bilik Suara Elektronik</h2>
                <p class="text-xs text-blue-200 mt-0.5">Silakan masuk menggunakan akun pemilih Anda</p>
              </div>
              <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <i data-lucide="vote" class="w-5 h-5 text-amber-400"></i>
              </div>
            </div>
          </div>

          <form id="form-voter-login" class="p-6 sm:p-8 space-y-5">
            <div>
              <label for="voter-username" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Username / NISN
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i data-lucide="user" class="w-5 h-5"></i>
                </div>
                <input 
                  type="text" 
                  id="voter-username" 
                  name="username"
                  required 
                  placeholder="Contoh: siswa8c atau nisn0001" 
                  class="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label for="voter-password" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Kata Sandi / PIN
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i data-lucide="lock" class="w-5 h-5"></i>
                </div>
                <input 
                  type="password" 
                  id="voter-password" 
                  name="password"
                  required 
                  placeholder="Masukkan kata sandi (default: 123)" 
                  class="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              id="btn-voter-login"
              class="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-700 hover:from-blue-800 to-indigo-800 hover:to-indigo-900 text-white font-bold text-base shadow-lg shadow-blue-700/25 hover:shadow-blue-700/40 transform active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Masuk & Berikan Hak Suara</span>
              <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>

            <!-- Quick Demo Credentials for Evaluation -->
            <div class="pt-4 border-t border-slate-100">
              <p class="text-xs text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
                <i data-lucide="help-circle" class="w-3.5 h-3.5 text-amber-500"></i> Akun Uji Coba Cepat (Klik untuk mengisi):
              </p>
              <div class="flex flex-wrap gap-2">
                <button type="button" onclick="appState.fillQuickLogin('siswa8c', '123')" class="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md text-xs font-medium text-blue-700 transition">
                  Siswa: 8C (siswa8c)
                </button>
                <button type="button" onclick="appState.fillQuickLogin('siswa7a', '123')" class="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md text-xs font-medium text-blue-700 transition">
                  Siswa: 7A (siswa7a)
                </button>
                <button type="button" onclick="appState.fillQuickLogin('guru01', '123')" class="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md text-xs font-medium text-amber-800 transition">
                  Guru (guru01)
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Right: Information & Instructions -->
        <div class="md:col-span-5 space-y-4">
          
          <!-- Instructions Card -->
          <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md space-y-4">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="info" class="w-4 h-4 text-blue-600"></i>
              Tata Cara Memilih (2 Tahap)
            </h3>
            <ul class="text-xs text-slate-600 space-y-3 font-medium">
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0 text-[10px]">1</span>
                <span>Masuk dengan <strong>Username & Password</strong> yang telah dibagikan panitia kelas.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0 text-[10px]">2</span>
                <span><strong>Tahap 1:</strong> Pilih 1 (satu) dari 9 Kandidat <strong>Mas Molas 2026</strong>.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0 text-[10px]">3</span>
                <span><strong>Tahap 2:</strong> Pilih 1 (satu) dari 9 Kandidat <strong>Mbak Molas 2026</strong>.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0 text-[10px]">4</span>
                <span>Konfirmasi dan kirim suara Anda. Unduh atau simpan bukti tanda terima digital.</span>
              </li>
            </ul>
          </div>

          <!-- Candidates Stats Teaser Card -->
          <div class="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-slate-950 shadow-md space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold uppercase tracking-wider text-amber-950">Peserta Pemilihan</span>
              <span class="bg-amber-900/20 text-slate-950 text-[11px] font-bold px-2 py-0.5 rounded-full">18 Kandidat</span>
            </div>
            <div class="grid grid-cols-2 gap-3 pt-1">
              <div class="bg-white/90 backdrop-blur rounded-xl p-3 border border-amber-200">
                <div class="text-2xl font-black text-blue-900">9</div>
                <div class="text-xs font-bold text-slate-700">Kandidat Mas Molas</div>
              </div>
              <div class="bg-white/90 backdrop-blur rounded-xl p-3 border border-amber-200">
                <div class="text-2xl font-black text-amber-900">9</div>
                <div class="text-xs font-bold text-slate-700">Kandidat Mbak Molas</div>
              </div>
            </div>
            <p class="text-[11px] text-amber-950 font-medium">
              Setiap pemilih memiliki tepat 1 hak suara untuk Mas dan 1 hak suara untuk Mbak.
            </p>
          </div>

          <!-- Admin Entry point link -->
          <div class="text-center pt-2">
            <button onclick="appState.navigate('admin-login')" class="text-xs text-slate-500 hover:text-blue-700 font-semibold underline inline-flex items-center gap-1.5 transition">
              <i data-lucide="shield-alert" class="w-3.5 h-3.5"></i> Masuk Sebagai Panitia / Admin E-Voting
            </button>
          </div>

        </div>

      </div>
    </div>
  `;
}

export function renderVoterStep1View(voter, candidates, selectedMasId) {
  const masCandidates = candidates.filter(c => c.kategori === 'mas');

  return `
    <div class="space-y-6 animate-fade-in max-w-7xl mx-auto">
      
      <!-- Top Voter Identity & Stepper Card -->
      <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg border border-blue-200">
            ${voter.nama.charAt(0)}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-lg sm:text-xl font-bold text-slate-900">${voter.nama}</h2>
              <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                Kelas: ${voter.kelas}
              </span>
            </div>
            <p class="text-xs text-slate-500 font-medium">Status Pemilih: Terverifikasi &bull; DPT Molas 2026</p>
          </div>
        </div>

        <!-- Stepper Visual -->
        <div class="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold">
          <div class="flex items-center gap-2 text-blue-700 font-bold">
            <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
            <span>Mas Molas</span>
          </div>
          <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
          <div class="flex items-center gap-2 text-slate-400">
            <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">2</span>
            <span>Mbak Molas</span>
          </div>
        </div>
      </div>

      <!-- Instruction Banner -->
      <div class="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="bg-amber-400 text-slate-950 text-xs font-extrabold px-2.5 py-0.5 rounded-md uppercase">Tahap 1</span>
            <h3 class="text-lg sm:text-xl font-extrabold tracking-tight">Pilih Kandidat Mas Molas 2026</h3>
          </div>
          <p class="text-xs sm:text-sm text-blue-200 mt-1">
            Pilihlah 1 (satu) dari 9 kandidat Mas Molas di bawah ini dengan menekan tombol <strong>"Pilih Kandidat"</strong>.
          </p>
        </div>
        ${selectedMasId ? `
          <div class="bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i>
            1 Kandidat Dipilih
          </div>
        ` : `
          <div class="bg-amber-400/20 border border-amber-300/30 text-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <i data-lucide="alert-circle" class="w-4 h-4 text-amber-300"></i>
            Belum Memilih
          </div>
        `}
      </div>

      <!-- Candidate Grid (Responsive: 2 cols on Tab Portrait / 3 cols on Desktop) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        ${masCandidates.map(c => {
          const isSelected = selectedMasId === c.id;
          return `
            <div 
              class="group relative bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden flex flex-col shadow-sm hover:shadow-xl ${
                isSelected 
                  ? 'border-blue-600 ring-4 ring-blue-500/20 shadow-blue-500/10' 
                  : 'border-slate-200 hover:border-slate-300'
              }"
            >
              <!-- Card Header / Nomor Urut & Category -->
              <div class="p-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/70">
                <div class="flex items-center gap-2">
                  <span class="w-8 h-8 rounded-xl bg-blue-900 text-amber-300 flex items-center justify-center font-black text-sm shadow">
                    0${c.nomor_urut}
                  </span>
                  <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Kandidat Mas</span>
                </div>
                ${isSelected ? `
                  <span class="inline-flex items-center gap-1 text-xs font-bold bg-blue-600 text-white px-2.5 py-1 rounded-full shadow-sm">
                    <i data-lucide="check" class="w-3.5 h-3.5"></i> Terpilih
                  </span>
                ` : ''}
              </div>

              <!-- Candidate Photo -->
              <div class="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                <img 
                  src="${c.foto_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'}" 
                  alt="${c.nama}"
                  class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div class="absolute bottom-3 left-4 right-4 text-white">
                  <h4 class="font-extrabold text-base sm:text-lg leading-snug drop-shadow">${c.nama}</h4>
                </div>
              </div>

              <!-- Vision & Mission Preview Body -->
              <div class="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div class="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  ${c.visi_misi ? c.visi_misi.replace(/\n/g, '<br>') : 'Visi misi belum diisi.'}
                </div>

                <div class="space-y-2 pt-2 border-t border-slate-100">
                  <button 
                    type="button"
                    onclick="appState.openCandidateDetailModal('${c.id}')"
                    class="w-full text-center text-xs font-semibold text-blue-700 hover:text-blue-900 py-1.5 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-1"
                  >
                    <i data-lucide="book-open" class="w-3.5 h-3.5"></i> Baca Visi & Misi Lengkap
                  </button>

                  <button 
                    type="button"
                    onclick="appState.selectCandidateMas('${c.id}')"
                    class="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30' 
                        : 'bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-200'
                    }"
                  >
                    ${isSelected ? `
                      <i data-lucide="check-circle" class="w-4 h-4"></i>
                      <span>Kandidat Dipilih (Klik Batal)</span>
                    ` : `
                      <i data-lucide="square" class="w-4 h-4 opacity-50"></i>
                      <span>Pilih Kandidat Ini</span>
                    `}
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Bottom Sticky Action Bar -->
      <div class="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl ${selectedMasId ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'} flex items-center justify-center font-bold">
            <i data-lucide="${selectedMasId ? 'check' : 'help-circle'}" class="w-5 h-5"></i>
          </div>
          <div>
            <p class="text-xs text-slate-500 font-medium">Pilihan Mas Molas Saat Ini:</p>
            <p class="text-sm font-bold text-slate-900">
              ${selectedMasId ? (masCandidates.find(c => c.id === selectedMasId)?.nama || 'Kandidat Terpilih') : 'Belum Ada yang Dipilih'}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto">
          <button 
            type="button"
            onclick="appState.logoutVoter()"
            class="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition"
          >
            Batal & Keluar
          </button>

          <button 
            type="button"
            onclick="appState.goToStep2()"
            ${!selectedMasId ? 'disabled' : ''}
            class="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
              selectedMasId 
                ? 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white shadow-blue-600/30 cursor-pointer' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }"
          >
            <span>Lanjut ke Pemilihan Mbak Molas</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

    </div>
  `;
}

export function renderVoterStep2View(voter, candidates, selectedMasId, selectedMbakId) {
  const masCandidate = candidates.find(c => c.id === selectedMasId);
  const mbakCandidates = candidates.filter(c => c.kategori === 'mbak');

  return `
    <div class="space-y-6 animate-fade-in max-w-7xl mx-auto">
      
      <!-- Top Voter Identity & Stepper Card -->
      <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg border border-amber-200">
            ${voter.nama.charAt(0)}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-lg sm:text-xl font-bold text-slate-900">${voter.nama}</h2>
              <span class="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                Kelas: ${voter.kelas}
              </span>
            </div>
            <p class="text-xs text-slate-500 font-medium">Status Pemilih: Terverifikasi &bull; DPT Molas 2026</p>
          </div>
        </div>

        <!-- Stepper Visual -->
        <div class="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold">
          <div class="flex items-center gap-2 text-emerald-600 font-bold">
            <span class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
              <i data-lucide="check" class="w-3.5 h-3.5"></i>
            </span>
            <span class="line-through opacity-70">Mas Molas</span>
          </div>
          <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
          <div class="flex items-center gap-2 text-amber-700 font-bold">
            <span class="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">2</span>
            <span>Mbak Molas</span>
          </div>
        </div>
      </div>

      <!-- Current Selected Mas Summary Banner -->
      <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-800">
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <div class="w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0">
            <img src="${masCandidate?.foto_url || ''}" alt="${masCandidate?.nama}" class="w-full h-full object-cover">
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">Mas Terpilih</span>
              <span class="text-amber-300 font-bold text-xs">Nomor Urut 0${masCandidate?.nomor_urut}</span>
            </div>
            <h4 class="font-extrabold text-sm sm:text-base text-white mt-0.5">${masCandidate?.nama || '-'}</h4>
          </div>
        </div>
        <button 
          type="button" 
          onclick="appState.goToStep1()" 
          class="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white text-xs font-bold border border-white/20 flex items-center justify-center gap-1.5 transition"
        >
          <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Ubah Pilihan Mas Molas
        </button>
      </div>

      <!-- Instruction Banner Step 2 -->
      <div class="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="bg-slate-900 text-amber-300 text-xs font-extrabold px-2.5 py-0.5 rounded-md uppercase">Tahap 2</span>
            <h3 class="text-lg sm:text-xl font-extrabold tracking-tight">Pilih Kandidat Mbak Molas 2026</h3>
          </div>
          <p class="text-xs sm:text-sm text-amber-100 mt-1">
            Pilihlah 1 (satu) dari 9 kandidat Mbak Molas di bawah ini untuk melengkapi pasangan Duta Pelajar Molas 2026.
          </p>
        </div>
        ${selectedMbakId ? `
          <div class="bg-emerald-500/20 border border-emerald-400/30 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-300"></i>
            1 Kandidat Dipilih
          </div>
        ` : `
          <div class="bg-white/20 border border-white/30 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <i data-lucide="alert-circle" class="w-4 h-4 text-white"></i>
            Belum Memilih
          </div>
        `}
      </div>

      <!-- Candidate Grid Mbak (Responsive: 2 cols on Tab Portrait / 3 cols on Desktop) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        ${mbakCandidates.map(c => {
          const isSelected = selectedMbakId === c.id;
          return `
            <div 
              class="group relative bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden flex flex-col shadow-sm hover:shadow-xl ${
                isSelected 
                  ? 'border-amber-500 ring-4 ring-amber-500/20 shadow-amber-500/10' 
                  : 'border-slate-200 hover:border-slate-300'
              }"
            >
              <!-- Card Header / Nomor Urut & Category -->
              <div class="p-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/70">
                <div class="flex items-center gap-2">
                  <span class="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-sm shadow">
                    0${c.nomor_urut}
                  </span>
                  <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Kandidat Mbak</span>
                </div>
                ${isSelected ? `
                  <span class="inline-flex items-center gap-1 text-xs font-bold bg-amber-600 text-white px-2.5 py-1 rounded-full shadow-sm">
                    <i data-lucide="check" class="w-3.5 h-3.5"></i> Terpilih
                  </span>
                ` : ''}
              </div>

              <!-- Candidate Photo -->
              <div class="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                <img 
                  src="${c.foto_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}" 
                  alt="${c.nama}"
                  class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div class="absolute bottom-3 left-4 right-4 text-white">
                  <h4 class="font-extrabold text-base sm:text-lg leading-snug drop-shadow">${c.nama}</h4>
                </div>
              </div>

              <!-- Vision & Mission Preview Body -->
              <div class="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div class="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  ${c.visi_misi ? c.visi_misi.replace(/\n/g, '<br>') : 'Visi misi belum diisi.'}
                </div>

                <div class="space-y-2 pt-2 border-t border-slate-100">
                  <button 
                    type="button"
                    onclick="appState.openCandidateDetailModal('${c.id}')"
                    class="w-full text-center text-xs font-semibold text-amber-700 hover:text-amber-900 py-1.5 rounded-lg hover:bg-amber-50 transition flex items-center justify-center gap-1"
                  >
                    <i data-lucide="book-open" class="w-3.5 h-3.5"></i> Baca Visi & Misi Lengkap
                  </button>

                  <button 
                    type="button"
                    onclick="appState.selectCandidateMbak('${c.id}')"
                    class="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                      isSelected 
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/30' 
                        : 'bg-slate-100 hover:bg-amber-50 text-slate-800 hover:text-amber-800 border border-slate-200 hover:border-amber-200'
                    }"
                  >
                    ${isSelected ? `
                      <i data-lucide="check-circle" class="w-4 h-4"></i>
                      <span>Kandidat Dipilih (Klik Batal)</span>
                    ` : `
                      <i data-lucide="square" class="w-4 h-4 opacity-50"></i>
                      <span>Pilih Kandidat Ini</span>
                    `}
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Bottom Sticky Action Bar -->
      <div class="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <button 
            type="button"
            onclick="appState.goToStep1()"
            class="p-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
            title="Kembali ke Step 1"
          >
            <i data-lucide="arrow-left" class="w-5 h-5"></i>
          </button>
          <div>
            <p class="text-xs text-slate-500 font-medium">Pilihan Mbak Molas:</p>
            <p class="text-sm font-bold text-slate-900">
              ${selectedMbakId ? (mbakCandidates.find(c => c.id === selectedMbakId)?.nama || 'Kandidat Terpilih') : 'Belum Ada yang Dipilih'}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto">
          <button 
            type="button"
            onclick="appState.openConfirmVoteModal()"
            ${!selectedMbakId ? 'disabled' : ''}
            class="flex-1 sm:flex-none px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
              selectedMbakId 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-emerald-600/30 cursor-pointer active:scale-95' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }"
          >
            <i data-lucide="check-check" class="w-5 h-5"></i>
            <span>Kirim & Selesai Vote</span>
          </button>
        </div>
      </div>

    </div>
  `;
}

export function renderThankYouView(voter, masCandidate, mbakCandidate, timestamp) {
  const dateFormatted = new Date(timestamp || Date.now()).toLocaleString('id-ID', {
    dateStyle: 'full',
    timeStyle: 'medium'
  });
  const receiptCode = 'MOLAS-' + (Math.random().toString(36).substring(2, 9).toUpperCase()) + '-' + new Date().getFullYear();

  return `
    <div class="max-w-2xl mx-auto space-y-6 py-6 animate-fade-in">
      
      <!-- Thank You Celebration Box -->
      <div class="text-center space-y-3">
        <div class="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border-2 border-emerald-300">
          <i data-lucide="check" class="w-10 h-10 stroke-[3]"></i>
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Terima Kasih Atas Partisipasi Anda!
        </h2>
        <p class="text-sm text-slate-600 font-medium">
          Hak suara Anda telah berhasil disimpan secara rahasia dan aman di sistem E-Voting SMP Negeri 15 Semarang.
        </p>
      </div>

      <!-- Digital Voting Receipt / Bukti Memilih -->
      <div class="bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden print-area">
        
        <!-- Header Receipt -->
        <div class="bg-gradient-to-r from-blue-900 to-slate-900 p-6 text-white text-center relative border-b-4 border-amber-500">
          <div class="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full mb-2">
            Bukti Hak Suara Digital (Receipt)
          </div>
          <h3 class="text-lg font-bold">PEMILIHAN MAS & MBAK MOLAS 2026</h3>
          <p class="text-xs text-blue-200">SMP NEGERI 15 SEMARANG</p>
        </div>

        <div class="p-6 sm:p-8 space-y-6">
          
          <!-- Voter Identity -->
          <div class="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
            <div>
              <span class="text-slate-400 uppercase font-bold tracking-wider text-[10px]">Nama Pemilih</span>
              <p class="text-sm font-bold text-slate-900 mt-0.5">${voter.nama}</p>
            </div>
            <div>
              <span class="text-slate-400 uppercase font-bold tracking-wider text-[10px]">Kelas</span>
              <p class="text-sm font-bold text-blue-700 mt-0.5">${voter.kelas}</p>
            </div>
            <div>
              <span class="text-slate-400 uppercase font-bold tracking-wider text-[10px]">Waktu Pemilihan</span>
              <p class="font-medium text-slate-800 mt-0.5">${dateFormatted}</p>
            </div>
            <div>
              <span class="text-slate-400 uppercase font-bold tracking-wider text-[10px]">Kode Verifikasi</span>
              <p class="font-mono font-bold text-slate-900 mt-0.5">${receiptCode}</p>
            </div>
          </div>

          <!-- Secret Vote Summary / Sealed Confirmation -->
          <div class="border border-dashed border-slate-300 rounded-2xl p-5 space-y-3 bg-blue-50/30">
            <div class="flex items-center gap-2 text-xs font-bold text-blue-900">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
              <span>Ringkasan Hak Suara (Terkunci & Sah)</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div class="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                <div class="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                  <img src="${masCandidate?.foto_url || ''}" alt="Mas" class="w-full h-full object-cover">
                </div>
                <div>
                  <span class="text-[10px] uppercase font-bold text-blue-600">Mas Molas 2026</span>
                  <p class="text-xs font-bold text-slate-900">0${masCandidate?.nomor_urut}. ${masCandidate?.nama}</p>
                </div>
              </div>

              <div class="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                <div class="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                  <img src="${mbakCandidate?.foto_url || ''}" alt="Mbak" class="w-full h-full object-cover">
                </div>
                <div>
                  <span class="text-[10px] uppercase font-bold text-amber-600">Mbak Molas 2026</span>
                  <p class="text-xs font-bold text-slate-900">0${mbakCandidate?.nomor_urut}. ${mbakCandidate?.nama}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Barcode Mockup for Legitimacy -->
          <div class="text-center pt-2">
            <div class="h-10 max-w-xs mx-auto bg-slate-800 rounded flex items-center justify-between px-3 py-1 font-mono text-[9px] text-slate-300 tracking-[0.3em] overflow-hidden opacity-85 select-none">
              ||| | |||| | ||||| || ||| |||| | ||| ||
            </div>
            <p class="text-[10px] text-slate-400 mt-1 font-mono">${receiptCode}</p>
          </div>

        </div>

        <!-- Receipt Footer Buttons -->
        <div class="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <button 
            type="button" 
            onclick="window.print()" 
            class="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-200/80 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <i data-lucide="printer" class="w-4 h-4"></i> Cetak Tanda Terima
          </button>

          <button 
            type="button" 
            onclick="appState.logoutVoter()" 
            class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition shadow flex items-center justify-center gap-2 cursor-pointer"
          >
            <i data-lucide="log-out" class="w-4 h-4"></i> Selesai & Keluar Akun
          </button>
        </div>

      </div>

    </div>
  `;
}

export function renderAdminLoginView() {
  return `
    <div class="max-w-md mx-auto py-8 animate-fade-in space-y-6">
      <div class="text-center space-y-2">
        <div class="w-14 h-14 bg-slate-900 text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-md border-2 border-amber-400">
          <i data-lucide="lock" class="w-7 h-7"></i>
        </div>
        <h2 class="text-2xl font-black text-slate-900">Login Administrator</h2>
        <p class="text-xs text-slate-600 font-medium">Panel Kendali Panitia Pemilihan Mas & Mbak Molas 2026</p>
      </div>

      <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200">
        <form id="form-admin-login" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Username Admin
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <i data-lucide="shield" class="w-4 h-4"></i>
              </span>
              <input 
                type="text" 
                id="admin-username" 
                required 
                placeholder="admin" 
                class="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Password Admin
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <i data-lucide="key" class="w-4 h-4"></i>
              </span>
              <input 
                type="password" 
                id="admin-password" 
                required 
                placeholder="adminmolas2026" 
                class="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
            <p class="text-[11px] text-slate-400 mt-1">Default kredensial: <span class="font-mono text-slate-600 font-bold">admin</span> / <span class="font-mono text-slate-600 font-bold">adminmolas2026</span></p>
          </div>

          <button 
            type="submit" 
            class="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Masuk Dashboard Admin</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </form>

        <div class="mt-6 pt-4 border-t border-slate-100 text-center">
          <button 
            type="button" 
            onclick="appState.navigate('landing')" 
            class="text-xs text-blue-600 hover:text-blue-800 font-semibold underline flex items-center justify-center gap-1 mx-auto"
          >
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Kembali ke Halaman Pemilih
          </button>
        </div>
      </div>
    </div>
  `;
}

export function renderAdminDashboardView(activeTab = 'analytics', stats, voters, candidates, filters = {}) {
  return `
    <div class="space-y-6 animate-fade-in max-w-7xl mx-auto">
      
      <!-- Top Admin Header -->
      <div class="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border-b-4 border-amber-500 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <i data-lucide="layout-dashboard" class="w-6 h-6"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-xl sm:text-2xl font-black">Admin Panel E-Voting Molas 2026</h2>
              <span class="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-400/30">Superadmin</span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">Pusat Kendali DPT, Manajemen Kandidat, dan Quick Count Suara</p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button 
            onclick="appState.navigate('landing')" 
            class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center gap-1.5"
          >
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Lihat Layar Pemilih
          </button>
          <button 
            onclick="appState.logoutAdmin()" 
            class="px-3.5 py-2 bg-red-600/90 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
          >
            <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Keluar
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200 flex flex-wrap gap-1">
        <button 
          onclick="appState.switchAdminTab('analytics')" 
          class="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'analytics' 
              ? 'bg-blue-900 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-100'
          }"
        >
          <i data-lucide="bar-chart-3" class="w-4 h-4"></i>
          <span>Rekap Hasil Suara</span>
        </button>

        <button 
          onclick="appState.switchAdminTab('voters')" 
          class="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'voters' 
              ? 'bg-blue-900 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-100'
          }"
        >
          <i data-lucide="users" class="w-4 h-4"></i>
          <span>Pemantauan DPT</span>
        </button>

        <button 
          onclick="appState.switchAdminTab('candidates')" 
          class="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'candidates' 
              ? 'bg-blue-900 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-100'
          }"
        >
          <i data-lucide="award" class="w-4 h-4"></i>
          <span>Kandidat (18)</span>
        </button>

        <button 
          onclick="appState.switchAdminTab('excel')" 
          class="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'excel' 
              ? 'bg-blue-900 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-100'
          }"
        >
          <i data-lucide="file-spreadsheet" class="w-4 h-4"></i>
          <span>Impor Excel & Batch</span>
        </button>

        <button 
          onclick="appState.switchAdminTab('supabase')" 
          class="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'supabase' 
              ? 'bg-blue-900 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-100'
          }"
        >
          <i data-lucide="database" class="w-4 h-4"></i>
          <span>Supabase & SQL</span>
        </button>

        <button 
          onclick="appState.switchAdminTab('settings')" 
          class="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'settings' 
              ? 'bg-blue-900 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-100'
          }"
        >
          <i data-lucide="settings" class="w-4 h-4"></i>
          <span>Identitas & Admin</span>
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="admin-tab-content">
        ${renderAdminTabBody(activeTab, stats, voters, candidates, filters)}
      </div>

    </div>
  `;
}

function renderAdminTabBody(activeTab, stats, voters, candidates, filters) {
  if (activeTab === 'analytics') {
    return renderAnalyticsTab(stats);
  } else if (activeTab === 'voters') {
    return renderVotersMonitoringTab(voters, filters, stats);
  } else if (activeTab === 'candidates') {
    return renderCandidatesManagementTab(candidates);
  } else if (activeTab === 'excel') {
    return renderExcelManagementTab(stats);
  } else if (activeTab === 'supabase') {
    return renderSupabaseConfigTab();
  } else if (activeTab === 'settings') {
    return renderSettingsTab();
  }
  return '';
}

// 1. REKAP HASIL SUARA TAB
function renderAnalyticsTab(stats) {
  return `
    <div class="space-y-6">
      
      <!-- Statistics KPI Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-slate-500">Total DPT</span>
            <span class="p-2 rounded-xl bg-blue-50 text-blue-700"><i data-lucide="users" class="w-4 h-4"></i></span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-2">${stats.totalVoters}</div>
          <p class="text-[11px] text-slate-500 mt-1 font-medium">Pemilih terdaftar</p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-emerald-600">Sudah Memilih</span>
            <span class="p-2 rounded-xl bg-emerald-50 text-emerald-700"><i data-lucide="check-circle" class="w-4 h-4"></i></span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">${stats.votedCount}</div>
          <p class="text-[11px] text-slate-500 mt-1 font-medium">Suara sah masuk</p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-amber-600">Belum Memilih</span>
            <span class="p-2 rounded-xl bg-amber-50 text-amber-700"><i data-lucide="clock" class="w-4 h-4"></i></span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-amber-600 mt-2">${stats.notVotedCount}</div>
          <p class="text-[11px] text-slate-500 mt-1 font-medium">Menunggu giliran</p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-indigo-600">Partisipasi</span>
            <span class="p-2 rounded-xl bg-indigo-50 text-indigo-700"><i data-lucide="percent" class="w-4 h-4"></i></span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-indigo-600 mt-2">${stats.turnoutPercentage}%</div>
          <div class="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-indigo-600 h-full rounded-full transition-all duration-500" style="width: ${stats.turnoutPercentage}%"></div>
          </div>
        </div>
      </div>

      <!-- Action Buttons (Refresh & Print) -->
      <div class="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span class="text-xs font-bold text-slate-800">Quick Count Live Monitor</span>
          <span class="text-xs text-slate-400">| Diperbarui otomatis saat suara masuk</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="appState.refreshDashboard()" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition flex items-center gap-1">
            <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i> Refresh
          </button>
          <button onclick="window.print()" class="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 rounded-xl text-xs font-bold text-white transition flex items-center gap-1">
            <i data-lucide="printer" class="w-3.5 h-3.5"></i> Cetak Berita Acara
          </button>
        </div>
      </div>

      <!-- Charts Section: Mas & Mbak Bar Charts & Doughnut -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Mas Molas Bar Chart -->
        <div class="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 class="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-blue-600"></span>
                Perolehan Suara Mas Molas 2026
              </h3>
              <p class="text-xs text-slate-500">Diagram Batang 9 Kandidat Mas Molas</p>
            </div>
          </div>
          <div class="h-64 sm:h-72 w-full relative">
            <canvas id="chart-mas"></canvas>
          </div>
        </div>

        <!-- Doughnut Partisipasi -->
        <div class="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div class="border-b border-slate-100 pb-3">
            <h3 class="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
              Distribusi Partisipasi
            </h3>
            <p class="text-xs text-slate-500">Sudah vs Belum Memilih</p>
          </div>
          <div class="h-56 w-full relative flex items-center justify-center">
            <canvas id="chart-turnout"></canvas>
          </div>
          <div class="text-center text-xs text-slate-500 font-medium">
            Tingkat Partisipasi: <strong class="text-slate-900">${stats.turnoutPercentage}%</strong> dari ${stats.totalVoters} DPT
          </div>
        </div>

        <!-- Mbak Molas Bar Chart -->
        <div class="lg:col-span-12 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 class="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-amber-500"></span>
                Perolehan Suara Mbak Molas 2026
              </h3>
              <p class="text-xs text-slate-500">Diagram Batang 9 Kandidat Mbak Molas</p>
            </div>
          </div>
          <div class="h-64 sm:h-72 w-full relative">
            <canvas id="chart-mbak"></canvas>
          </div>
        </div>

      </div>

      <!-- Detail Tables: Mas & Mbak Results Table -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Mas Table -->
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div class="bg-blue-900 p-4 text-white flex items-center justify-between">
            <h4 class="font-bold text-sm">Klasemen Suara Mas Molas</h4>
            <span class="text-xs text-blue-200 font-medium">${stats.votedCount} Total Suara</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th class="p-3">No</th>
                  <th class="p-3">Nama Kandidat</th>
                  <th class="p-3 text-right">Suara</th>
                  <th class="p-3 text-right">Persentase</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium">
                ${stats.masStats.map((c, idx) => `
                  <tr class="${idx === 0 ? 'bg-amber-50/60 font-bold text-slate-900' : 'hover:bg-slate-50'}">
                    <td class="p-3">
                      <span class="w-6 h-6 rounded-lg ${idx === 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700'} inline-flex items-center justify-center font-bold">
                        0${c.nomor_urut}
                      </span>
                    </td>
                    <td class="p-3">
                      <div class="flex items-center gap-2">
                        <img src="${c.foto_url || ''}" class="w-6 h-6 rounded-full object-cover">
                        <span>${c.nama}</span>
                        ${idx === 0 ? '<span class="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-black">Unggul</span>' : ''}
                      </div>
                    </td>
                    <td class="p-3 text-right font-bold">${c.votes}</td>
                    <td class="p-3 text-right text-blue-700 font-bold">${c.percentage}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Mbak Table -->
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div class="bg-amber-600 p-4 text-white flex items-center justify-between">
            <h4 class="font-bold text-sm">Klasemen Suara Mbak Molas</h4>
            <span class="text-xs text-amber-100 font-medium">${stats.votedCount} Total Suara</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th class="p-3">No</th>
                  <th class="p-3">Nama Kandidat</th>
                  <th class="p-3 text-right">Suara</th>
                  <th class="p-3 text-right">Persentase</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium">
                ${stats.mbakStats.map((c, idx) => `
                  <tr class="${idx === 0 ? 'bg-amber-50/60 font-bold text-slate-900' : 'hover:bg-slate-50'}">
                    <td class="p-3">
                      <span class="w-6 h-6 rounded-lg ${idx === 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700'} inline-flex items-center justify-center font-bold">
                        0${c.nomor_urut}
                      </span>
                    </td>
                    <td class="p-3">
                      <div class="flex items-center gap-2">
                        <img src="${c.foto_url || ''}" class="w-6 h-6 rounded-full object-cover">
                        <span>${c.nama}</span>
                        ${idx === 0 ? '<span class="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-black">Unggul</span>' : ''}
                      </div>
                    </td>
                    <td class="p-3 text-right font-bold">${c.votes}</td>
                    <td class="p-3 text-right text-amber-700 font-bold">${c.percentage}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  `;
}

// 2. PEMANTAUAN DPT TAB
function renderVotersMonitoringTab(voters, filters, stats) {
  const currentClass = filters.kelas || 'ALL';
  const currentStatus = filters.status || 'ALL';
  const currentSearch = filters.search || '';

  return `
    <div class="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-sm">
      
      <!-- Top Filters & Search -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 class="font-bold text-base text-slate-900">Daftar Pemilih Tetap (DPT)</h3>
          <p class="text-xs text-slate-500">Total ditemukan: <strong>${voters.length} pemilih</strong></p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <!-- Class Filter Dropdown -->
          <select 
            id="filter-class-select" 
            onchange="appState.updateVoterFilter('kelas', this.value)"
            class="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="ALL" ${currentClass === 'ALL' ? 'selected' : ''}>Semua Kelas (28 Kategori)</option>
            ${KELAS_OPTIONS.map(k => `
              <option value="${k}" ${currentClass === k ? 'selected' : ''}>Kelas ${k}</option>
            `).join('')}
          </select>

          <!-- Status Filter -->
          <select 
            id="filter-status-select" 
            onchange="appState.updateVoterFilter('status', this.value)"
            class="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="ALL" ${currentStatus === 'ALL' ? 'selected' : ''}>Semua Status</option>
            <option value="VOTED" ${currentStatus === 'VOTED' ? 'selected' : ''}>Sudah Memilih</option>
            <option value="NOT_VOTED" ${currentStatus === 'NOT_VOTED' ? 'selected' : ''}>Belum Memilih</option>
          </select>

          <!-- Search Input -->
          <div class="relative">
            <input 
              type="text" 
              placeholder="Cari nama / username..." 
              value="${currentSearch}"
              oninput="appState.updateVoterFilter('search', this.value)"
              class="pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 w-44 sm:w-56"
            />
            <span class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </span>
          </div>

          <!-- Export Excel Button -->
          <button 
            type="button" 
            onclick="appState.exportCurrentVotersExcel()" 
            class="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <i data-lucide="download" class="w-3.5 h-3.5"></i> Export Excel
          </button>

          <!-- Hapus Semua DPT Button (Requires Password) -->
          <button 
            type="button" 
            onclick="appState.promptDeleteAllVoters()" 
            class="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            title="Hapus seluruh data pemilih (memerlukan kata sandi admin)"
          >
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Hapus Semua DPT
          </button>
        </div>
      </div>

      <!-- Manual Add Single Voter Form Accordion -->
      <details class="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
        <summary class="font-bold text-slate-700 cursor-pointer flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <i data-lucide="user-plus" class="w-4 h-4 text-blue-600"></i> + Tambah Pemilih Tunggal Manual
          </span>
          <span class="text-blue-600">Buka Form</span>
        </summary>
        <form id="form-manual-voter" class="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-3 pt-3 border-t border-slate-200">
          <div>
            <label class="block font-bold text-slate-600 mb-1">Username / NISN</label>
            <input type="text" id="manual-user" required placeholder="nisn1001" class="w-full p-2 bg-white border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-slate-600 mb-1">Kata Sandi</label>
            <input type="text" id="manual-pass" required value="123" class="w-full p-2 bg-white border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-slate-600 mb-1">Nama Lengkap</label>
            <input type="text" id="manual-nama" required placeholder="Nama Siswa" class="w-full p-2 bg-white border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-slate-600 mb-1">Kelas</label>
            <div class="flex gap-2">
              <select id="manual-kelas" class="w-full p-2 bg-white border border-slate-300 rounded-lg">
                ${KELAS_OPTIONS.map(k => `<option value="${k}">${k}</option>`).join('')}
              </select>
              <button type="submit" class="px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shrink-0">Simpan</button>
            </div>
          </div>
        </form>
      </details>

      <!-- Table Voters -->
      <div class="overflow-x-auto border border-slate-200 rounded-xl">
        <table class="w-full text-xs text-left">
          <thead class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-3 w-12 text-center">No</th>
              <th class="p-3">Username / NISN</th>
              <th class="p-3">Nama Lengkap</th>
              <th class="p-3">Kelas</th>
              <th class="p-3 text-center">Status Vote</th>
              <th class="p-3 text-right">Aksi Cepat</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 font-medium">
            ${voters.length === 0 ? `
              <tr>
                <td colspan="6" class="p-8 text-center text-slate-400">
                  Tidak ada data pemilih yang sesuai kriteria pencarian/filter.
                </td>
              </tr>
            ` : voters.slice(0, 150).map((v, idx) => `
              <tr class="hover:bg-slate-50 transition">
                <td class="p-3 text-center text-slate-400 font-mono">${idx + 1}</td>
                <td class="p-3 font-mono font-bold text-slate-800">${v.username}</td>
                <td class="p-3 font-bold text-slate-900">${v.nama}</td>
                <td class="p-3">
                  <span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">${v.kelas}</span>
                </td>
                <td class="p-3 text-center">
                  ${v.status_voted ? `
                    <span class="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <i data-lucide="check-circle-2" class="w-3 h-3 text-emerald-600"></i> Sudah Memilih
                    </span>
                  ` : `
                    <span class="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                      Belum Memilih
                    </span>
                  `}
                </td>
                <td class="p-3 text-right">
                  <div class="flex items-center justify-end gap-1.5">
                    <button 
                      onclick="appState.fillQuickLogin('${v.username}', '${v.password}'); appState.navigate('landing')" 
                      class="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded text-[11px] transition"
                      title="Uji coba login akun ini"
                    >
                      Simulasi Login
                    </button>
                    <button 
                      onclick="appState.deleteSingleVoter('${v.id}', '${(v.nama || '').replace(/'/g, "\\'")}')" 
                      class="p-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                      title="Hapus pemilih ini dari DPT"
                    >
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      ${voters.length > 150 ? `
        <p class="text-xs text-slate-400 text-center font-medium">Menampilkan 150 pemilih pertama dari ${voters.length} data. Gunakan filter kelas atau unduh Excel untuk melihat seluruhnya.</p>
      ` : ''}

    </div>
  `;
}

// 3. MANAJEMEN KANDIDAT TAB
function renderCandidatesManagementTab(candidates) {
  const masList = candidates.filter(c => c.kategori === 'mas');
  const mbakList = candidates.filter(c => c.kategori === 'mbak');

  return `
    <div class="space-y-6">
      
      <!-- Top Action Bar -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 class="font-bold text-base text-slate-900">Daftar Kandidat Duta Pelajar (18 Pasangan)</h3>
          <p class="text-xs text-slate-500">Edit data profil, foto, nomor urut, dan visi misi kandidat Mas & Mbak Molas 2026</p>
        </div>
        <button 
          onclick="appState.openCandidateFormModal()" 
          class="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
        >
          <i data-lucide="plus" class="w-4 h-4"></i> Tambah Kandidat Baru
        </button>
      </div>

      <!-- Mas Candidates Section -->
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-blue-600"></span>
          <h4 class="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Kandidat Mas Molas 2026 (9 Siswa)</h4>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${masList.map(c => renderCandidateAdminCard(c)).join('')}
        </div>
      </div>

      <!-- Mbak Candidates Section -->
      <div class="space-y-3 pt-4 border-t border-slate-200">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-amber-500"></span>
          <h4 class="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Kandidat Mbak Molas 2026 (9 Siswi)</h4>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${mbakList.map(c => renderCandidateAdminCard(c)).join('')}
        </div>
      </div>

    </div>
  `;
}

function renderCandidateAdminCard(c) {
  const isMas = c.kategori === 'mas';
  return `
    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
      <div>
        <div class="relative aspect-[16/10] bg-slate-100 overflow-hidden">
          <img src="${c.foto_url || ''}" alt="${c.nama}" class="w-full h-full object-cover">
          <div class="absolute top-2 left-2">
            <span class="w-7 h-7 rounded-lg ${isMas ? 'bg-blue-900 text-amber-300' : 'bg-amber-600 text-white'} flex items-center justify-center font-black text-xs shadow">
              0${c.nomor_urut}
            </span>
          </div>
          <div class="absolute bottom-2 left-2 right-2 bg-slate-950/70 backdrop-blur rounded-lg p-2 text-white">
            <h5 class="font-bold text-xs leading-tight">${c.nama}</h5>
          </div>
        </div>

        <div class="p-4 space-y-2">
          <p class="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
            ${c.visi_misi || 'Belum ada visi misi.'}
          </p>
        </div>
      </div>

      <div class="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
        <button 
          onclick="appState.openCandidateDetailModal('${c.id}')" 
          class="text-xs text-blue-700 hover:text-blue-900 font-semibold"
        >
          Lihat Visi Misi
        </button>
        <div class="flex items-center gap-1">
          <button 
            onclick="appState.openCandidateFormModal('${c.id}')" 
            class="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition"
            title="Edit Kandidat"
          >
            <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
          </button>
          <button 
            onclick="appState.deleteCandidate('${c.id}')" 
            class="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition"
            title="Hapus Kandidat"
          >
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// 4. IMPOR EXCEL & DATA BATCH TAB
function renderExcelManagementTab(stats) {
  return `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <!-- Excel Upload & Template Card -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <h3 class="font-bold text-lg text-slate-900 flex items-center gap-2">
            <i data-lucide="file-spreadsheet" class="w-5 h-5 text-emerald-600"></i>
            Impor Batch Data Pemilih (Excel / SheetJS)
          </h3>
          <p class="text-xs text-slate-500 mt-1">
            Unggah berkas Excel (.xlsx / .csv) berisi data pemilih (hingga 1000+ pemilih siswa & guru). Sistem akan memproses dan memasukkan otomatis ke database.
          </p>
        </div>

        <!-- Download Template Button -->
        <div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-200 gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <i data-lucide="file-text" class="w-5 h-5"></i>
            </div>
            <div>
              <h4 class="font-bold text-xs sm:text-sm text-emerald-950">Unduh Format Baku Excel</h4>
              <p class="text-[11px] text-emerald-800">Kolom wajib: <code class="font-mono bg-emerald-100 px-1 rounded">username</code>, <code class="font-mono bg-emerald-100 px-1 rounded">password</code>, <code class="font-mono bg-emerald-100 px-1 rounded">nama</code>, <code class="font-mono bg-emerald-100 px-1 rounded">kelas</code></p>
            </div>
          </div>
          <button 
            type="button" 
            onclick="appState.downloadTemplate()" 
            class="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0 shadow"
          >
            <i data-lucide="download" class="w-4 h-4"></i> Unduh Template Excel (.xlsx)
          </button>
        </div>

        <!-- Drag & Drop Upload Dropzone -->
        <div 
          id="excel-dropzone" 
          class="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 text-center transition cursor-pointer bg-slate-50 hover:bg-blue-50/50 flex flex-col items-center justify-center space-y-3"
          onclick="document.getElementById('excel-file-input').click()"
        >
          <input 
            type="file" 
            id="excel-file-input" 
            accept=".xlsx, .xls, .csv" 
            class="hidden" 
            onchange="appState.handleExcelUpload(event)"
          />
          <div class="w-14 h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-md border border-slate-200">
            <i data-lucide="upload-cloud" class="w-7 h-7"></i>
          </div>
          <div>
            <p class="font-bold text-sm text-slate-800">Klik untuk memilih file Excel atau seret (drag & drop) ke sini</p>
            <p class="text-xs text-slate-500 mt-0.5">Mendukung format .xlsx, .xls, dan .csv</p>
          </div>
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-[11px] font-bold">Pilih Berkas</span>
        </div>

        <!-- Progress or Status Message -->
        <div id="excel-status" class="hidden p-3 rounded-xl text-xs font-medium"></div>

      </div>

      <!-- Quick Data Generation & Maintenance Tools -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 class="font-bold text-base text-slate-900 flex items-center gap-2">
          <i data-lucide="wrench" class="w-4 h-4 text-amber-600"></i>
          Alat Uji Coba & Manajemen Data Massal
        </h3>
        <p class="text-xs text-slate-500">
          Gunakan tombol di bawah untuk mengisi data simulasi pemilihan atau mereset data suara saat gladi bersih / simulasi selesai.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          <!-- Generator 1000 Voters -->
          <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3 flex flex-col justify-between">
            <div>
              <h4 class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-blue-600"></i> Generate 1000 Data Pemilih Otomatis
              </h4>
              <p class="text-[11px] text-slate-600 mt-1">
                Membuat 1000 akun pemilih (Kelas 7A-7I, 8A-8I, 9A-9I, dan Guru/Karyawan) lengkap dengan username dan password default <code class="bg-slate-200 px-1 rounded">123</code>.
              </p>
            </div>
            <button 
              type="button" 
              onclick="appState.generateSample1000()" 
              class="w-full py-2.5 px-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
            >
              <i data-lucide="users" class="w-4 h-4"></i> Buat 1000 Voter Otomatis
            </button>
          </div>

          <!-- Reset Votes Tool -->
          <div class="border border-red-200 rounded-2xl p-4 bg-red-50/50 space-y-3 flex flex-col justify-between">
            <div>
              <h4 class="font-bold text-xs text-red-950 flex items-center gap-1.5">
                <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-red-600"></i> Reset Seluruh Suara Masuk
              </h4>
              <p class="text-[11px] text-red-800 mt-1">
                Menghapus semua catatan suara masuk dan mengembalikan status <code class="bg-red-100 px-1 rounded">status_voted</code> seluruh pemilih menjadi Belum Memilih (0 suara).
              </p>
            </div>
            <button 
              type="button" 
              onclick="appState.resetAllVotesConfirm()" 
              class="w-full py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
            >
              <i data-lucide="trash-2" class="w-4 h-4"></i> Kosongkan Hasil Suara (Reset)
            </button>
          </div>

        </div>
      </div>

    </div>
  `;
}

// 5. SUPABASE CONFIG & SQL SCHEMA TAB
function renderSupabaseConfigTab() {
  const cfg = appState.getDbConfig();

  return `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <!-- Connection Form -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg text-slate-900 flex items-center gap-2">
              <i data-lucide="database" class="w-5 h-5 text-blue-600"></i>
              Konfigurasi Supabase Backend Client
            </h3>
            <span class="px-3 py-1 rounded-full text-xs font-bold ${
              cfg.isLive 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }">
              ${cfg.isLive ? 'Terhubung ke Supabase Cloud' : 'Mode Simulasi Lokal (Offline)'}
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            Masukkan Project URL dan Anon Public Key dari project Supabase Anda (ditemukan di: Project Settings &rarr; API).
          </p>
        </div>

        <form id="form-supabase-config" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Supabase Project URL
            </label>
            <input 
              type="url" 
              id="cfg-supabase-url" 
              value="${cfg.url || ''}"
              placeholder="https://xyzcompany.supabase.co" 
              class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Supabase Anon Public API Key
            </label>
            <textarea 
              id="cfg-supabase-key" 
              rows="3"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
              class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-600 outline-none"
            >${cfg.key || ''}</textarea>
          </div>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <button 
              type="submit" 
              class="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <i data-lucide="save" class="w-4 h-4"></i> Simpan & Hubungkan
            </button>

            <button 
              type="button" 
              onclick="appState.seedSupabaseCandidates()" 
              class="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <i data-lucide="upload-cloud" class="w-4 h-4"></i> Inisialisasi 18 Kandidat ke Supabase
            </button>

            <button 
              type="button" 
              onclick="appState.seedSupabaseVoters()" 
              class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <i data-lucide="users" class="w-4 h-4"></i> Unggah DPT Sampel ke Supabase
            </button>

            <button 
              type="button" 
              onclick="appState.resetToLocalDb()" 
              class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
            >
              Gunakan Simulasi Lokal Saja
            </button>
          </div>
        </form>
      </div>

      <!-- SQL Schema Generator -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-base text-slate-900 flex items-center gap-2">
              <i data-lucide="code-2" class="w-4 h-4 text-indigo-600"></i>
              Skrip SQL Pembuatan Tabel Supabase (DDL & RLS)
            </h3>
            <p class="text-xs text-slate-500 mt-0.5">
              Jalankan skrip ini sekali di <strong>SQL Editor Supabase</strong> untuk membuat tabel <code class="font-bold">voters</code>, <code class="font-bold">candidates</code>, dan <code class="font-bold">votes</code>.
            </p>
          </div>
          <button 
            onclick="appState.copySqlSchema()" 
            class="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0"
          >
            <i data-lucide="copy" class="w-3.5 h-3.5"></i> Salin Skrip SQL
          </button>
        </div>

        <div class="relative">
          <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-72 leading-relaxed custom-scroll"><code>${SQL_SCHEMA_SCRIPT}</code></pre>
        </div>
      </div>

    </div>
  `;
}

// 6. IDENTITAS SEKOLAH & MANAJEMEN ADMIN TAB
export function renderSettingsTab() {
  const headerCfg = appState.getHeaderConfig();
  const admins = appState.getAdmins();

  return `
    <div class="max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      <!-- Card 1: Pengaturan Logo & Header Sekolah -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <h3 class="font-extrabold text-lg text-slate-900 flex items-center gap-2">
            <i data-lucide="image" class="w-5 h-5 text-blue-600"></i>
            Kustomisasi Logo Sekolah & Teks Header
          </h3>
          <p class="text-xs text-slate-500 mt-1">
            Ubah identitas visual sekolah, logo, judul utama pemilihan, sub-judul, dan teks footer agar sesuai kebutuhan acara.
          </p>
        </div>

        <!-- Live Header Preview -->
        <div class="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white space-y-2">
          <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400">Pratinjau Tampilan Header:</span>
          <div class="flex items-center gap-3 pt-1">
            <div id="preview-logo-box" class="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center p-1 border-2 border-amber-300 overflow-hidden shrink-0">
              ${headerCfg.logo_url ? `
                <img src="${headerCfg.logo_url}" class="w-full h-full object-contain">
              ` : `
                <svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-slate-950">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              `}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-base text-white">${headerCfg.judul_utama}</span>
                <span class="bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">${headerCfg.badge_text}</span>
              </div>
              <p class="text-xs text-blue-200">${headerCfg.sub_judul}</p>
            </div>
          </div>
        </div>

        <form id="form-header-settings" class="space-y-4 pt-2">
          <!-- Logo input -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Logo Sekolah (URL Gambar atau Unggah Berkas)
            </label>
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <input 
                type="text" 
                id="cfg-logo-url" 
                value="${headerCfg.logo_url || ''}"
                placeholder="https://... atau biarkan kosong untuk logo emblem SVG default" 
                class="flex-1 w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <label class="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 cursor-pointer flex items-center justify-center gap-1.5 transition shrink-0">
                <i data-lucide="upload" class="w-3.5 h-3.5"></i> Unggah Logo
                <input type="file" accept="image/*" class="hidden" onchange="appState.handleLogoFileUpload(event)">
              </label>
            </div>
            <p class="text-[11px] text-slate-400 mt-1">Format didukung: PNG, JPG, SVG, atau WebP transparan.</p>
          </div>

          <!-- Judul Utama -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Judul Utama Aplikasi
              </label>
              <input 
                type="text" 
                id="cfg-judul-utama" 
                value="${headerCfg.judul_utama || ''}"
                required
                class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Teks Badge (Label Kecil)
              </label>
              <input 
                type="text" 
                id="cfg-badge-text" 
                value="${headerCfg.badge_text || ''}"
                required
                class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <!-- Sub Judul -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Sub-Judul / Slogan Sekolah
            </label>
            <input 
              type="text" 
              id="cfg-sub-judul" 
              value="${headerCfg.sub_judul || ''}"
              required
              class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <!-- Footer Copyright -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Teks Footer Copyright
            </label>
            <input 
              type="text" 
              id="cfg-footer-text" 
              value="${headerCfg.footer_text || ''}"
              required
              class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div class="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
            <button 
              type="button" 
              onclick="appState.saveHeaderSettings()" 
              class="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <i data-lucide="save" class="w-4 h-4"></i> Simpan Pengaturan Header
            </button>
            <button 
              type="button" 
              onclick="appState.resetHeaderSettings()" 
              class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
            >
              Kembalikan ke Default
            </button>
          </div>
        </form>
      </div>

      <!-- Card 2: Manajemen Akun Admin Panitia -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <h3 class="font-extrabold text-lg text-slate-900 flex items-center gap-2">
            <i data-lucide="shield-check" class="w-5 h-5 text-amber-600"></i>
            Manajemen Akun Admin (Petugas Panitia)
          </h3>
          <p class="text-xs text-slate-500 mt-1">
            Tambah petugas admin baru agar beberapa anggota panitia dapat masuk ke panel kendali dengan akun masing-masing.
          </p>
        </div>

        <!-- Form Tambah Admin Baru -->
        <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <i data-lucide="user-plus" class="w-4 h-4 text-blue-600"></i> Tambah Akun Admin Baru
          </h4>
          <form id="form-create-admin" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">Nama Lengkap Petugas</label>
              <input 
                type="text" 
                id="new-admin-nama" 
                required 
                placeholder="Contoh: Dani Syamsudin" 
                class="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">Username Admin Baru</label>
              <input 
                type="text" 
                id="new-admin-username" 
                required 
                placeholder="Contoh: panitia2" 
                class="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>

            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">Kata Sandi</label>
              <div class="flex gap-2">
                <input 
                  type="password" 
                  id="new-admin-password" 
                  required 
                  placeholder="Minimal 6 karakter" 
                  class="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button 
                  type="submit" 
                  class="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow transition shrink-0 flex items-center gap-1"
                >
                  <i data-lucide="plus" class="w-3.5 h-3.5"></i> Tambah
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Tabel Daftar Akun Admin -->
        <div class="space-y-3">
          <h4 class="font-bold text-xs text-slate-700 uppercase tracking-wider">
            Daftar Akun Admin Terdaftar (${admins.length})
          </h4>
          <div class="overflow-x-auto border border-slate-200 rounded-xl">
            <table class="w-full text-xs text-left">
              <thead class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th class="p-3 w-12 text-center">No</th>
                  <th class="p-3">Nama Petugas</th>
                  <th class="p-3">Username</th>
                  <th class="p-3">Tanggal Dibuat</th>
                  <th class="p-3 text-center">Role</th>
                  <th class="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium">
                ${admins.map((a, idx) => `
                  <tr class="hover:bg-slate-50 transition">
                    <td class="p-3 text-center text-slate-400 font-mono">${idx + 1}</td>
                    <td class="p-3">
                      <div class="flex items-center gap-2">
                        <div class="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                          ${(a.nama || a.username).charAt(0).toUpperCase()}
                        </div>
                        <span class="font-bold text-slate-900">${a.nama || a.username}</span>
                      </div>
                    </td>
                    <td class="p-3 font-mono font-bold text-slate-700">${a.username}</td>
                    <td class="p-3 text-slate-500">
                      ${a.created_at ? new Date(a.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' }) : '-'}
                    </td>
                    <td class="p-3 text-center">
                      <span class="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-200">
                        Admin Panitia
                      </span>
                    </td>
                    <td class="p-3 text-right">
                      ${admins.length > 1 ? `
                        <button 
                          onclick="appState.handleDeleteAdmin('${a.id}', '${a.username}')" 
                          class="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                          title="Hapus akun admin ini"
                        >
                          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                        </button>
                      ` : `
                        <span class="text-[10px] text-slate-400 italic">Admin Utama (Terkunci)</span>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  `;
}
