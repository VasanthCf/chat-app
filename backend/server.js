import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import Conversation from "./model/conversationModel.js";

dotenv.config();
const url = process.env.MONGO_URL;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/users", userRouter);
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
mongoose
  .connect(url)
  .then(async () => {
    server.listen(port, () => {
      console.log("app is running successfully");
    });
  })

  .catch((err) => {
    console.log(err);
  });
