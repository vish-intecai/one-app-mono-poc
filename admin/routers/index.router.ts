import { Router, Request, Response } from "express";
import Responder from "utils/responder.util";
import adminRouter from "routers/admin.router";
import roleRouter from "routers/role.router";
import permissionRouter from "routers/permission.router";

const router = Router();

router.get("/", (req:Request, res:Response) => {
    try {
        Responder.successResponse(res, "Hello World");
    } catch (error:any) {
        console.log(error);
        Responder.errorResponse(res, error);
    }
});

router.use("/admin", adminRouter);
router.use("/role", roleRouter);
router.use("/permission", permissionRouter);


export default router;