import { SellerModel } from "@models/seller.model";
import { ShopModel } from "@models/shop.model";

export class SellerService {
  // ✅ Create a new seller and a mapped shop
  static async createSeller(sellerData: any) {
    const newSeller = await SellerModel.create(sellerData);

    const newShop = await ShopModel.create({
      name: sellerData.shop_name || `${sellerData.name}'s Shop`,
      address: sellerData.shop_address || "",
      contactNumber: sellerData.contactNumber || "",
      seller: newSeller._id,
    });

    return { seller: newSeller, shop: newShop };
  }

  // ✅ Update seller info
  static async updateSeller(id: string, sellerData: any) {
    const updatedSeller = await SellerModel.findByIdAndUpdate(id, sellerData, {
      new: true,
    });
    return updatedSeller;
  }

  // ✅ Find seller by email (for login)
  static async findByEmail(email: string) {
    return await SellerModel.findOne({ email });
  }
}
