import { Request, Response } from "express";
import User from "../models/User";
import { initializeDatabase } from "../db/dbConfig";
import createError from "http-errors";

const dbPromise = initializeDatabase();

const getUserHandler = async (id: number) => {
    const db = await dbPromise;
    const user = await db.get("SELECT * FROM users WHERE id= ?", id);

    if (user) {
        return user;
    } else {
        throw createError.NotFound();
    }
};

export const addUserHandler = async (user: User) => {
    const db = await dbPromise;

    if (!user.nome) {
        throw createError.BadRequest("Missing name propertie");
    }

    try {
        const result = await db.run(
            `INSERT INTO users (nome) VALUES (?)`,
            user.nome
        );
        return result;
    } catch (error) {
        console.error("Error in addUser: ", error);
        throw createError.InternalServerError();
    }
};

export const usersController = {
    addUser: async (req: Request, res: Response) => {
        const user: User = req.body;
        await addUserHandler(user);
        res.status(201).send("user added");
    },

    getUser: async (req: Request, res: Response) => {
        try {
            const user = await getUserHandler(Number(req.params.id));
            res.json(user);
        } catch (error) {
            res.status(404).send("user not found");
        }
    },
};

export { getUserHandler };
