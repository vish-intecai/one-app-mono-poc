import express from "express";
import { CustomerController } from "@controllers/customer.controller";

const router = express.Router();


router.post("/signup", CustomerController.signUp);
router.post("/signin", CustomerController.signIn);


export default router;
