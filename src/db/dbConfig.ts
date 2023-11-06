import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initializeDatabase = async () => {
    const dbFilename = "./src/db/database.sqlite";

    return open({
        filename: dbFilename,
        driver: sqlite3.Database,
    });
};

export { initializeDatabase };
