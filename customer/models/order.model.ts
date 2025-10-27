import mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    items:{
        type:Array,
        required:true,
        items:{
            type:Object,
            itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "items.items.itemType" },
            itemName: { type: String, required: true },
            itemPrice: { type: String, required: true },
            itemType: { 
                type: String, 
                required: true, 
                enum: ["Product", "Food", "Service"] 
            },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }
    },
    overallPrepOrPackingTimeInMinutes: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" },
    sellerStatus: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" },
    deliveryStatus: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" },
}, { timestamps: true });

export const OrderModel = mongoose.model("Order", OrderSchema);