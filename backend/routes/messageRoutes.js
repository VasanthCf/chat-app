import express, { Router } from "express";
import { sendMessage, getMessage } from "../controller/messageController.js";
import protectRoute from "../middleware/protectRoute.js";
const router = Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessage);

export default router;
