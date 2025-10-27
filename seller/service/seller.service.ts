import { SellerModel } from "@models/seller.model";
import { ShopModel } from "@models/shop.model";

export class SellerService {
  // ✅ Create a new seller and a mapped shop
  static async createSeller(sellerData: any) {
    const session = await SellerModel.startSession();
    session.startTransaction();
    try {
      const newSeller = await SellerModel.create([sellerData], { session });

      // Create shop mapped to this seller
      const newShop = await ShopModel.create(
        [
          {
            name: sellerData.shop_name || `${sellerData.name}'s Shop`,
            address: sellerData.shop_address || "",
            contactNumber: sellerData.contactNumber || "",
            seller: newSeller[0]._id,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return { seller: newSeller[0], shop: newShop[0] };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
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
