import { Request, Response } from "express";
import { RoleService } from "@services/role.service";
import Responder from "@utils/responder.util";

export class RoleController {
    static async createRole(req: Request, res: Response) {
        const { name, permissions } = req.body;
        try {
            const role = await RoleService.createRole({ name, permissions });
            return Responder.successResponse(res, role);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }

    static async getRoleById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const role = await RoleService.getRoleById(id);
            if (!role) {
                throw new Error("Role not found");
            }
            return Responder.successResponse(res, role);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }

    static async getAllRoles(req: Request, res: Response) {
        try {
            const roles = await RoleService.getAllRoles();
            return Responder.successResponse(res, roles);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }

    static async updateRole(req: Request, res: Response) {
        const { id } = req.params;
        const updateData = req.body;
        try {
            const role = await RoleService.updateRole(id, updateData);
            if (!role) {
                throw new Error("Role not found");
            }
            return Responder.successResponse(res, role);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }

    static async deleteRole(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const role = await RoleService.deleteRole(id);
            if (!role) {
                throw new Error("Role not found");
            }
            return Responder.successResponse(res, role);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }
}

