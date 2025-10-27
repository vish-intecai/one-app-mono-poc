import mongoose from "mongoose";

export const FoodCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, { timestamps: true });

export const FoodCategoryModel =
  mongoose.models.FoodCategory || mongoose.model("FoodCategory", FoodCategorySchema);
