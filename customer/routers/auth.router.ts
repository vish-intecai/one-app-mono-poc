import { Router } from "express";
import AuthController from "@controllers/auth.controller";

const router = Router();

router.post("/sign-in", AuthController.signIn);
router.post("/sign-up", AuthController.signUp);
router.get("/verify", AuthController.verify);
router.put("/profile", AuthController.profile);

export default router;