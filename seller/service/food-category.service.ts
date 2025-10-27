import { FoodCategoryModel } from "@models/food-category.model";

export class FoodCategoryService {
  // ✅ Create category
  static async createCategory(data: any) {
    return await FoodCategoryModel.create(data);
  }

  // ✅ Get all categories
  static async getAllCategories() {
    return await FoodCategoryModel.find().sort({ createdAt: -1 });
  }

  // ✅ Get category by ID
  static async getCategoryById(id: string) {
    return await FoodCategoryModel.findById(id);
  }

  // ✅ Update category
  static async updateCategory(id: string, data: any) {
    return await FoodCategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  // ✅ Delete category
  static async deleteCategory(id: string) {
    return await FoodCategoryModel.findByIdAndDelete(id);
  }
}
