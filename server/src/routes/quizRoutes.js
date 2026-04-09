import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import {
  submitQuizAttempt,
  getMyQuizAttempts,
} from "../controllers/quizController.js";

const router = express.Router();

router.post("/attempt", protect, asyncHandler(submitQuizAttempt));
router.get("/attempts/me", protect, asyncHandler(getMyQuizAttempts));

export default router;