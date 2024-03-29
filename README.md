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

    // Convert CSV content to Blob
    const blob = new Blob([csvContent], {
        type: "text/csv"
    });

    // Create object URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    // Set the href attribute to the object URL
    a.href = url;

    // Set the download attribute with desired file name
    let fileName = "response_data.csv";
    a.download = fileName;

    // Trigger a click event to prompt download
    a.click();

    // Clean up - remove the temporary anchor
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
} else {
    console.log("No data to save.");
}
