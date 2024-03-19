import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const url =
  "mongodb+srv://vegamvasanth11:Vasanth123@blog.yo6ajvk.mongodb.net/chat?retryWrites=true&w=majority&appName=blog";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/users", userRouter);

mongoose
  .connect(url)
  .then(() => {
    app.listen(3000, () => {
      console.log("app is running successfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });
