import { Router, Request, Response } from "express";
import Responder from "@utils/responder.util";
import AuthRouter from "@routers/auth.router";
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

router.use("/auth", AuthRouter);
router.use("/order", OrderRouter);

export default router;