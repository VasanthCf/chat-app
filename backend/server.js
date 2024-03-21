import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
dotenv.config();
const url = process.env.MONGO_URL;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/users", userRouter);

mongoose
  .connect(url)
  .then(() => {
    server.listen(3000, () => {
      console.log("app is running successfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });
