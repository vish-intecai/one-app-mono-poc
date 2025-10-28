import mongoose from "mongoose";

export const SellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},{
    timestamps: true,
});

export const SellerModel =
  mongoose.models.Seller || mongoose.model("Seller", SellerSchema);