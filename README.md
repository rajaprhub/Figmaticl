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
    let csvContent = "";

    // Check the fields you need from the JSON response
    let message = jsonResponse.message || "Unknown Message";
    let ckycNumber = jsonResponse.data && jsonResponse.data.ckycNumber ? jsonResponse.data.ckycNumber : "N/A";
    let firstName = jsonResponse.data && jsonResponse.data.firstName ? jsonResponse.data.firstName : "N/A";

    // Create CSV content with the extracted fields
    csvContent += "Message,CKYC Number,First Name\n";
    csvContent += `${message},${ckycNumber},${firstName}\n`;

    // Log the CSV content in the Postman console
    console.log("CSV Content:");
    console.log(csvContent);

    // Convert jsonResponse to a JSON string
    let jsonContent = JSON.stringify(jsonResponse, null, 2);

    // Convert JSON content to a data URI for download
    let fileName = "response_data.json";
    let jsonDataUri = "data:application/json;charset=utf-8," + encodeURIComponent(jsonContent);

    // Trigger download of JSON file using pm.sendRequest
    pm.sendRequest({
        url: jsonDataUri,
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename=' + fileName
        },
        body: {
            mode: 'raw'
        }
    }, function(err, res) {
        if (err) {
            console.error("Error downloading JSON file:", err);
        } else {
            console.log("JSON file downloaded successfully.");
        }
    });
} else {
    console.log("No data to save.");
}
