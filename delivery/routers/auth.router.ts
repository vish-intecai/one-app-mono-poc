import { DeliveryPartnerController } from "@controllers/delivery-partner.controller";
import bearerTokenMiddleware from "@middlewares/bearer-token.middleware";
import { Router } from "express";


const router = Router();

router.post("/sign-up", DeliveryPartnerController.signUp);
router.post("/sign-in", DeliveryPartnerController.signIn);
router.post("/verify",bearerTokenMiddleware, DeliveryPartnerController.verifyDeliveryPartner);


export default router;