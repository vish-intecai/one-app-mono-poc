import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const AdminSchema: any = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
},{
    timestamps: true,
});

AdminSchema.pre("save", async function(this: any, next: any) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

AdminSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    const admin = this as any;
    return await bcrypt.compare(password, admin.password);
};

export const AdminModel = mongoose.model("Admin", AdminSchema) || mongoose.models.Admin;