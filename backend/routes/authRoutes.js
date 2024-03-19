import { Router } from "express";
import { login, logout, signup } from "../controller/authController.js";
const authRouter = Router();

authRouter.get("/login", login);
authRouter.get("/signup", signup);

authRouter.get("/logput", logout);

export default authRouter;
