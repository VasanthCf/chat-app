import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserSideBar } from "../controller/userController.js";
const router = Router();

router.get("/", protectRoute, getUserSideBar);

export default router;
