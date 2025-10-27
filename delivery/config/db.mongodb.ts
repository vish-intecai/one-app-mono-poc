import mongoose from "mongoose";
import configuration from "@config/index";

export const connectDB = async () => {
    try {
        await mongoose.connect(configuration.mongodbUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default connectDB;