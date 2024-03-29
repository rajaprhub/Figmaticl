

// Convert CSV content to data URI for download
let csvDataUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);

// Create temporary anchor element for download
let downloadLink = document.createElement("a");
downloadLink.href = csvDataUri;
downloadLink.download = "response_data.csv";

// Trigger click event to initiate download
downloadLink.click();
