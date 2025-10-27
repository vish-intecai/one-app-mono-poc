import mongoose from "mongoose";

export const DeliveryAgentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const DeliveryAgentModel = mongoose.model("DeliveryAgent", DeliveryAgentSchema) || mongoose.models