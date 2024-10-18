function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var params = JSON.parse(e.postData.contents);
    var email = params.email;

    sheet.appendRow([email, new Date()]);

    return ContentService.createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Email added successfully!'
    })).setMimeType(ContentService.MimeType.JSON);
}
