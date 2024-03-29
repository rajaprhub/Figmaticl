

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

    // Exclude log messages with URL links
    const excludePatterns = [
        /https?:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?/gi
    ];

    let lines = csvContent.split('\n').filter(line => {
        return !excludePatterns.some(pattern => line.match(pattern));
    });

    // Reconstruct CSV content without URL log messages
    csvContent = lines.join('\n');

    // Log the filtered CSV content in the Postman console
    console.log("Filtered CSV Content:");
    console.log(csvContent);
} else {
    console.log("No data to save.");
}
