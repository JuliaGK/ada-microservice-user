import { Router } from "express";
import { addUser } from "../controllers/usersController";

const usersRouter = Router();

usersRouter.get("/getUsers");

usersRouter.post("/addUser", addUser);

usersRouter.put("/updateUser");

usersRouter.delete("/deleteUser");

export default usersRouter;
