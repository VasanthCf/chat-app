import Conversation from "../model/conversationModel.js";
import User from "../model/userModel.js";

export const getUserSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const allUser = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    res.status(200).json(allUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
