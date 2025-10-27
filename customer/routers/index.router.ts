import { Router, Request, Response } from "express";
import Responder from "@utils/responder.util";
import authRouter from "@routers/auth.router";
import productRouter from "./product.router";

const router = Router();

router.get("/", (req:Request, res:Response) => {
    try {
        Responder.successResponse(res, "Hello World");
    } catch (error:any) {
        console.log(error);
        Responder.errorResponse(res, error);
    }
});

router.use("/auth", authRouter);
router.use("/products", productRouter);

export default router;