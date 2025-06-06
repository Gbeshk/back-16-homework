import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error();
    }
    await mongoose.connect(mongoUrl);
    console.log("Connected successfully");
  } catch (error) {
    console.error("Could not connect to DB:");
  }
};

export default connectDB;
