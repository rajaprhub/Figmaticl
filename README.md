

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
    let selectedFields = {
        "message": jsonResponse.message || "Unknown Message",
        "ckycNumber": jsonResponse.data && jsonResponse.data.ckycNumber ? jsonResponse.data.ckycNumber : "N/A",
        "firstName": jsonResponse.data && jsonResponse.data.firstName ? jsonResponse.data.firstName : "N/A"
    };

    // Display selected fields as JSON in the Postman console
    console.log("Selected Fields:");
    console.log(JSON.stringify(selectedFields, null, 2));
} else {
    console.log("No data to display.");
}
