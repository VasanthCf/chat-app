import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
const protectRoute = async (req, res, next) => {
  try {
    // const tokenCookie = req.headers.cookie;
    // const token = tokenCookie?.split("=")[1];
    // console.log(token);

    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized User" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
