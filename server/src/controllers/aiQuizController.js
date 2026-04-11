import { generateQuizQuestions } from "../services/geminiService.js";

const VALID_AMOUNTS = [5, 10, 15];
const VALID_DIFFICULTIES = ["easy", "medium", "hard"];
const VALID_TYPES = ["multiple", "boolean"];

export const createAIQuiz = async (req, res) => {
  try {
    const { category, difficulty, amount, type, time } = req.body;
    const normalizedDifficulty = String(difficulty || "").toLowerCase();
    const normalizedType = String(type || "").toLowerCase();
    const normalizedAmount = Number(amount);

    if (!category || typeof category !== "string") {
      return res.status(400).json({
        success: false,
        message: "Category is required.",
      });
    }

    if (!VALID_AMOUNTS.includes(normalizedAmount)) {
      return res.status(400).json({
        success: false,
        message: "Amount must be one of: 5, 10, or 15.",
      });
    }

    if (!VALID_DIFFICULTIES.includes(normalizedDifficulty)) {
      return res.status(400).json({
        success: false,
        message: "Difficulty must be easy, medium, or hard.",
      });
    }

    if (!VALID_TYPES.includes(normalizedType)) {
      return res.status(400).json({
        success: false,
        message: "Type must be multiple or boolean.",
      });
    }

    const questions = await generateQuizQuestions({
      category: category.trim(),
      difficulty: normalizedDifficulty,
      amount: normalizedAmount,
      type: normalizedType,
    });

    res.status(200).json({
      success: true,
      meta: { time: Number(time) || 0 },
      questions,
    });
  } catch (error) {
    console.error("AI quiz generation error:", error);
    const statusCode = Number(error?.statusCode) || 500;
    res.status(statusCode).json({
      success: false,
      message:
        error.message || "Unable to generate AI quiz questions right now.",
    });
  }
};