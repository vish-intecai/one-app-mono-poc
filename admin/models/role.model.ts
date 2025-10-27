import mongoose from "mongoose";

export const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permissions: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
},{
    timestamps: true,
});

export const RoleModel = mongoose.model("Role", RoleSchema) || mongoose.models.Role;