import express from "express";
import {
  getUserById,
  getUserResumes,
  loginUser,
  registerUser,
} from "../controller/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/data", protect, getUserById);
userRouter.get("/resume", protect, getUserResumes);

export default userRouter;