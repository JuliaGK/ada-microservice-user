import { expect, test, beforeEach } from "vitest";
import { initializeDatabase } from "../db/dbConfig";

beforeEach(async () => {
    const dbPromise = initializeDatabase();
    const db = await dbPromise;

    await db.run("DELETE FROM users");
});

test("test if user is added");
