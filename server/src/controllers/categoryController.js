import Category from "../models/Category.js";
import Question from "../models/Question.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 }).lean();
  const categoryIds = categories.map((c) => c._id);

  const counts = await Question.aggregate([
    { $match: { category: { $in: categoryIds } } },
    { $group: { _id: "$category", totalQuestions: { $sum: 1 } } },
  ]);

  const countMap = new Map(counts.map((c) => [String(c._id), c.totalQuestions]));

  res.json(
    categories.map((c) => ({
      ...c,
      totalQuestions: countMap.get(String(c._id)) || 0,
    }))
  );
};

export const getCategoryBySlug = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).lean();

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const totalQuestions = await Question.countDocuments({ category: category._id });

  res.json({ ...category, totalQuestions });
};

export const createCategory = async (req, res) => {
  const { name, slug, description, image, color, emoji } = req.body;

  const category = await Category.create({
    name,
    slug,
    description,
    image,
    color,
    emoji,
  });

  res.status(201).json(category);
};