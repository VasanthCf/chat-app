import { Router } from "express";
import { login, logout, signup } from "../controller/authController.js";
const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);

authRouter.post("/logout", logout);

export default authRouter;
