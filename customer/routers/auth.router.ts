import express from "express";
import { CustomerController } from "@controllers/customer.controller";

const CustomerRouter = express.Router();

// 🧾 Signup
CustomerRouter.post("/signup", CustomerController.signUp);

// 🔐 Signin
CustomerRouter.post("/signin", CustomerController.signIn);

export default CustomerRouter;
