
// Parse the response JSON
let jsonResponse;
try {
    jsonResponse = pm.response.json();
} catch (error) {
    console.error("Error parsing JSON:", error);
    pm.test("Error parsing JSON", function() {
        pm.expect.fail("Error parsing JSON");
    });
}

// Check if jsonResponse is defined
if (jsonResponse) {
    let excelData = [];

    // Check the "message" field in the JSON response
    if (jsonResponse.message === "SUCCESS" && jsonResponse.data && jsonResponse.data.ckycNumber && jsonResponse.data.firstName) {
        // Structure for "SUCCESS" message
        let rowData = {
            Field: "Message",
            Value: jsonResponse.message
        };
        excelData.push(rowData);

        rowData = {
            Field: "CKYC Number",
            Value: jsonResponse.data.ckycNumber
        };
        excelData.push(rowData);

        rowData = {
            Field: "First Name",
            Value: jsonResponse.data.firstName
        };
        excelData.push(rowData);
    } else if (jsonResponse.message && jsonResponse.data === null) {
        // Structure for other messages with null data
        let rowData = {
            Field: "Message",
            Value: jsonResponse.message
        };
        excelData.push(rowData);
    } else {
        // Default structure if message is not recognized
        let rowData = {
            Field: "Message",
            Value: "Unknown Message"
        };
        excelData.push(rowData);
    }

    // Convert JSON data to Excel format
    const XLSX = require('xlsx');
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Convert Excel data to buffer
    const excelBuffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    // Download the Excel file
    let fileName = "response_data.xlsx";
    pm.sendRequest({
        url: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelBuffer.toString("base64")}`,
        method: "GET",
        header: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename=${fileName}`
        }
    }, function (err, res) {
        if (err) {
            console.error("Error downloading Excel file:", err);
            pm.test("Error downloading Excel file", function() {
                pm.expect.fail("Error downloading Excel file");
            });
        } else {
            console.log("Excel file downloaded successfully.");
        }
    });
} else {
    console.log("No data to save.");
}
