import { OrderService } from "@services/order.service";
import Responder from "@utils/responder.util";
import { Request, Response } from "express";

export class OrderController {
    static async createOrder(req: Request, res: Response) {
        const customerId = req.headers['id'] as string;
        console.log(customerId)
        try {
            const itemDetails:any[] =[];
            const order = await OrderService.createOrder({
                customerId: customerId,
                shopId: req.body.shopId,
                items: itemDetails,
            });
            return Responder.successResponse(res, order);
        } catch (error: any) {
            return Responder.errorResponse(res, error.message);
        }
    }
}