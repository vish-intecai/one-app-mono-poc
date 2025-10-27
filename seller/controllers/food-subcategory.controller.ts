import { Request, Response } from "express";
import Responder from "@utils/responder.util";
import { FoodSubCategoryService } from "@services/food-subcategory.service";

export class FoodSubCategoryController {
  static async create(req: Request, res: Response) {
    try {
      const subcategory = await FoodSubCategoryService.createSubCategory(req.body);
      return Responder.successResponse(res, subcategory, 201);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const subcategories = await FoodSubCategoryService.getAllSubCategories();
      return Responder.successResponse(res, subcategories);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const subcategory = await FoodSubCategoryService.getSubCategoryById(req.params.id);
      return Responder.successResponse(res, subcategory);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const subcategory = await FoodSubCategoryService.updateSubCategory(req.params.id, req.body);
      return Responder.successResponse(res, subcategory);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const subcategory = await FoodSubCategoryService.deleteSubCategory(req.params.id);
      return Responder.successResponse(res, subcategory);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }
}
