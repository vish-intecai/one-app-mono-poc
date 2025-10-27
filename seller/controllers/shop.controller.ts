import { Request, Response } from "express";
import { ShopService } from "@services/shop.service";
import Responder from "@utils/responder.util";

export class ShopController {
  static async createShop(req: Request, res: Response) {
    try {
      const { name, address, contactNumber, seller } = req.body;

      if (!seller) {
        return Responder.errorResponse(res, "Seller ID is required");
      }

      const shop = await ShopService.createShop({ name, address, contactNumber, seller });
      return Responder.successResponse(res, shop);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async getAllShops(req: Request, res: Response) {
    try {
      const shops = await ShopService.getAllShops();
      return Responder.successResponse(res, shops);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async getShopById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const shop = await ShopService.getShopById(id);
      if (!shop) return Responder.errorResponse(res, "Shop not found");
      return Responder.successResponse(res, shop);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async updateShop(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const shop = await ShopService.updateShop(id, req.body);
      if (!shop) return Responder.errorResponse(res, "Shop not found");
      return Responder.successResponse(res, shop);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async deleteShop(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const shop = await ShopService.deleteShop(id);
      if (!shop) return Responder.errorResponse(res, "Shop not found");
      return Responder.successResponse(res, "Shop deleted successfully");
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }
}
