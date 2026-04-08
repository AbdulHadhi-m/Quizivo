import express from "express";
import asyncHandler from "express-async-handler";
import { createCategory, getCategories } from "../controllers/categoryController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", asyncHandler(getCategories));
router.post("/", protect, adminOnly, asyncHandler(createCategory));

export default router;