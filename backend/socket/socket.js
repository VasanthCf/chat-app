import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "./../model/messageModel.js";
import Conversation from "./../model/conversationModel.js";
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

  socket.on("markSeen", async (data) => {
    try {
      const conv = await Conversation.findOne(
        {
          participants: { $all: [data.receiverId, data.senderId] },
        },
        "participants lastMessage unreadCounts"
      );

      const senderIndex = conv.unreadCounts.findIndex(
        (item) => item.user.toString() === data.senderId.toString()
      );

      await Message.updateMany(
        {
          $or: [
            { receiverId: data.receiverId, senderId: data.senderId },
            { receiverId: data.senderId, senderId: data.receiverId },
          ],
          seen: false,
        },
        { $set: { seen: true } }
      );
      conv.lastMessage.seen = true;
      conv.unreadCounts[senderIndex].count = 0;
      await conv.save();
      io.to(getReceiverSocketId(data.receiverId)).emit("messageSeen", {
        conversationId: conv._id,
      });
    } catch (err) {
      console.log(err.message);
    }
  });
  //typing functionality...........
  socket.on("sendTyping", (data) => {
    io.to(getReceiverSocketId(data.receiverId)).emit("isTyping", {
      isTyping: data.isTyping,
      receiverId: data.receiverId,
      senderId: data.senderId,
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
