import { FoodCategoryController } from "@controllers/food-category.controller";
import express from "express";

const router = express.Router();

// ➕ Create a new category
router.post("/", FoodCategoryController.create);

// 📋 Get all categories
router.get("/", FoodCategoryController.getAll);

// 📄 Get category by ID
router.get("/:id", FoodCategoryController.getById);

// 🔄 Update category by ID
router.put("/:id", FoodCategoryController.update);

// ❌ Delete category by ID
router.delete("/:id", FoodCategoryController.delete);

export default router;
