import mongoose from "mongoose";

export const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

export const CustomerModel =
  mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
