const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Setup DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'userpass',
  database: 'mydb',
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MariaDB');
});

// Define route to fetch data
app.get('/', (req, res) => {
  db.query('SELECT * FROM test_table', (err, results) => {
    if (err) {
      return res.status(500).send('Database query error');
    }
    let html = '<h1>Messages from DB</h1><ul>';
    results.forEach(row => {
      html += `<li>${row.message}</li>`;
    });
    html += '</ul>';
    res.send(html);
  });
});

// Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
