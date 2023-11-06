import { Request, Response } from "express";
import User from "../models/User";
import { initializeDatabase } from "../db/dbConfig";

const addUser = async (req: Request, res: Response) => {
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
};

const getUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    const db = await initializeDatabase();

    try {
        const result = await db.get("SELECT * FROM users WHERE id= ?", id);
        res.send(result);
    } catch (e) {
        console.log(e);
        res.status(400).end(e);
    }
};

export { addUser, getUser };
