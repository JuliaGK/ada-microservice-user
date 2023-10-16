const sqlite3 = require("sqlite3").verbose();
const filePath = "./src/db/events.db";

let db: any = null;

const createDbConnection = () => {
    db = new sqlite3.Database(filePath, (error: any) => {
        if (error) {
            return console.error(error.message);
        }
    });
    console.log("Connection with SQLite has been estabilished");
    createTableUsers();
    return db;
};

const createTableUsers = () => {
    db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(50)
    );
    `);
};
export { createDbConnection, db };
