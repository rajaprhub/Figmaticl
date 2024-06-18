
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',    // Server name (e.g., 'localhost' or IP address)
  user: 'yourusername', // Database username
  password: 'yourpassword', // Database password
  database: 'yourdatabase'  // Database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as ID ' + connection.threadId);
});

module.exports = connection;
