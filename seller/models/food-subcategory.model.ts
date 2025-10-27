import mongoose from "mongoose";

export const FoodSubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "FoodCategory", required: true },
  description: { type: String },
}, { timestamps: true });

export const FoodSubCategoryModel =
  mongoose.models.FoodSubCategory || mongoose.model("FoodSubCategory", FoodSubCategorySchema);
