import { Router } from "express";
import AuthController from "@controllers/auth.controller";
import ProductController from "@controllers/product.controller";

const router = Router();

router.get("/", ProductController.getProducts);
router.delete("/", ProductController.deleteProducts);
router.put("/", ProductController.updateProduct);
router.post("/", ProductController.addProducts);

export default router;