import QuizAttempt from "../models/QuizAttempt.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

export const submitQuizAttempt = async (req, res) => {
  try {
    const {
      category,
      categoryId,
      categoryName,
      categorySlug,
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

    let foundCategory = null;

    if (category) {
      foundCategory = await Category.findById(category);
    } else if (categoryId) {
      foundCategory = await Category.findById(categoryId);
    } else if (categorySlug) {
      foundCategory = await Category.findOne({ slug: categorySlug });
    } else if (categoryName) {
      foundCategory = await Category.findOne({ name: categoryName });
    }

    console.log("req.body:", req.body);
    console.log("foundCategory:", foundCategory?._id);

    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const attempt = await QuizAttempt.create({
      user: req.user._id,
      category: foundCategory._id,
      difficulty,
      type,
      totalQuestions: Number(totalQuestions) || 0,
      correctAnswers: Number(correctAnswers) || 0,
      wrongAnswers: Number(wrongAnswers) || 0,
      unanswered: Number(unanswered) || 0,
      score: Number(score) || 0,
      percentage: Number(percentage) || 0,
      timeTaken: Number(timeTaken) || 0,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        totalScore: Number(score) || 0,
        quizzesPlayed: 1,
      },
    });

    return res.status(201).json(attempt);
  } catch (error) {
    console.error("submitQuizAttempt error:", error);
    return res.status(500).json({ message: "Failed to submit quiz attempt" });
  }
};

export const getMyQuizAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user._id })
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    return res.json(attempts);
  } catch (error) {
    console.error("getMyQuizAttempts error:", error);
    return res.status(500).json({ message: "Failed to fetch quiz attempts" });
  }
};