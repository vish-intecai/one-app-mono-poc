import { Router } from "express";
import { AdminController } from "controller/admin.controller";

const router = Router();

router.post("/", AdminController.addAdmin);
router.post("/signin", AdminController.signIn);
router.get("/:id", AdminController.getAdminById);
router.put("/:id", AdminController.updateAdmin);

export default router;