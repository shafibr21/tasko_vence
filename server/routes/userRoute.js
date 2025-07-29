import express from "express";

import {
  authMe,
  loginUser,
  logoutUser,
  registerUser,

} from "../controllers/userController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post('/auth/logout', logoutUser);
userRouter.get('/auth/me', requireAuth, authMe);

export default userRouter;