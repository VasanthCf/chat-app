import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const url =
  "mongodb+srv://vegamvasanth11:Vasanth123@blog.yo6ajvk.mongodb.net/chat?retryWrites=true&w=majority&appName=blog";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

mongoose
  .connect(url)
  .then(() => {
    app.listen(3000, () => {
      console.log("app is running successfully");
    });
  })
  .catch(err => {
    console.log(err);
  });
