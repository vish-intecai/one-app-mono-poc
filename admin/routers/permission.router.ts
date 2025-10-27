import { PermissionController } from "controller/permission.controller";
import { Router } from "express";


const router = Router();

router.post("/", PermissionController.createPermission);
router.get("/:id", PermissionController.getPermissionById);
router.get("/", PermissionController.getAllPermissions);
router.put("/:id", PermissionController.updatePermission);
router.delete("/:id", PermissionController.deletePermission);

export default router;