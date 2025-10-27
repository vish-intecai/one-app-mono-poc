import { Request, Response } from "express";

import Responder from "@utils/responder.util";
import { DeliveryPartnerService } from "@services/delivery-partner.service";
import { generateToken, verifyToken } from "@utils/jwt.util";


export class DeliveryPartnerController {
    static async signUp(req: Request, res: Response) {
        const { name, email, password, current_location } = req.body;
        try {
            const deliveryPartner = await DeliveryPartnerService.createDeliveryPartner({ name, email, password, current_location });
            return Responder.successResponse(res, deliveryPartner);
        } catch (error:any) {
            return Responder.errorResponse(res, error.message);
        }
    }
    static async signIn(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const deliveryPartner = await DeliveryPartnerService.getDeliveryPartnerByEmail(email);
            if (!deliveryPartner) {
                throw new Error("Delivery partner not found");
            }
            const isPasswordValid = await deliveryPartner.comparePassword(password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            const token = generateToken({ id: deliveryPartner._id });
            return Responder.successResponse(res, {
                email: email,
                token: token
            });
        } catch (error:any) {
            return Responder.errorResponse(res, error.message);
        }
    }
    static async verifyDeliveryPartner(req: Request, res: Response) {
        const token = req.headers['token'] as string;
        try {
            const decoded = verifyToken(token);
            if (!decoded) {
                throw new Error("Invalid token");
            }
            const deliveryPartner = await DeliveryPartnerService.getDeliveryPartnerById(decoded as any);
            if (!deliveryPartner) {
                throw new Error("Delivery partner not found");
            }
            return Responder.successResponse(res, deliveryPartner);
        } catch (error:any) {
            return Responder.errorResponse(res, error.message);
        }
    }
}