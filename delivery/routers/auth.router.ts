import { DeliveryPartnerController } from "@controllers/delivery-partner.controller";
import { Router } from "express";


const router = Router();

router.post("/sign-up", DeliveryPartnerController.signUp);
router.post("/sign-in", DeliveryPartnerController.signIn);

export default router;