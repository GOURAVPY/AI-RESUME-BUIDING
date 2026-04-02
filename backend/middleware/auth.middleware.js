import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // 📥 Get token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ No token
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 🔐 Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ IMPORTANT: use decoded.userId
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Not authorized" });
  }
};
