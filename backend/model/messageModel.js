import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    replied: {
      replyMsg: {
        type: String,
        default: "",
      },
      senderId: {
        type: String,
        default: "",
      },
    },
    like: {
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          likeEmoji: {
            type: String,
            default: "",
          },
        },
      ],
      default: [],
    },
    likeAnimated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
