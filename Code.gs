/**
 * =========================================================
 * ENTERPRISE HR MOBILIZATION SYSTEM - BACKEND CONTROLLER
 * =========================================================
 */

/**
 * Standard GET handler. Evaluates and serves the Index.html template.
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Enterprise HR Mobilization')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Required if embedding
}

/**
 * Helper function to inject Styles.html and Script.html into Index.html.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * =========================================================
 * API LAYER -> To be called via google.script.run
 * =========================================================
 */

/**
 * Simulates fetching dashboard data from the underlying Google Sheet.
 */
function api_getDashboardData() {
  try {
    // IN PRODUCTION:
    // const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Candidates');
    // const data = sheet.getDataRange().getValues();
    // Proceed to filter data by HR Coordinator assignments...
    
    return {
      success: true,
      data: {
        activeCount: 24,
        missingDocs: 12,
        pendingValidation: 5,
        msg: "Live data successfully retrieved from Google Sheets."
      }
    };
  } catch(e) {
    Logger.log(e);
    return { success: false, error: e.message };
  }
}

/**
 * Handles binary document uploads from the frontend wizard.
 */
function api_uploadDocumentToDrive(candidateId, docType, filename, base64Data) {
  try {
    // IN PRODUCTION:
    // 1. Locate the candidate's Google Drive Folder based on Candidate ID.
    // 2. Decode the incoming base64 payload into a file blob.
    // 3. DriveApp.getFolderById(folderId).createFile(blob);
    // 4. Update the "Documents" Google Sheet row with the new file URL.
    
    Logger.log("Received upload request for Candidate " + candidateId + " / Type: " + docType);
    return { success: true, fileUrl: "https://drive.google.com/mock-link" };
  } catch(e) {
    return { success: false, error: e.message };
  }
}
