import mongoose from "mongoose";

export const SellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},{
    timestamps: true,
});

export const DeliveryAgentModel = mongoose.model("Seller", SellerSchema) || mongoose.models