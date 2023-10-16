import { Request, Response } from "express";
import User from "../models/User";
import { db } from "../db/dbConfig";

const addUser = (req: Request, res: Response) => {
    const newUser: User = req.body;
    const sql = `INSERT INTO users (nome)
    VALUES ("${newUser.nome}");`;

    db.run(sql, (error: Error) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        res.status(201);
        res.send("user added");
    });
};

export { addUser };
