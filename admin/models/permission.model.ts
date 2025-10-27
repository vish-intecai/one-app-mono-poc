import mongoose from "mongoose";


export const PermissionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
},{
    timestamps: true,
});

export const PermissionModel = mongoose.model("Permission", PermissionSchema) || mongoose.models.Permission;    