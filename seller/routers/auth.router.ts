import express from "express";
import { SellerController } from "@controllers/seller.controller";

const router = express.Router();

// 🧾 Seller Signup (creates seller + shop)
router.post("/sign-up", SellerController.signUp);

// 🔐 Seller Signin (returns JWT)
router.post("/sign-in", SellerController.signIn);

export default router;
