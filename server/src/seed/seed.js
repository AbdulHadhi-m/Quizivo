import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Question from "../models/Question.js";
import QuizAttempt from "../models/QuizAttempt.js";
import categories from "./categories.js";
import questions from "./questions.js";

dotenv.config();

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeAttempt({
  userId,
  categoryId,
  difficulty,
  type,
  totalQuestions,
  score,
  percentage,
  timeTaken,
  createdAt,
}) {
  const correctAnswers = Math.round((percentage / 100) * totalQuestions);
  const wrongAnswers = Math.max(0, totalQuestions - correctAnswers);

  return {
    user: userId,
    category: categoryId,
    difficulty,
    type,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    unanswered: 0,
    score,
    percentage,
    timeTaken,
    createdAt,
    updatedAt: createdAt,
  };
}

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Category.deleteMany();
    await Question.deleteMany();
    await QuizAttempt.deleteMany();

    const adminUser = await User.create({
      name: "Admin",
      email: "admin@quizivo.com",
      password: "123456",
      role: "admin",
    });

    const demoUser = await User.create({
      name: "Demo User",
      email: "demo@quizivo.com",
      password: "123456",
      avatar: "/avatars/avatar-1.png",
      role: "user",
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

    // Fake users + attempts to populate leaderboard (today/week/month)
    const fakeUsers = await User.insertMany([
      { name: "Noah Martinez", email: "noah@quizivo.com", password: "123456" },
      { name: "Ethan Carter", email: "ethan@quizivo.com", password: "123456" },
      { name: "Ryan Kim", email: "ryan@quizivo.com", password: "123456" },
      { name: "Madelyn Dias", email: "madelyn@quizivo.com", password: "123456" },
      { name: "Ava Patel", email: "ava@quizivo.com", password: "123456" },
      { name: "Liam Chen", email: "liam@quizivo.com", password: "123456" },
      { name: "Zara Khan", email: "zara@quizivo.com", password: "123456" },
    ]);

    const allUsers = [adminUser, demoUser, ...fakeUsers];
    const categoryIds = createdCategories.map((c) => c._id);
    const difficulties = ["easy", "medium", "hard"];
    const types = ["multiple", "boolean"];

    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const attempts = [];

    // Create attempts for the "top 3" today/week/month vibe
    const named = new Map(allUsers.map((u) => [u.email, u]));
    const noah = named.get("noah@quizivo.com");
    const ethan = named.get("ethan@quizivo.com");
    const ryan = named.get("ryan@quizivo.com");

    const scienceId = categoryMap["Science"] || pick(categoryIds);
    const techId = categoryMap["Technology"] || pick(categoryIds);
    const gkId = categoryMap["General Knowledge"] || pick(categoryIds);

    // Today (3 users)
    attempts.push(
      makeAttempt({
        userId: noah._id,
        categoryId: scienceId,
        difficulty: "medium",
        type: "multiple",
        totalQuestions: 10,
        score: 741,
        percentage: 90,
        timeTaken: 48,
        createdAt: new Date(startOfToday.getTime() + 1000 * 60 * 20),
      }),
      makeAttempt({
        userId: ethan._id,
        categoryId: gkId,
        difficulty: "easy",
        type: "multiple",
        totalQuestions: 10,
        score: 632,
        percentage: 80,
        timeTaken: 55,
        createdAt: new Date(startOfToday.getTime() + 1000 * 60 * 35),
      }),
      makeAttempt({
        userId: ryan._id,
        categoryId: techId,
        difficulty: "medium",
        type: "boolean",
        totalQuestions: 10,
        score: 741,
        percentage: 90,
        timeTaken: 44,
        createdAt: new Date(startOfToday.getTime() + 1000 * 60 * 52),
      })
    );

    // Demo user's visible history (recent attempts)
    attempts.push(
      makeAttempt({
        userId: demoUser._id,
        categoryId: scienceId,
        difficulty: "easy",
        type: "multiple",
        totalQuestions: 10,
        score: 420,
        percentage: 70,
        timeTaken: 66,
        createdAt: new Date(startOfToday.getTime() + 1000 * 60 * 10),
      }),
      makeAttempt({
        userId: demoUser._id,
        categoryId: techId,
        difficulty: "medium",
        type: "boolean",
        totalQuestions: 10,
        score: 510,
        percentage: 80,
        timeTaken: 58,
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2),
      }),
      makeAttempt({
        userId: demoUser._id,
        categoryId: gkId,
        difficulty: "hard",
        type: "multiple",
        totalQuestions: 15,
        score: 610,
        percentage: 75,
        timeTaken: 102,
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 12),
      })
    );

    // Week and month (more attempts for everyone)
    for (const u of allUsers) {
      const weeklyAttempts = randInt(2, 5);
      const monthlyAttempts = randInt(3, 8);

      for (let i = 0; i < weeklyAttempts; i++) {
        const daysAgo = randInt(1, 6);
        const createdAt = new Date(now);
        createdAt.setDate(now.getDate() - daysAgo);
        createdAt.setHours(randInt(9, 22), randInt(0, 59), 0, 0);

        const percentage = pick([60, 70, 80, 90, 100]);
        const totalQuestions = pick([5, 10, 15]);
        const score = randInt(150, 420) + Math.round((percentage / 100) * 200);

        attempts.push(
          makeAttempt({
            userId: u._id,
            categoryId: pick(categoryIds),
            difficulty: pick(difficulties),
            type: pick(types),
            totalQuestions,
            score,
            percentage,
            timeTaken: randInt(30, 120),
            createdAt,
          })
        );
      }

      for (let i = 0; i < monthlyAttempts; i++) {
        const daysAgo = randInt(8, 28);
        const createdAt = new Date(now);
        createdAt.setDate(now.getDate() - daysAgo);
        createdAt.setHours(randInt(9, 22), randInt(0, 59), 0, 0);

        const percentage = pick([50, 60, 70, 80, 90]);
        const totalQuestions = pick([5, 10, 15]);
        const score = randInt(120, 380) + Math.round((percentage / 100) * 180);

        attempts.push(
          makeAttempt({
            userId: u._id,
            categoryId: pick(categoryIds),
            difficulty: pick(difficulties),
            type: pick(types),
            totalQuestions,
            score,
            percentage,
            timeTaken: randInt(30, 150),
            createdAt,
          })
        );
      }
    }

    const createdAttempts = await QuizAttempt.insertMany(attempts);

    // Update user totals (all-time leaderboard uses User.totalScore/quizzesPlayed)
    const totals = new Map();
    for (const a of createdAttempts) {
      const key = String(a.user);
      const prev = totals.get(key) || { score: 0, quizzesPlayed: 0 };
      prev.score += a.score || 0;
      prev.quizzesPlayed += 1;
      totals.set(key, prev);
    }

    const bulk = [];
    for (const [userId, t] of totals.entries()) {
      bulk.push({
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(userId) },
          update: { $set: { totalScore: t.score, quizzesPlayed: t.quizzesPlayed } },
        },
      });
    }
    if (bulk.length) await User.bulkWrite(bulk);

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