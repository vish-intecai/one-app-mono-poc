import { Request, Response } from "express";
import { AdminService } from "@services/admin.service";
import { generateToken } from "@utils/jwt.util";
import Responder from "@utils/responder.util";

export class AdminController {
    static async addAdmin(req: Request, res: Response) {
        const { name, email, password, roleId } = req.body;
        try {
            const admin = await AdminService.createAdmin({ name, email, password, roleId });
            return Responder.successResponse(res, admin);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }

    static async signIn(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const admin = await AdminService.getAdminByEmail(email);
            if (!admin) {
                throw new Error("Admin not found");
            }
            const isPasswordValid = await admin.comparePassword(password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            const token = generateToken({ id: admin._id });
            return Responder.successResponse(res, {
                email: email,
                token: token
            });
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }

    static async getAdminById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const admin = await AdminService.getAdminById(id);
            if (!admin) {
                throw new Error("Admin not found");
            }
            return Responder.successResponse(res, admin);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }

    static async updateAdmin(req: Request, res: Response) {
        const { id } = req.params;
        const updateData = req.body;
        try {
            const admin = await AdminService.updateAdmin(id, updateData);
            if (!admin) {
                throw new Error("Admin not found");
            }
            return Responder.successResponse(res, admin);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }
}