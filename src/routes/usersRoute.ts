import { Router } from "express";
import { addUser } from "../controllers/usersController";

const usersRouter = Router();

usersRouter.get("/getEvents");

usersRouter.post("/addEvent", addUser);

usersRouter.put("/updateEvent");

usersRouter.delete("/deleteEvent");

export default usersRouter;
