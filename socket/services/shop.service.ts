import { ShopModel } from "@/models/shop.model";

export class ShopService {
  static async createShop(shopData: any) {
    const newShop = await ShopModel.create(shopData);
    return newShop;
  }

  static async getAllShops() {
    const shops = await ShopModel.find().populate("seller", "name email");
    return shops;
  }

  static async getShopById(id: string) {
    if (!id) {
      throw new Error("Shop ID is required");
    }
    const shop = await ShopModel.findById(id).populate("seller", "name email");
    return shop;
  }

  static async updateShop(id: string, shopData: any) {
    const updatedShop = await ShopModel.findByIdAndUpdate(id, shopData, { new: true });
    return updatedShop;
  }

  static async deleteShop(id: string) {
    const deletedShop = await ShopModel.findByIdAndDelete(id);
    return deletedShop;
  }
}
