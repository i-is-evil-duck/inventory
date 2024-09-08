function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function getInventoryData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inventory');
  // Fetch data from columns B to T starting from row 2
  var dataRange = sheet.getRange(2, 2, sheet.getLastRow() - 1, 18); // Columns B (2) to T (20), 18 columns in total
  var data = dataRange.getValues();
  return data; // Returns rows from column B (ID) to column T (Notes)
}

function validateCredentials(username, password) {
  // Simple validation, replace with your actual validation
  return username === "admin" && password === "password";
}

function updateInventory(row, stock, type, status) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inventory');
  
  // Update Stock (E column, index 5)
  sheet.getRange(row + 1, 5).setValue(stock); // Adjust row to match actual sheet indexing
  
  // Update Type (D column, index 4)
  sheet.getRange(row + 1, 4).setValue(type); // Adjust row to match actual sheet indexing
  
  // Update Status (R column, index 18)
  sheet.getRange(row + 1, 18).setValue(status); // Adjust row to match actual sheet indexing
}
