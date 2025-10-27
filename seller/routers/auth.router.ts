import express from "express";
import { SellerController } from "@controllers/seller.controller";

const AuthRouter = express.Router();

// 🧾 Seller Signup (creates seller + shop)
AuthRouter.post("/signup", SellerController.signUp);

// 🔐 Seller Signin (returns JWT)
AuthRouter.post("/signin", SellerController.signIn);

export default AuthRouter;
