import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "./../model/messageModel.js";
const app = express();

const server = http.createServer(app);
const userSocketMap = {};
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId !== undefined) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //typing functionality...........
  socket.on("sendTyping", (data) => {
    io.to(getReceiverSocketId(data.receiverId)).emit("isTyping", {
      isTyping: data.isTyping,
      id: data.receiverId,
    });
  });

  socket.on("animateDone", async (data) => {
    const message = await Message.findById(data, "likeAnimated", { new: true });
    if (message) {
      message.likeAnimated = !message.likeAnimated;
      await message.save();
    }
    if (!message) return;
  });
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
