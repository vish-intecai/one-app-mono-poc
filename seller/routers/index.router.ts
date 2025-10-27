import { Router, Request, Response } from "express";
import Responder from "@utils/responder.util";

const router = Router();

router.get("/", (req:Request, res:Response) => {
    try {
        Responder.successResponse(res, "Hello World");
    } catch (error:any) {
        console.log(error);
        Responder.errorResponse(res, error);
    }
});



export default router;