import Conversation from "../model/conversationModel.js";
import Message from "../model/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, reply } = req.body;

    const { id: receiverId } = req.params;

    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        lastMessage: {
          text: message,
          sender: senderId,
        },
      });
    }
    let messageObj = { receiverId, senderId, message };
    if (reply) {
      messageObj = {
        receiverId,
        senderId,
        message,
        replied: {
          replyMsg: reply.replyingMsg,
          senderId: reply.senderId,
        },
      };
    }

    const newMessage = await Message.create(messageObj);

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    conversation.lastMessage = { text: message, sender: senderId };

    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //SEND MESSAGE TO SPECIFIC CLIENT
      io.to(receiverSocketId).emit("newMessage", {
        newMessage,
        receiverId,
        senderId,
      });
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postLike = async (req, res) => {
  try {
    const messageId = req.params.id;
    const { likeIcon, receiverId } = req.body;
    const userId = req.user._id;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    const likedIndex = message.like.findIndex(
      (like) => like.userId.toString() === userId.toString()
    );
    if (likedIndex !== -1) {
      // If user already liked the message, remove the like
      message.like.splice(likedIndex, 1);
    } else {
      // If user hasn't liked the message, add the like
      message.like.push({ userId, likeEmoji: likeIcon });
    }

    // Save the updated message
    await message.save();
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      //SEND MESSAGE TO SPECIFIC CLIENT
      io.to(receiverSocketId).emit("newLike", { message, receiverId });
    }
    // Respond with the updated message
    res.json({ message });

    // Save the updated message
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const user = req.user._id;

    const conversations = await Conversation.find(
      { participants: user },
      "-messages"
    ).populate({
      path: "participants",
      select: "fullName profilePic",
    });

    res.status(200).json({ conversations });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getStartChat = async (req, res) => {
  try {
    const { id: receiverId } = req.params;

    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const conversations = await Conversation.find(
      { participants: senderId },
      "-messages"
    ).populate({
      path: "participants",
      select: "fullName profilePic",
    });

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      //SEND MESSAGE TO SPECIFIC CLIENT
      io.to(receiverSocketId).emit("startConv", "msg");
    }

    res.status(200).json({ conversations });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
