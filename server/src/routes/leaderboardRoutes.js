import express from "express";
import asyncHandler from "express-async-handler";
import { getLeaderboard } from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/", asyncHandler(getLeaderboard));

export default router;