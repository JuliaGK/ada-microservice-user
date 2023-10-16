import { Router } from "express";
import { addUser, getUser } from "../controllers/usersController";

const usersRouter = Router();

usersRouter.get("/getUsers");

usersRouter.get("/:id", getUser);

usersRouter.post("/addUser", addUser);

usersRouter.put("/updateUser");

usersRouter.delete("/deleteUser");

export default usersRouter;
