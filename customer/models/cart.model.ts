import mongoose from "mongoose";

export const CartSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    items: { type: Array, required: true, items:{
        type:Object,
        itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "items.items.itemType" },
        itemType: { type: String, required: true, enum: ["Product", "Food", "Service"] },
        quantity: { type: Number, required: true },
    } },
}, { timestamps: true });

export const CartModel = mongoose.models.Cart || mongoose.model("Cart", CartSchema);