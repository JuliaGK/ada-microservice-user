import { Router } from "express";
import { usersController } from "../controllers/usersController";

const usersRouter = Router();

usersRouter.get("/getUsers");

usersRouter.get("/:id", usersController.getUser);

usersRouter.post("/addUser", usersController.addUser);

usersRouter.put("/updateUser");

usersRouter.delete("/deleteUser");

export default usersRouter;
