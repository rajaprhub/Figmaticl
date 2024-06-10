const excel = require('excel4node');

function saveJsonDataToExcel(jsonData, excelFilePath) {
    const wb = new excel.Workbook();
    const ws = wb.addWorksheet('Sheet 1');

    const headingColumnNames = Object.keys(jsonData[0]);
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
        ws.cell(1, headingColumnIndex++).string(heading);
    });

    let rowIndex = 2;
    jsonData.forEach((record) => {
        let columnIndex = 1;
        Object.values(record).forEach((value) => {
            ws.cell(rowIndex, columnIndex++).string(value);
        });
        rowIndex++;
    });

    return wb.write(excelFilePath);
}

module.exports = {
    saveJsonDataToExcel: saveJsonDataToExcel
};
