import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireAuth = async (req, res, next) => {
  try {
    let token;
    // fallback to cookie (if you later decide to set cookie)
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // Optional: Get token from Authorization header (preferred for your setup)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
