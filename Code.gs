function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

// Function to fetch credentials from the "Admin Page" sheet
function getCredentialsFromSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Admin Page');
  if (!sheet) {
    throw new Error('Admin Page sheet not found');
  }
  
  var data = sheet.getRange('A2:B').getValues(); // Assuming data starts from row 2
  var credentials = {};
  
  data.forEach(function(row) {
    var teamLetter = row[0];
    var password = row[1];
    
    if (teamLetter && password) {
      credentials[teamLetter] = password;
    }
  });
  
  return credentials;
}

// Function to validate team letter and password
function validateCredentials(teamLetter, password) {
  var credentials = getCredentialsFromSheet();
  return credentials[teamLetter] === password;
}

// Function to fetch parts data including part-id
function getPartsData(team) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(team);
  if (!sheet) {
    return [];
  }
  
  var partsRange = sheet.getRange('C2:C'); // Column C for part names
  var categoryRange = sheet.getRange('D2:D'); // Column D for categories
  var usedRange = sheet.getRange('E2:E'); // Column E for "In Use"
  var partIdRange = sheet.getRange('B2:B'); // Column B for part IDs
  
  var parts = partsRange.getValues();
  var categories = categoryRange.getValues();
  var used = usedRange.getValues();
  var partIds = partIdRange.getValues(); // Fetch part IDs
  
  var data = [];
  
  for (var i = 0; i < parts.length; i++) {
    if (parts[i][0] != '') {
      data.push({
        part: parts[i][0],
        category: categories[i][0],
        partId: partIds[i][0], // Include part ID
        used: used[i][0]
      });
    }
  }
  
  return data;
}

// Function to update parts data
function updatePartsData(team, partName, newUsedCount) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(team);
  if (!sheet) {
    return 'Team not found';
  }
  
  var partsRange = sheet.getRange('C2:C'); // Column C for part names
  var parts = partsRange.getValues();
  
  for (var i = 0; i < parts.length; i++) {
    if (parts[i][0] === partName) {
      sheet.getRange('E' + (i + 2)).setValue(newUsedCount); // Update "In Use"
      return 'Updated successfully';
    }
  }
  return 'Part not found';
}
