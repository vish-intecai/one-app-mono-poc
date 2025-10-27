import mongoose from "mongoose";

export const DeliveryAgentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_available: { type: Boolean, default: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
},{
    timestamps: true,
});

export const DeliveryAgentModel = mongoose.model("DeliveryAgent", DeliveryAgentSchema) || mongoose.models