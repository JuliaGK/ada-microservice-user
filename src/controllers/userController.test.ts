import { expect, test, beforeEach, describe } from "vitest";
import { initializeDatabase } from "../db/dbConfig";
import { faker } from "@faker-js/faker";
import { NotFound, BadRequest } from "http-errors";
import User from "../models/User";
import { getUserHandler, addUserHandler } from "./usersController";

const makeUser = async (user: User) => {
    const db = await initializeDatabase();
    const id = user.id ?? faker.number.int();

    await db.run("INSERT INTO users (id, name) VALUES (?, ?)", [id, user.name]);
};

beforeEach(async () => {
    const dbPromise = initializeDatabase();
    const db = await dbPromise;

    await db.run("DELETE FROM users");
});

describe("tests for getUser", () => {
    test("test if i can get an user", async () => {
        const name = faker.lorem.words(3);

        const userToCreate: User = {
            id: faker.number.int(),
            name: name,
        };

        await makeUser(userToCreate);

        const user = await getUserHandler(userToCreate.id);

        expect(user).toEqual(expect.objectContaining({ name }));
    });

    test("test if it throws an error when getting an invalid user", async () => {
        const id = -1;

        await expect(getUserHandler(id)).rejects.toBeInstanceOf(NotFound);
    });
});

describe("tests for addUser", () => {
    test("test if i can add a user", async () => {
        const userToAdd: User = {
            id: faker.number.int(),
            name: faker.lorem.words(3),
        };

        const result = await addUserHandler(userToAdd);

        expect(result).toBeTruthy();
    });

    test("test if it throws an error when adding a user whithout a valid name", async () => {
        const invalidUserToAdd: User = {
            id: faker.number.int(),
            name: "",
        };

        await expect(addUserHandler(invalidUserToAdd)).rejects.toBeInstanceOf(
            BadRequest
        );
    });
});
