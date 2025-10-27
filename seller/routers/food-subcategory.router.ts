import { FoodSubCategoryController } from "@controllers/food-subcategory.controller";
import express from "express";

const router = express.Router();

// ➕ Create a new subcategory
router.post("/", FoodSubCategoryController.create);

// 📋 Get all subcategories
router.get("/", FoodSubCategoryController.getAll);

// 📄 Get subcategory by ID
router.get("/:id", FoodSubCategoryController.getById);

// 🔄 Update subcategory by ID
router.put("/:id", FoodSubCategoryController.update);

// ❌ Delete subcategory by ID
router.delete("/:id", FoodSubCategoryController.delete);

export default router;
