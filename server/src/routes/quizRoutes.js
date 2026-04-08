import express from "express";
import asyncHandler from "express-async-handler";
import { getMyQuizAttempts, submitQuizAttempt } from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submit", protect, asyncHandler(submitQuizAttempt));
router.get("/my-attempts", protect, asyncHandler(getMyQuizAttempts));

export default router;