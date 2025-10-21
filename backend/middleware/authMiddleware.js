import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      return next();
    } catch (error) {
      console.error("❌ Token verification (header) failed:", error.message);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  else if (req.cookies && req.cookies.jwt) {
    try {
      token = req.cookies.jwt;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      return next();
    } catch (error) {
      console.error("❌ Token verification (cookie) failed:", error.message);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
