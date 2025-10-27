import mongoose from "mongoose";

export const DeliveryAgentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},{
    timestamps: true,
});

export const DeliveryAgentModel = mongoose.model("DeliveryAgent", DeliveryAgentSchema) || mongoose.models