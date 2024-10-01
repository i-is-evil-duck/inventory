function doGet(request) {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Fetch inventory data
function getInventoryData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inventory');
  var dataRange = sheet.getRange(2, 2, sheet.getLastRow() - 1, 18);
  var data = dataRange.getValues();
  return data;
}

// Validate login credentials for multiple users
function validateCredentials(username, password) {
  var validUsers = {
    'admin': 'glen42151',
    'arek': 'is-a-twink',
    'mrz': 'dagoat' // Convert to lowercase to make it case-insensitive
  };

  username = username.toLowerCase(); // Make mrZ case-insensitive
  if (validUsers[username] && validUsers[username] === password) {
    logLogin(username, true); // Log the successful login attempt
    return true;
  } else {
    logLogin(username, false); // Log the failed login attempt
    return false;
  }
}

// Log user login (success or failure) to the Admin-Logs sheet
function logLogin(username, success) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Admin-Logs');
  var date = new Date();
  var status = success ? 'Success' : 'Failed'; // Log success or failure
  sheet.appendRow([username, status, date.toLocaleDateString(), date.toLocaleTimeString()]);
}

// Update inventory based on the user's changes
function updateInventory(row, stock, type, status) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inventory');
  
  // Update Stock (E column, index 5)
  sheet.getRange(row + 1, 5).setValue(stock);
  
  // Update Type (D column, index 4)
  sheet.getRange(row + 1, 4).setValue(type);
  
  // Update Status (R column, index 18)
  sheet.getRange(row + 1, 18).setValue(status);
}
