import { Router } from "express";
import usersController from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/", usersController.usersListGet);
usersRouter.get("/new", usersController.usersCreateGet);
usersRouter.post("/new", usersController.usersCreatePost);
usersRouter.get("/delete", usersController.usersDeleteGet);
// usersRouter.get("/:id/update", usersController.usersUpdateGet);
// usersRouter.post("/:id/update", usersController.usersUpdatePost);
// usersRouter.post("/:id/delete", usersController.usersDeletePost);
// usersRouter.get("/search", usersController.usersSearchGet);


export default usersRouter;
