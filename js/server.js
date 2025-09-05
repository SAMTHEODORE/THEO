const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const config = {
  user: 'your_db_user',
  password: 'your_db_password',
  server: 'localhost',
  database: 'YourDatabase',
  options: { trustServerCertificate: true }
};

// Add Category
app.post('/api/category', async (req, res) => {
  const { name, short, active } = req.body;
  try {
    await sql.connect(config);
    await sql.query`INSERT INTO Categories (Name, ShortName, IsActive) VALUES (${name}, ${short}, ${active})`;
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Similar endpoints for /api/group, /api/product, /api/sale...

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
