import { FoodSubCategoryModel } from "@models/food-subcategory.model";

export class FoodSubCategoryService {
  static async createSubCategory(data: any) {
    return await FoodSubCategoryModel.create(data);
  }

  static async getAllSubCategories() {
    return await FoodSubCategoryModel.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });
  }

  static async getSubCategoryById(id: string) {
    return await FoodSubCategoryModel.findById(id).populate("category", "name");
  }

  static async updateSubCategory(id: string, data: any) {
    return await FoodSubCategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteSubCategory(id: string) {
    return await FoodSubCategoryModel.findByIdAndDelete(id);
  }
}
