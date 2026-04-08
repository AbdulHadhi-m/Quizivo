import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Question from "../models/Question.js";
import categories from "./categories.js";
import questions from "./questions.js";

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Category.deleteMany();
    await Question.deleteMany();

    const adminUser = await User.create({
      name: "Admin",
      email: "admin@quizivo.com",
      password: "123456",
      role: "admin",
    });

    const createdCategories = await Category.insertMany(categories);

    const categoryMap = {};
    createdCategories.forEach((category) => {
      categoryMap[category.name] = category._id;
    });

    const formattedQuestions = questions.map((question) => ({
      category: categoryMap[question.categoryName],
      difficulty: question.difficulty,
      type: question.type,
      question: question.question,
      options: question.options,
      answer: question.answer,
      explanation: question.explanation,
      points: question.points,
    }));

    await Question.insertMany(formattedQuestions);

    console.log("Seed data imported successfully");
    console.log("Admin login:");
    console.log("Email: admin@quizivo.com");
    console.log("Password: 123456");

    process.exit();
  } catch (error) {
    console.error("Seed import failed");
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Category.deleteMany();
    await Question.deleteMany();

    console.log("Seed data destroyed");
    process.exit();
  } catch (error) {
    console.error("Destroy failed");
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}