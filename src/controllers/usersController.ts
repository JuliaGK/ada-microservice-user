import { Request, Response } from "express";
import User from "../models/User";
import { initializeDatabase } from "../db/dbConfig";
import createError from "http-errors";

const dbPromise = initializeDatabase();

const getUserHandler = async (id: string) => {
    const db = await dbPromise;
    const user = await db.get("SELECT * FROM users WHERE id= ?", id);

    if (user) {
        return user;
    } else {
        throw createError.NotFound();
    }
};

export const usersController = {
    addUser: async (req: Request, res: Response) => {
        const newUser: User = req.body;
        const db = await initializeDatabase();

        try {
            await db.run(
                `INSERT INTO users (nome)
            VALUES (?)`,
                newUser.nome
            );
        } catch (e) {
            console.log(e);
            res.status(400).end(e);
        }
        res.status(201).send("user added");
    },

    getUser: async (req: Request, res: Response) => {
        try {
            const user = await getUserHandler(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(404).send("user not found");
        }
    },
};
