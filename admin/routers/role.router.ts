import { Router } from "express";
import { RoleController } from "controller/role.controller";

const router = Router();

router.post("/", RoleController.createRole);
router.get("/:id", RoleController.getRoleById);
router.get("/", RoleController.getAllRoles);
router.put("/:id", RoleController.updateRole);
router.delete("/:id", RoleController.deleteRole);

export default router;