import express from 'express';
import usersController from "../controllers/usersController.js";

const router = express.Router();

router.get("/sign-up-form", usersController.signupFormGet);
router.post("/register", usersController.register);
router.post("/login", usersController.login);

export default router;