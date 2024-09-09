function doGet(request) {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Function to fetch parts data including part-id (for U_Inventory tab)
function getPartsData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('U_Inventory');
  if (!sheet) {
    return [];
  }
  
  var partsRange = sheet.getRange('C2:C'); // Column C for part names
  var categoryRange = sheet.getRange('D2:D'); // Column D for categories
  var stock = sheet.getRange('E2:E'); // Column E for "Stock"
  var usedRange = sheet.getRange('F2:F'); // Column E for "In Use"
  var partIdRange = sheet.getRange('B2:B'); // Column B for part IDs
  
  var parts = partsRange.getValues();
  var categories = categoryRange.getValues();
  var stock = stock.getValues();
  var used = usedRange.getValues();
  var partIds = partIdRange.getValues(); // Fetch part IDs
  
  var data = [];
  
  for (var i = 0; i < parts.length; i++) {
    if (parts[i][0] != '') {
      data.push({
        part: parts[i][0],
        category: categories[i][0],
        partId: partIds[i][0], // Include part ID
        stock: stock[i][0],
        used: used[i][0]
      });
    }
  }
  
  return data;
}
