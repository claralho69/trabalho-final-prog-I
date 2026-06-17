const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS filmes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            genero TEXT NOT NULL,
            nota INTEGER NOT NULL
        )
    `);
});

module.exports = db;
