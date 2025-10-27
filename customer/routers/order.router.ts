import { Router } from "express";
import { OrderController } from "@controllers/order.controller";
import bearerTokenMiddleware from "@middlewares/bearer-token.middleware";

const router = Router();

router.post("/add-order", bearerTokenMiddleware, OrderController.createOrder);

export default router;