/**
 * SCRIPT GOOGLE APPS SCRIPT (Code.gs)
 * PT Bank Pembangunan Daerah Bengkulu (Bank Bengkulu)
 * SMART-AO - Dashboard Monitoring Target & Pipeline Account Officer
 * 
 * Script ini mendukung:
 * 1. Penyajian Web App langsung di Google Sites (doGet)
 * 2. Pengambilan data JSON real-time (API GET)
 * 3. Sinkronisasi Dua Arah (Cloud Two-Way Sync via API POST)
 */

function doGet(e) {
  // Jika diakses sebagai endpoint API JSON
  if (e && e.parameter && e.parameter.action === 'getData') {
    var sheetData = getAODataFromSheet();
    return ContentService.createTextOutput(JSON.stringify(sheetData))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Jika disematkan langsung sebagai Web App di Google Sites
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('SMART-AO Bank Bengkulu - Monitoring Target & Pipeline')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Endpoint Sinkronisasi Dua Arah (Two-Way Sync) via POST
 * Menerima payload dari dashboard SMART-AO untuk memperbarui Google Sheet secara langsung
 */
function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var payload = JSON.parse(rawData);
    var action = payload.action;

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === 'updateAO') {
      return handleUpdateAO(ss, payload.data);
    } else if (action === 'savePipeline') {
      return handleSavePipeline(ss, payload.data);
    } else if (action === 'syncAll') {
      return handleSyncAll(ss, payload.data);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Action tidak dikenal' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Mengambil data AO Kredit & AO Pemasaran langsung dari Google Sheet aktif
 */
function getAODataFromSheet() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Data_AO') || ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();
    
    var result = {
      kredit: [],
      pemasaran: []
    };
    
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (!row[1] && !row[2]) continue; // Lewati baris kosong
      
      var kategori = String(row[0]).toLowerCase().trim();
      var item = {
        id: 'gs_' + i,
        nip: String(row[1]),
        nama: String(row[2]),
        cabang: String(row[3]),
        target: Number(row[4]) || 0,
        realisasi: Number(row[5]) || 0,
        breakdown: [
          { nama: 'Plafon Segmen Utama', target: Math.round(Number(row[4]) * 0.6), real: Math.round(Number(row[5]) * 0.6) },
          { nama: 'Plafon Segmen Pendukung', target: Math.round(Number(row[4]) * 0.4), real: Math.round(Number(row[5]) * 0.4) }
        ],
        notes: String(row[8] || 'Data tersinkronisasi otomatis dari Google Sheet Bank Bengkulu.')
      };
      
      if (kategori.indexOf('kredit') !== -1) {
        item.npl = Number(row[6]) || 0.5;
        item.noa_realisasi = Number(row[7]) || 50;
        item.noa_target = Math.round(item.noa_realisasi * 0.9);
        item.kol2 = (row[8] !== undefined && !isNaN(Number(row[8]))) ? Number(row[8]) : Number((item.npl * 1.8).toFixed(2));
        result.kredit.push(item);
      } else {
        item.casa = Number(row[6]) || 60;
        item.noa_rekening = Number(row[7]) || 150;
        item.digital_qris = Math.round(item.noa_rekening * 0.15);
        result.pemasaran.push(item);
      }
    }
    
    // Ambil data Pipeline jika sheet Data_Pipeline ada
    var pipelineSheet = ss.getSheetByName('Data_Pipeline');
    var pipelineMap = {};
    if (pipelineSheet) {
      var pData = pipelineSheet.getDataRange().getValues();
      for (var j = 1; j < pData.length; j++) {
        var pRow = pData[j];
        var aoNip = String(pRow[0]);
        if (!aoNip) continue;
        if (!pipelineMap[aoNip]) pipelineMap[aoNip] = [];
        pipelineMap[aoNip].push({
          id: 'p_gs_' + j,
          nasabah: String(pRow[1]),
          produk: String(pRow[2]),
          nominal: Number(pRow[3]) || 0,
          step: Number(pRow[4]) || 1,
          catatan: String(pRow[5] || ''),
          tgl: String(pRow[6] || 'Aktif'),
          kontak: String(pRow[7] || ''),
          aging_hari: Number(pRow[8]) || 5
        });
      }

      // Pasang pipeline ke AO terkait
      ['kredit', 'pemasaran'].forEach(function(kat) {
        result[kat].forEach(function(ao) {
          if (pipelineMap[ao.nip]) {
            ao.pipeline = pipelineMap[ao.nip];
          }
        });
      });
    }

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Handler Update Realisasi AO Tunggal
 */
function handleUpdateAO(ss, aoData) {
  var sheet = ss.getSheetByName('Data_AO') || ss.getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var foundRow = -1;

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][1]).trim() === String(aoData.nip).trim()) {
      foundRow = i + 1;
      break;
    }
  }

  if (foundRow !== -1) {
    sheet.getRange(foundRow, 6).setValue(Number(aoData.realisasi)); // Kolom F: Realisasi
    if (aoData.npl !== undefined) sheet.getRange(foundRow, 7).setValue(Number(aoData.npl)); // Kolom G
    if (aoData.casa !== undefined) sheet.getRange(foundRow, 7).setValue(Number(aoData.casa));
    if (aoData.noa_realisasi !== undefined) sheet.getRange(foundRow, 8).setValue(Number(aoData.noa_realisasi)); // Kolom H
    if (aoData.noa_rekening !== undefined) sheet.getRange(foundRow, 8).setValue(Number(aoData.noa_rekening));
    if (aoData.kol2 !== undefined) sheet.getRange(foundRow, 9).setValue(Number(aoData.kol2)); // Kolom I: Kol 2
    if (aoData.notes) sheet.getRange(foundRow, 10).setValue(String(aoData.notes)); // Kolom J: Notes

    return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Data AO berhasil diperbarui di Sheet!' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'NIP tidak ditemukan di Sheet!' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handler Simpan Pipeline ke sheet Data_Pipeline
 */
function handleSavePipeline(ss, pipeData) {
  var pSheet = ss.getSheetByName('Data_Pipeline');
  if (!pSheet) {
    pSheet = ss.insertSheet('Data_Pipeline');
    pSheet.appendRow(['NIP_AO', 'Nama_Calon_Nasabah', 'Produk', 'Nominal_Juta', 'Tahapan_Step', 'Catatan', 'Target_Closing', 'Kontak_Nasabah', 'Aging_Hari']);
  }

  pSheet.appendRow([
    pipeData.nip,
    pipeData.nasabah,
    pipeData.produk,
    pipeData.nominal,
    pipeData.step,
    pipeData.catatan,
    pipeData.tgl || 'Target Q4 2026',
    pipeData.kontak || '',
    pipeData.aging_hari || 5
  ]);

  return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Prospek pipeline berhasil dicatat ke Sheet!' }))
    .setMimeType(ContentService.MimeType.JSON);
}
