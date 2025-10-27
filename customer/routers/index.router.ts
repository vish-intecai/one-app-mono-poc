import { Router, Request, Response } from "express";
import Responder from "@utils/responder.util";
import CustomerRouter from "@routers/order.router";
import OrderRouter from "@routers/order.router";

const router = Router();

router.get("/", (req:Request, res:Response) => {
    try {
        Responder.successResponse(res, "Hello World, Running Customer!");
    } catch (error:any) {
        console.log(error);
        Responder.errorResponse(res, error);
    }
});

router.use("/auth", CustomerRouter);
router.use("/order", OrderRouter);

export default router;