import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/generateToken.js";
export async function login(req, res) {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password Dont match" });
    }
    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ error: "userName already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender == "male" ? boyProfile : girlProfile,
    });

    if (newUser) {
      await newUser.save();
      createToken(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function logout(req, res) {
  console.log("login user");
}
export async function signup(req, res) {
  console.log("login user");
}
