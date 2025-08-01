import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error: ", error);
  }
};

export { connectDB };
