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

const getUser = (req: Request, res: Response) => {
    const id = req.params.id;
    const sql = `
        SELECT * FROM users WHERE id=${id};
    `;

    db.get(sql, [], (error: Error, row: any) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        if (row) {
            console.log(row);
            res.send(row);
        } else {
            res.status(404);
            res.send("User not found");
        }
    });
};

export { addUser, getUser };
