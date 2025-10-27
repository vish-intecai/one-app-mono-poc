import { Request, Response } from "express";

import Responder from "@utils/responder.util";
import { DeliveryPartnerService } from "@services/delivery-partner.service";


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
            const deliveryPartner = await DeliveryPartnerService.createDeliveryPartner({ email, password });
            return Responder.successResponse(res, {email: email});
        } catch (error:any) {
            return Responder.errorResponse(res, error.message);
        }
    }
}