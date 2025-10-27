import express from "express";
import { FoodController } from "@controllers/food.controller";

const router = express.Router();

// ➕ Create new food item
router.post("/", FoodController.create);

// 📋 Get all food items
router.get("/", FoodController.getAll);

// 📄 Get food by ID
router.get("/:id", FoodController.getById);

// 🔄 Update food item
router.put("/:id", FoodController.update);

// ❌ Delete food item
router.delete("/:id", FoodController.delete);

export default router;
