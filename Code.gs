function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

// Hardcoded credentials (for example purposes, consider using a more secure method)
var credentials = {
  'A': 'passwordA', // Team A's password
  'B': 'passwordB', // Team B's password
  'C': 'passwordC'  // Team C's password
  // Add more teams and passwords as needed
};

// Function to validate team letter and password
function validateCredentials(teamLetter, password) {
  return credentials[teamLetter] === password;
}

// Function to fetch part data from the sheet based on the selected team
function getPartsData(team) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(team);  // Get the sheet for the selected team
  if (!sheet) {
    return [];
  }
  
  var partsRange = sheet.getRange('C2:C'); // Parts are listed in column C starting from row 2
  var categoryRange = sheet.getRange('D2:D'); // Category is listed in column D starting from row 2
  var usedRange = sheet.getRange('E2:E');  // Quantities are listed in column E starting from row 2
  
  var parts = partsRange.getValues();
  var categories = categoryRange.getValues();
  var used = usedRange.getValues();
  
  var data = [];
  
  for (var i = 0; i < parts.length; i++) {
    if (parts[i][0] != '') { // Only push non-empty rows
      data.push({
        part: parts[i][0],
        category: categories[i][0],
        used: used[i][0]
      });
    }
  }
  
  return data;  // Return the parts and usage data
}

// Function to update the number of parts used for the selected team
function updatePartsData(team, partName, newUsedCount) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(team);  // Get the sheet for the selected team
  if (!sheet) {
    return 'Team not found';
  }
  
  var partsRange = sheet.getRange('C2:C');
  var parts = partsRange.getValues();
  
  for (var i = 0; i < parts.length; i++) {
    if (parts[i][0] === partName) {
      sheet.getRange('E' + (i + 2)).setValue(newUsedCount);
      return 'Updated successfully';
    }
  }
  return 'Part not found';
}
