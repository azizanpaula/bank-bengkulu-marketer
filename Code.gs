/**
 * SCRIPT GOOGLE APPS SCRIPT (Code.gs)
 * PT Bank Pembangunan Daerah Bengkulu (Bank Bengkulu)
 * SMART-AO - Dashboard Monitoring Target & Pipeline Account Officer
 * 
 * Script ini mendukung:
 * 1. Penyajian Web App langsung di Google Sites (doGet)
 * 2. Pengambilan data JSON real-time (API GET: action=getData)
 * 3. Sinkronisasi Dua Arah Otomatis (Cloud Two-Way Sync via API POST & GET)
 * 4. Terhubung langsung ke spreadsheet master di Google Drive
 */

var SPREADSHEET_ID = "1eldnGb4dH361bbn9DhH8yxgEy5IMHnr1UaHllgSXSiI";

function getSpreadsheet() {
  try {
    return SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (e) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
}

/**
 * Handle HTTP GET Requests
 * Digunakan untuk:
 * - Ambil data: ?action=getData
 * - Update AO: ?action=updateAO&data={...}
 * - Simpan/Update Pipeline: ?action=savePipeline&data={...}
 * - Hapus Pipeline: ?action=deletePipeline&data={...}
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'getData';
  var ss = getSpreadsheet();

  // 1. Endpoint API GET data
  if (action === 'getData') {
    var sheetData = getAODataFromSheet();
    return createJsonResponse(sheetData);
  }

  // 2. Endpoint update data via GET (CORS / browser fallback)
  if (action === 'updateAO' && e.parameter.data) {
    try {
      var aoData = JSON.parse(e.parameter.data);
      return handleUpdateAO(ss, aoData);
    } catch (err) {
      return createJsonResponse({ success: false, error: err.toString() });
    }
  }

  // 3. Endpoint simpan pipeline via GET
  if (action === 'savePipeline' && e.parameter.data) {
    try {
      var pipeData = JSON.parse(e.parameter.data);
      return handleSavePipeline(ss, pipeData);
    } catch (err) {
      return createJsonResponse({ success: false, error: err.toString() });
    }
  }

  // 4. Endpoint hapus pipeline via GET
  if (action === 'deletePipeline' && e.parameter.data) {
    try {
      var delData = JSON.parse(e.parameter.data);
      return handleDeletePipeline(ss, delData);
    } catch (err) {
      return createJsonResponse({ success: false, error: err.toString() });
    }
  }

  // 5. Default: Sajikan output JSON data lengkap
  return createJsonResponse(getAODataFromSheet());
}

/**
 * Endpoint Sinkronisasi Dua Arah via POST
 */
function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var payload = JSON.parse(rawData);
    var action = payload.action;
    var ss = getSpreadsheet();

    if (action === 'updateAO') {
      return handleUpdateAO(ss, payload.data);
    } else if (action === 'savePipeline') {
      return handleSavePipeline(ss, payload.data);
    } else if (action === 'deletePipeline') {
      return handleDeletePipeline(ss, payload.data);
    } else if (action === 'syncAll') {
      return handleSyncAll(ss, payload.data);
    }

    return createJsonResponse({ success: false, message: 'Action tidak dikenal' });
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Mengambil data AO Kredit & AO Pemasaran langsung dari Google Sheet aktif
 */
function getAODataFromSheet() {
  try {
    var ss = getSpreadsheet();
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
      var targetVal = Number(row[4]) || 0;
      var realVal = Number(row[5]) || 0;
      var item = {
        id: 'gs_' + i,
        nip: String(row[1]),
        nama: String(row[2]),
        cabang: String(row[3]),
        target: targetVal,
        realisasi: realVal,
        breakdown: [
          { nama: 'Plafon Segmen Utama', target: Math.round(targetVal * 0.6), real: Math.round(realVal * 0.6) },
          { nama: 'Plafon Segmen Pendukung', target: Math.round(targetVal * 0.4), real: Math.round(realVal * 0.4) }
        ],
        notes: String(row[9] || 'Data tersinkronisasi otomatis dari Google Sheet Bank Bengkulu.')
      };
      
      if (kategori.indexOf('kredit') !== -1) {
        item.npl = Number(row[6]) || 0.5;
        item.noa_realisasi = Number(row[7]) || 50;
        item.noa_target = Math.round(item.noa_realisasi * 0.9);
        item.kol2 = (row[8] !== undefined && row[8] !== '' && !isNaN(Number(row[8]))) ? Number(row[8]) : Number((item.npl * 1.8).toFixed(2));
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
          id: String(pRow[9] || ('p_gs_' + j)),
          nasabah: String(pRow[1] || ''),
          produk: String(pRow[2] || ''),
          nominal: Number(pRow[3]) || 0,
          step: Number(pRow[4]) || 1,
          catatan: String(pRow[5] || ''),
          tgl: String(pRow[6] || 'Target Q4 2026'),
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

    return { success: true, data: result, timestamp: new Date().toISOString() };
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

  var nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

  if (foundRow !== -1) {
    if (aoData.realisasi !== undefined) sheet.getRange(foundRow, 6).setValue(Number(aoData.realisasi)); // Kolom F
    if (aoData.npl !== undefined) sheet.getRange(foundRow, 7).setValue(Number(aoData.npl)); // Kolom G
    if (aoData.casa !== undefined) sheet.getRange(foundRow, 7).setValue(Number(aoData.casa)); // Kolom G
    if (aoData.noa_realisasi !== undefined) sheet.getRange(foundRow, 8).setValue(Number(aoData.noa_realisasi)); // Kolom H
    if (aoData.noa_rekening !== undefined) sheet.getRange(foundRow, 8).setValue(Number(aoData.noa_rekening)); // Kolom H
    if (aoData.kol2 !== undefined) sheet.getRange(foundRow, 9).setValue(Number(aoData.kol2)); // Kolom I
    if (aoData.digital_qris !== undefined) sheet.getRange(foundRow, 9).setValue(Number(aoData.digital_qris)); // Kolom I
    if (aoData.notes !== undefined) sheet.getRange(foundRow, 10).setValue(String(aoData.notes)); // Kolom J
    sheet.getRange(foundRow, 11).setValue(nowStr); // Kolom K: Timestamp update

    return createJsonResponse({ 
      success: true, 
      message: 'Data kinerja ' + (aoData.nama || aoData.nip) + ' berhasil disinkronkan ke Google Drive!',
      updatedAt: nowStr
    });
  }

  return createJsonResponse({ success: false, message: 'NIP ' + aoData.nip + ' tidak ditemukan di Google Sheet!' });
}

/**
 * Handler Simpan / Update Pipeline ke sheet Data_Pipeline
 */
function handleSavePipeline(ss, pipeData) {
  var pSheet = ss.getSheetByName('Data_Pipeline');
  if (!pSheet) {
    pSheet = ss.insertSheet('Data_Pipeline');
    pSheet.appendRow(['NIP_AO', 'Nama_Calon_Nasabah', 'Produk', 'Nominal_Juta', 'Tahapan_Step', 'Catatan', 'Target_Closing', 'Kontak_Nasabah', 'Aging_Hari', 'Pipeline_ID', 'Terakhir_Diperbarui']);
  }

  var pData = pSheet.getDataRange().getValues();
  var foundRow = -1;
  var pipeId = String(pipeData.id || '');

  // Cari apakah prospek ini sudah ada berdasarkan ID atau (NIP + Nama Nasabah)
  if (pData.length > 1) {
    for (var i = 1; i < pData.length; i++) {
      var rowId = String(pData[i][9] || '');
      var rowNip = String(pData[i][0] || '');
      var rowNasabah = String(pData[i][1] || '').toLowerCase().trim();

      if ((pipeId && rowId === pipeId) || (rowNip === String(pipeData.nip) && rowNasabah === String(pipeData.nasabah || '').toLowerCase().trim())) {
        foundRow = i + 1;
        break;
      }
    }
  }

  var nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

  if (foundRow !== -1) {
    // Update existing prospect
    if (pipeData.nominal !== undefined) pSheet.getRange(foundRow, 4).setValue(Number(pipeData.nominal));
    if (pipeData.step !== undefined) pSheet.getRange(foundRow, 5).setValue(Number(pipeData.step));
    if (pipeData.catatan !== undefined) pSheet.getRange(foundRow, 6).setValue(String(pipeData.catatan));
    if (pipeData.tgl !== undefined) pSheet.getRange(foundRow, 7).setValue(String(pipeData.tgl));
    if (pipeData.kontak !== undefined) pSheet.getRange(foundRow, 8).setValue(String(pipeData.kontak));
    if (pipeData.aging_hari !== undefined) pSheet.getRange(foundRow, 9).setValue(Number(pipeData.aging_hari));
    pSheet.getRange(foundRow, 11).setValue(nowStr);

    return createJsonResponse({ 
      success: true, 
      message: 'Status prospek pipeline ' + pipeData.nasabah + ' diperbarui di Google Drive!',
      updatedAt: nowStr
    });
  } else {
    // Tambah baris baru
    pSheet.appendRow([
      pipeData.nip,
      pipeData.nasabah,
      pipeData.produk,
      pipeData.nominal,
      pipeData.step || 1,
      pipeData.catatan || '',
      pipeData.tgl || 'Target Q4 2026',
      pipeData.kontak || '',
      pipeData.aging_hari || 1,
      pipeId || ('pipe_' + Date.now()),
      nowStr
    ]);

    return createJsonResponse({ 
      success: true, 
      message: 'Prospek pipeline ' + pipeData.nasabah + ' berhasil ditambahkan ke Google Drive!',
      updatedAt: nowStr
    });
  }
}

/**
 * Handler Hapus Pipeline dari sheet Data_Pipeline
 */
function handleDeletePipeline(ss, delData) {
  var pSheet = ss.getSheetByName('Data_Pipeline');
  if (!pSheet) return createJsonResponse({ success: true, message: 'Sheet tidak ditemukan' });

  var pData = pSheet.getDataRange().getValues();
  var targetId = String(delData.id || '');
  var targetNip = String(delData.nip || '');

  for (var i = pData.length - 1; i >= 1; i--) {
    var rowId = String(pData[i][9] || '');
    var rowNip = String(pData[i][0] || '');

    if (rowId === targetId && (!targetNip || rowNip === targetNip)) {
      pSheet.deleteRow(i + 1);
      return createJsonResponse({ success: true, message: 'Prospek pipeline dihapus dari Google Drive' });
    }
  }

  return createJsonResponse({ success: false, message: 'Data prospek tidak ditemukan di Google Drive' });
}

/**
 * Handler Sinkronisasi Semua Data Sekaligus (Batch Push)
 */
function handleSyncAll(ss, allData) {
  try {
    if (allData.kredit && Array.isArray(allData.kredit)) {
      allData.kredit.forEach(function(ao) { handleUpdateAO(ss, ao); });
    }
    if (allData.pemasaran && Array.isArray(allData.pemasaran)) {
      allData.pemasaran.forEach(function(ao) { handleUpdateAO(ss, ao); });
    }
    return createJsonResponse({ success: true, message: 'Semua data berhasil disinkronkan ke Google Drive!' });
  } catch (e) {
    return createJsonResponse({ success: false, error: e.toString() });
  }
}
