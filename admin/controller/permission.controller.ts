import { Request, Response } from "express";
import { PermissionService } from "@services/permission.service";
import Responder from "@utils/responder.util";

export class PermissionController {
    static async createPermission(req: Request, res: Response) {
        const { name, description } = req.body;
        try {
            const permission = await PermissionService.createPermission({ name, description });
            return Responder.successResponse(res, permission);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }

    static async getPermissionById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const permission = await PermissionService.getPermissionById(id);
            if (!permission) {
                throw new Error("Permission not found");
            }
            return Responder.successResponse(res, permission);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }

    static async getAllPermissions(req: Request, res: Response) {
        try {
            const permissions = await PermissionService.getAllPermissions();
            return Responder.successResponse(res, permissions);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }

    static async updatePermission(req: Request, res: Response) {
        const { id } = req.params;
        const updateData = req.body;
        try {
            const permission = await PermissionService.updatePermission(id, updateData);
            if (!permission) {
                throw new Error("Permission not found");
            }
            return Responder.successResponse(res, permission);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }

    static async deletePermission(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const permission = await PermissionService.deletePermission(id);
            if (!permission) {
                throw new Error("Permission not found");
            }
            return Responder.successResponse(res, permission);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }
}
