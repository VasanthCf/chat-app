import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    unreadCounts: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        count: { type: Number, default: 0 },
      },
    ],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] },
    ],
    lastMessage: {
      text: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      seen: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("conversation", conversationSchema);
export default Conversation;

// : {
//   id: mongoose.Schema.Types.ObjectId,
//   ref: "User",
//   count: { type: Number, default: 0 },
// },
