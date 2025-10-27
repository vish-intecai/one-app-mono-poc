import express from "express";
import { SellerController } from "@controllers/seller.controller";

const router = express.Router();

// 🧾 Seller Signup (creates seller + shop)
router.post("/signup", SellerController.signUp);

// 🔐 Seller Signin (returns JWT)
router.post("/signin", SellerController.signIn);

export default router;
