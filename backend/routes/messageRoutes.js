import express, { Router } from "express";
import {
  sendMessage,
  getMessage,
  postLike,
} from "../controller/messageController.js";
import protectRoute from "../middleware/protectRoute.js";
const router = Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessage);
router.post("/like/:id", protectRoute, postLike);
export default router;
