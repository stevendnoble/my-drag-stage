const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('./drag_database.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database opened');
    // You can now create tables or perform transactions
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the main stage of my fabulous Express server!');
});

app.get('/drag_queens', (req, res) => {
  db.serialize(() => {
    db.all(`SELECT * FROM drag_queens`, [], (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.json(rows);
    });
  });
});

app.listen(port, () => {
  console.log(`Express server sashaying on port ${port}`);
});
