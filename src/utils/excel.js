// Utility for Excel SheetJS import and export

export function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    if (!window.XLSX) {
      return reject(new Error('SheetJS (XLSX) library tidak ditemukan di browser.'));
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = window.XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = window.XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

        if (!json || json.length < 2) {
          return reject(new Error('File Excel kosong atau tidak memiliki baris data setelah header.'));
        }

        // Header mapping
        const headerRow = json[0].map(h => String(h).trim().toLowerCase());
        
        let uIdx = headerRow.findIndex(h => h.includes('username') || h.includes('nisn') || h.includes('nis') || h.includes('id'));
        let pIdx = headerRow.findIndex(h => h.includes('password') || h.includes('pass') || h.includes('pin') || h.includes('sandi'));
        let nIdx = headerRow.findIndex(h => h.includes('nama') || h.includes('name') || h.includes('lengkap'));
        let kIdx = headerRow.findIndex(h => h.includes('kelas') || h.includes('class') || h.includes('tingkat') || h.includes('rombongan'));

        // Fallback to column index 0,1,2,3 if not matched by name
        if (uIdx === -1) uIdx = 0;
        if (pIdx === -1) pIdx = 1;
        if (nIdx === -1) nIdx = 2;
        if (kIdx === -1) kIdx = 3;

        const parsedVoters = [];
        for (let i = 1; i < json.length; i++) {
          const row = json[i];
          if (!row || row.length === 0) continue;

          const username = String(row[uIdx] || '').trim();
          const password = String(row[pIdx] || '123').trim();
          const nama = String(row[nIdx] || '').trim();
          const kelas = String(row[kIdx] || '7A').trim();

          if (username && nama) {
            parsedVoters.push({
              username,
              password: password || '123',
              nama,
              kelas: kelas || '7A'
            });
          }
        }

        resolve(parsedVoters);
      } catch (err) {
        reject(new Error('Gagal memproses file Excel: ' + err.message));
      }
    };

    reader.onerror = () => reject(new Error('Gagal membaca file dari disk.'));
    reader.readAsArrayBuffer(file);
  });
}

export function downloadExcelTemplate() {
  if (!window.XLSX) {
    alert('SheetJS belum siap.');
    return;
  }

  const sampleData = [
    { username: 'nisn0001', password: '123', nama: 'Ahmad Fauzi', kelas: '7A' },
    { username: 'nisn0002', password: '123', nama: 'Bella Salsabila', kelas: '7A' },
    { username: 'nisn0003', password: '123', nama: 'Citra Permata', kelas: '8B' },
    { username: 'nisn0004', password: '123', nama: 'Dimas Wicaksono', kelas: '9C' },
    { username: 'guru0001', password: '123', nama: 'Drs. Supriyanto, M.Pd.', kelas: 'Guru dan Karyawan' }
  ];

  const worksheet = window.XLSX.utils.json_to_sheet(sampleData);
  // Column widths
  worksheet['!cols'] = [
    { wch: 16 }, // username
    { wch: 14 }, // password
    { wch: 28 }, // nama
    { wch: 20 }  // kelas
  ];

  const workbook = window.XLSX.utils.book_new();
  window.XLSX.utils.book_append_sheet(workbook, worksheet, 'Data_Voters');

  window.XLSX.writeFile(workbook, 'Template_Data_Pemilih_SMPN15_Semarang.xlsx');
}

export function exportVotersToExcel(votersList) {
  if (!window.XLSX) return;

  const data = votersList.map((v, idx) => ({
    No: idx + 1,
    Username: v.username,
    Nama_Lengkap: v.nama,
    Kelas: v.kelas,
    Status_Memilih: v.status_voted ? 'SUDAH MEMILIH' : 'BELUM MEMILIH',
    Waktu_Dibuat: v.created_at ? new Date(v.created_at).toLocaleString('id-ID') : '-'
  }));

  const worksheet = window.XLSX.utils.json_to_sheet(data);
  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 16 },
    { wch: 30 },
    { wch: 18 },
    { wch: 18 },
    { wch: 24 }
  ];

  const workbook = window.XLSX.utils.book_new();
  window.XLSX.utils.book_append_sheet(workbook, worksheet, 'Status_Pemilih');
  window.XLSX.writeFile(workbook, `Rekap_Pemilih_Molas2026_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
