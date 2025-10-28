import mongoose from "mongoose";
import { configuration } from ".";
import { SellerModel } from "@/models/seller.model";
import { ShopModel } from "@/models/shop.model";


const initializeModels = async () => {
    SellerModel;
    ShopModel;
}

export const connectDB = async () => {
    try {
        await mongoose.connect(configuration.mongodbUrl);
        await initializeModels();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default connectDB;