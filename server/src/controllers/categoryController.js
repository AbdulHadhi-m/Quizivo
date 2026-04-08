import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
};

export const createCategory = async (req, res) => {
  const { name, slug, description, image, color } = req.body;

  const category = await Category.create({
    name,
    slug,
    description,
    image,
    color,
  });

  res.status(201).json(category);
};