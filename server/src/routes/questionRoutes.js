import express from "express";
import asyncHandler from "express-async-handler";
import { createQuestion, getQuestions } from "../controllers/questionController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", asyncHandler(getQuestions));
router.post("/", protect, adminOnly, asyncHandler(createQuestion));

export default router;