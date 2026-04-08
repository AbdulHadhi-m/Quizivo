import QuizAttempt from "../models/QuizAttempt.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

export const submitQuizAttempt = async (req, res) => {
  const {
    category,
    difficulty,
    type,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    unanswered,
    score,
    percentage,
    timeTaken,
  } = req.body;

  const foundCategory = await Category.findById(category);

  if (!foundCategory) {
    res.status(404);
    throw new Error("Category not found");
  }

  const attempt = await QuizAttempt.create({
    user: req.user._id,
    category,
    difficulty,
    type,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    unanswered,
    score,
    percentage,
    timeTaken,
  });

  await User.findByIdAndUpdate(req.user._id, {
    $inc: {
      totalScore: score,
      quizzesPlayed: 1,
    },
  });

  res.status(201).json(attempt);
};

export const getMyQuizAttempts = async (req, res) => {
  const attempts = await QuizAttempt.find({ user: req.user._id })
    .populate("category", "name slug")
    .sort({ createdAt: -1 });

  res.json(attempts);
};