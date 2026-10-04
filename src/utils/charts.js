// Chart.js helper for real-time visualization

let barChartMasInstance = null;
let barChartMbakInstance = null;
let doughnutTurnoutInstance = null;

export function renderAnalyticsCharts(stats) {
  if (!window.Chart) {
    console.warn('Chart.js not loaded');
    return;
  }

  // 1. Bar Chart - Mas Molas
  const ctxMas = document.getElementById('chart-mas');
  if (ctxMas) {
    if (barChartMasInstance) barChartMasInstance.destroy();

    const sortedMas = [...stats.masStats].sort((a, b) => a.nomor_urut - b.nomor_urut);
    const labels = sortedMas.map(c => `0${c.nomor_urut}. ${c.nama.split(' ')[0]}`);
    const dataValues = sortedMas.map(c => c.votes);

    barChartMasInstance = new window.Chart(ctxMas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Perolehan Suara',
          data: dataValues,
          backgroundColor: 'rgba(29, 78, 216, 0.85)', // Blue
          borderColor: 'rgb(30, 58, 138)',
          borderWidth: 1.5,
          borderRadius: 8,
          hoverBackgroundColor: 'rgba(245, 158, 11, 0.9)' // Amber on hover
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Suara: ${ctx.parsed.y} (${sortedMas[ctx.dataIndex].percentage}%)`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          },
          x: {
            ticks: { font: { size: 11, weight: '600' } }
          }
        }
      }
    });
  }

  // 2. Bar Chart - Mbak Molas
  const ctxMbak = document.getElementById('chart-mbak');
  if (ctxMbak) {
    if (barChartMbakInstance) barChartMbakInstance.destroy();

    const sortedMbak = [...stats.mbakStats].sort((a, b) => a.nomor_urut - b.nomor_urut);
    const labels = sortedMbak.map(c => `0${c.nomor_urut}. ${c.nama.split(' ')[0]}`);
    const dataValues = sortedMbak.map(c => c.votes);

    barChartMbakInstance = new window.Chart(ctxMbak, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Perolehan Suara',
          data: dataValues,
          backgroundColor: 'rgba(217, 119, 6, 0.85)', // Gold/Amber
          borderColor: 'rgb(180, 83, 9)',
          borderWidth: 1.5,
          borderRadius: 8,
          hoverBackgroundColor: 'rgba(29, 78, 216, 0.9)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Suara: ${ctx.parsed.y} (${sortedMbak[ctx.dataIndex].percentage}%)`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          },
          x: {
            ticks: { font: { size: 11, weight: '600' } }
          }
        }
      }
    });
  }

  // 3. Doughnut Chart - Partisipasi Pemilih
  const ctxTurnout = document.getElementById('chart-turnout');
  if (ctxTurnout) {
    if (doughnutTurnoutInstance) doughnutTurnoutInstance.destroy();

    doughnutTurnoutInstance = new window.Chart(ctxTurnout, {
      type: 'doughnut',
      data: {
        labels: ['Sudah Memilih', 'Belum Memilih'],
        datasets: [{
          data: [stats.votedCount, stats.notVotedCount],
          backgroundColor: [
            'rgb(16, 185, 129)', // Emerald
            'rgb(226, 232, 240)'  // Slate light
          ],
          borderColor: ['#fff', '#fff'],
          borderWidth: 2,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 14, font: { size: 12, weight: '500' } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw} orang (${stats.totalVoters > 0 ? ((ctx.raw / stats.totalVoters) * 100).toFixed(1) : 0}%)`
            }
          }
        }
      }
    });
  }
}

export function destroyCharts() {
  if (barChartMasInstance) {
    barChartMasInstance.destroy();
    barChartMasInstance = null;
  }
  if (barChartMbakInstance) {
    barChartMbakInstance.destroy();
    barChartMbakInstance = null;
  }
  if (doughnutTurnoutInstance) {
    doughnutTurnoutInstance.destroy();
    doughnutTurnoutInstance = null;
  }
}
