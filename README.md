
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

    // Check the "message" field in the JSON response
    if (jsonResponse.message === "SUCCESS" && jsonResponse.data && jsonResponse.data.ckycNumber && jsonResponse.data.firstName) {
        // Structure for "SUCCESS" message
        csvContent += "Message,CKYC Number,First Name\n";
        csvContent += `${jsonResponse.message},${jsonResponse.data.ckycNumber},${jsonResponse.data.firstName}\n`;
    } else if (jsonResponse.message && jsonResponse.data === null) {
        // Structure for other messages with null data
        csvContent += "Message\n";
        csvContent += `${jsonResponse.message}\n`;
    } else {
        // Default structure if message is not recognized
        csvContent += "Message\n";
        csvContent += "Unknown Message\n";
    }

    // Set the CSV file name
    let fileName = "response_data.csv";

    // Set the content type for the response to be CSV
    pm.response.headers.add({
        key: 'Content-Disposition',
        value: `attachment; filename="${fileName}"`,
    });
    pm.response.headers.add({
        key: 'Content-Type',
        value: 'text/csv'
    });

    // Display the CSV content in the response body
    pm.response.send(csvContent);
} else {
    console.log("No data to save.");
}
