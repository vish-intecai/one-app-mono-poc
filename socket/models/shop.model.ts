import mongoose from "mongoose";

export const ShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  contactNumber: { type: String },
  status: { type: String, enum: ["open", "closed"], default: "open" },
}, { timestamps: true });

export const ShopModel =
  mongoose.models.Shop || mongoose.model("Shop", ShopSchema);
  
