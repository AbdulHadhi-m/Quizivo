import Question from "../models/Question.js";
import Category from "../models/Category.js";

export const getQuestions = async (req, res) => {
  const { category, difficulty, type, amount } = req.query;

  let filter = {};

  if (category) {
    const foundCategory = await Category.findOne({ name: category });
    if (foundCategory) {
      filter.category = foundCategory._id;
    }
  }

  if (difficulty) filter.difficulty = difficulty;
  if (type) filter.type = type;

  let questions = await Question.find(filter)
    .populate("category", "name slug")
    .lean();

  questions = questions.sort(() => Math.random() - 0.5);

  if (amount) {
    questions = questions.slice(0, Number(amount));
  }

  res.json(questions);
};

export const createQuestion = async (req, res) => {
  const {
    category,
    difficulty,
    type,
    question,
    options,
    answer,
    explanation,
    points,
  } = req.body;

  const foundCategory = await Category.findById(category);

  if (!foundCategory) {
    res.status(404);
    throw new Error("Category not found");
  }

  const newQuestion = await Question.create({
    category,
    difficulty,
    type,
    question,
    options,
    answer,
    explanation,
    points,
  });

  res.status(201).json(newQuestion);
};