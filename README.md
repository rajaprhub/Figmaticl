const fs = require("fs");
const path = require("path");
const exceljs = require("exceljs");

const ckycbaseJsonFilePath = path.join(__dirname, "datas", "may_data.json");
const wbckycExcelFilePath = path.join(__dirname, "uploads", "ckycexcel.xlsx");

function saveckycdJSONToExcel() {
  const xl = require("excel4node");
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet(wbckycExcelFilePath);

  try {
    // Read the JSON data from formdata.json
    const jsonData = fs.readFileSync(ckycbaseJsonFilePath, "utf8");
    // const formData = JSON.parse(jsonData);

    const formData = [
      {
        name: "Shadab Shaikh",
        email: "shadab@gmail.com",
        mobile: "1234567890",
      },
    ];

    const headingColumnNames = ["Name", "Email", "Mobile"];
    //Write Column Title in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });


    let rowIndex = 2;
    formData
      .forEach((record) => {
        let columnIndex = 1;
        Object.keys(record).forEach((columnName) => {
          ws.cell(rowIndex, columnIndex++).string(record[columnName]);
        });
        rowIndex++;

        return wb.xlsx.writeFile(excelFilePath);
      })
      .then(() => {
        console.log("Data appended to Excel file successfully.");
      })
      .catch((error) => {
        console.error("Error appending data to Excel file:", error);
      });
  } catch (error) {
    console.error("Error reading JSON data:", error);
  }
}

module.exports = { saveckycdJSONToExcel };
