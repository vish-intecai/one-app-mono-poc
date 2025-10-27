import { FoodService } from "@services/food.service";
import { OrderService } from "@services/order.service";
import Responder from "@utils/responder.util";
import { Request, Response } from "express";

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    const customerId = req.headers["id"] as string;
    if (!customerId) return Responder.errorResponse(res, "Missing customer id");
    if (!Array.isArray(req.body.items) || req.body.items.length === 0)
      return Responder.errorResponse(res, "Items required");

    try {
      const items = req.body.items;
      const foodItems = items.filter((i: any) => i.itemType === "Food");
      const foodIds = foodItems.map((i: any) => i.itemId);

      const foods = await FoodService.getFoodById(foodIds);
      if (!foods || foods.length === 0)
        return Responder.errorResponse(res, "No valid food items found");

      const mappedItems = foods.map((food: any) => {
        const reqItem = foodItems.find(
          (i: any) => String(i.itemId) === String(food._id)
        );
        const quantity = reqItem?.quantity || 0;
        const price = food.price * quantity;

        return {
          itemId: food._id,
          itemName: food.name,
          itemPrice: food.price,
          itemType: "Food",
          quantity,
          price
        };
      });

      const totalAmount = mappedItems.reduce((acc, i) => acc + i.price, 0);

      const order = await OrderService.createOrder({
        customer: customerId,
        items: mappedItems,
        totalAmount
      });

      return Responder.successResponse(res, order);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }
}