import { FoodModel } from "@models/food.model";



export class FoodService {
    static async getFoodById(ids: any) {
        const food = await FoodModel.find({ _id: { $in: ids } });
        return food;
    }
}