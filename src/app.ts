import express from "express";
import dotenv from "dotenv";
import { createDbConnection } from "./db/dbConfig";
import usersRouter from "./routes/usersRoute";
import cors from "cors";

dotenv.config();

createDbConnection();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors({ origin: ["http://localhost:4000"] }));

app.use("/users", usersRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
