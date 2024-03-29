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
} else {
    console.log("No data to save.");
}
