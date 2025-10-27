import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const DeliveryAgentSchema:any = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    current_location:{
        latitude: { type: Number, },
        longitude: { type: Number, },
    },
    is_available: { type: Boolean, default: true },
},{
    timestamps: true,
});


DeliveryAgentSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
};
export const DeliveryAgentModel = mongoose.model("DeliveryAgent", DeliveryAgentSchema) || mongoose.models

