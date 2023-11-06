import { expect, test, beforeEach } from "vitest";
import { initializeDatabase } from "../db/dbConfig";
import { faker } from "@faker-js/faker";
import User from "../models/User";
import { getUserHandler } from "./usersController";

const makeUser = async (user: User) => {
    const db = await initializeDatabase();
    const id = user.id ?? faker.number.int();

    await db.run("INSERT INTO users (id, nome) VALUES (?, ?)", [id, user.nome]);
};

beforeEach(async () => {
    const dbPromise = initializeDatabase();
    const db = await dbPromise;

    await db.run("DELETE FROM users");
});

test("test if i can get an user", async () => {
    const nome = faker.lorem.words(3);

    const userToCreate: User = {
        id: faker.number.int().toString(),
        nome,
    };

    await makeUser(userToCreate);

    const user = await getUserHandler(userToCreate.id);

    expect(user).toEqual(
        expect.objectContaining({
            nome,
        })
    );
});
