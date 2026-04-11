import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import questionRoutes from "./src/routes/questionRoutes.js";
import quizRoutes from "./src/routes/quizRoutes.js";
import leaderboardRoutes from "./src/routes/leaderboardRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import aiQuizRoutes from "./src/routes/aiQuizRoutes.js";
import notFound from "./src/middleware/notFoundMiddleware.js";
import { errorHandler } from "./src/middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Quizivo API is running..." });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/ai-quiz", aiQuizRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;