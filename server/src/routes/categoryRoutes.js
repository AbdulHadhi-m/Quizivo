import express from "express";
import asyncHandler from "express-async-handler";
import {
  createCategory,
  getCategories,
  getCategoryBySlug,
} from "../controllers/categoryController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", asyncHandler(getCategories));
router.get("/:slug", asyncHandler(getCategoryBySlug));
router.post("/", protect, adminOnly, asyncHandler(createCategory));

export default router;