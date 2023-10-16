import express from "express";
import dotenv from "dotenv";
import { createDbConnection } from "./db/dbConfig";
import usersRouter from "./routes/usersRoute";

dotenv.config();

createDbConnection();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/users", usersRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
