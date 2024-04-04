import { Router } from "express";
import {
  sendMessage,
  getMessage,
  postLike,
  getConversation,
  getStartChat,
} from "../controller/messageController.js";
import protectRoute from "../middleware/protectRoute.js";
const router = Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/conversation", protectRoute, getConversation);
router.get("/:id", protectRoute, getMessage);
router.post("/like/:id", protectRoute, postLike);
router.get("/startChat/:id", protectRoute, getStartChat);
export default router;
