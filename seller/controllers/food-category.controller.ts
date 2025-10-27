import { Request, Response } from "express";
import Responder from "@utils/responder.util";
import { FoodCategoryService } from "service/food-category.service";

export class FoodCategoryController {
  static async create(req: Request, res: Response) {
    try {
      const category = await FoodCategoryService.createCategory(req.body);
      return Responder.successResponse(res, category, 201);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const categories = await FoodCategoryService.getAllCategories();
      return Responder.successResponse(res, categories);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const category = await FoodCategoryService.getCategoryById(req.params.id);
      return Responder.successResponse(res, category);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const category = await FoodCategoryService.updateCategory(req.params.id, req.body);
      return Responder.successResponse(res, category);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const category = await FoodCategoryService.deleteCategory(req.params.id);
      return Responder.successResponse(res, category);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }
}
