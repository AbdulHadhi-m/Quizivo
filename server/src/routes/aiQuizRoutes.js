import express from "express";
import asyncHandler from "express-async-handler";
import { createAIQuiz } from "../controllers/aiQuizController.js";

const router = express.Router();

router.post("/generate", asyncHandler(createAIQuiz));

export default router;
