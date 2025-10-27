import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "items.itemType" },
  itemName: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  itemType: { type: String, required: true, enum: ["Product", "Food", "Service"] },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

export const OrderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    items: { type: [ItemSchema], required: true },
    overallPrepOrPackingTimeInMinutes: { type: Number },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" },
    sellerStatus: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" },
    deliveryStatus: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", OrderSchema);
