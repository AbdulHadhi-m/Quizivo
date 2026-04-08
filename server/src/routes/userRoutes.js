import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import { updateMyAvatar } from "../controllers/userController.js";

const router = express.Router();

router.put("/me/avatar", protect, asyncHandler(updateMyAvatar));

export default router;

