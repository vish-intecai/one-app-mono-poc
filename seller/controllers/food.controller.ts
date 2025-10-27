import { Request, Response } from "express";
import Responder from "@utils/responder.util";
import { FoodService } from "@services/food.service";

export class FoodController {
  static async create(req: Request, res: Response) {
    try {
      const food = await FoodService.createFood(req.body);
      return Responder.successResponse(res, food, 201);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const foods = await FoodService.getAllFoods();
      return Responder.successResponse(res, foods);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const food = await FoodService.getFoodById(req.params.id);
      return Responder.successResponse(res, food);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const food = await FoodService.updateFood(req.params.id, req.body);
      return Responder.successResponse(res, food);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const food = await FoodService.deleteFood(req.params.id);
      return Responder.successResponse(res, food);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }
}
