import { Router, Request, Response } from "express";
import Responder from "@utils/responder.util";
import AuthRouter from "./auth.router";
import FoodCategoryRouter from "./food-category.router";
import FoodSubcategoyRouter from "./food-subcategory.router";
import FoodRouter from "./food.router";


const router = Router();

router.get("/", (req:Request, res:Response) => {
    try {
        Responder.successResponse(res, "Hello World, Running Seller");
    } catch (error:any) {
        console.log(error);
        Responder.errorResponse(res, error);
    }
});


router.use("/auth", AuthRouter);
router.use("/food-category", FoodCategoryRouter);
router.use("/food-subcategory", FoodSubcategoyRouter);
router.use("/food", FoodRouter);



export default router;