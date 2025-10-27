import { FoodModel } from "@models/food.model";

export class FoodService {
  static async createFood(data: any) {
    return await FoodModel.create(data);
  }

  static async getAllFoods() {
    return await FoodModel.find()
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("shop", "name")
      .sort({ createdAt: -1 });
  }

  static async getFoodById(id: string) {
    return await FoodModel.findById(id)
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("shop", "name");
  }

  static async updateFood(id: string, data: any) {
    return await FoodModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteFood(id: string) {
    return await FoodModel.findByIdAndDelete(id);
  }
}
