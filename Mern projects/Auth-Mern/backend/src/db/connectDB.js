import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log(`${process.env.MONGO_URI}/${process.env.MONGO_NAME}`);

const connectdb = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_NAME}`
    );
    console.log("✅ MongoDB is connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

export { connectdb };
