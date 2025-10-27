import mongoose from "mongoose";

export const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "FoodCategory", required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "FoodSubCategory", required: true },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  isAvailable: { type: Boolean, default: true },
  image: { type: String },
}, { timestamps: true });

export const FoodModel =
  mongoose.models.Food || mongoose.model("Food", FoodSchema);
