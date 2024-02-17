const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./drag_database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database', err);
    return;
  }
  console.log('Database opened successfully.');

  // Create the seasons table
  db.run(`CREATE TABLE IF NOT EXISTS seasons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    year INTEGER NOT NULL
  )`, (err) => {
    if (err) {
      console.log('Error creating seasons table', err);
    } else {
      console.log('Seasons table created or already exists.');

      // Insert Season 1 data
      db.run(`INSERT INTO seasons (name, year) VALUES (?, ?)`, ['Season 1', 2009], function(err) {
        if (err) {
          console.log('Error inserting season 1', err);
        } else {
          console.log(`Season 1 inserted with rowid ${this.lastID}`);
        }
      });
    }
  });

  // Create the drag queens table
  db.run(`CREATE TABLE IF NOT EXISTS drag_queens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age_during_season INTEGER NOT NULL,
    hometown TEXT NOT NULL,
    placement INTEGER NOT NULL,
    season_id INTEGER NOT NULL,
    FOREIGN KEY (season_id) REFERENCES seasons(id)
  )`, (err) => {
    if (err) {
      console.log('Error creating drag_queens table', err);
    } else {
      console.log('Drag_queens table created or already exists.');

      // Insert drag queens from Season 1
      const queens = [
        ['BeBe Zahara Benet', 28, 'Minneapolis, Minnesota', 1, 1],
        ['Nina Flowers', 34, 'Denver, Colorado', 2, 1],
        ['Rebecca Glasscock', 26, 'Fort Lauderdale, Florida', 3, 1],
        ['Shannel', 29, 'Las Vegas, Nevada', 4, 1],
        ['Ongina', 26, 'Los Angeles, California', 5, 1],
        ['Jade', 25, 'Chicago, Illinois', 6, 1],
        ['Akashia', 24, 'Cleveland, Ohio', 7, 1],
        ['Tammie Brown', 28, 'Long Beach, California', 8, 1],
        ['Victoria "Porkchop" Parker', 39, 'Raleigh, North Carolina', 9, 1]
      ];

      const insert = db.prepare(`INSERT INTO drag_queens (name, age_during_season, hometown, placement, season_id) VALUES (?, ?, ?, ?, ?)`);
      queens.forEach(queen => {
        insert.run(queen, function(err) {
          if (err) {
            console.log('Error inserting queen', err);
          } else {
            console.log(`Inserted ${queen[0]} with rowid ${this.lastID}`);
          }
        });
      });
      insert.finalize();
    }
  });
});