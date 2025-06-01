import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_NAME}`
    );

    console.log("MongoDB connected ...");
  } catch (error) {
    console.log("DB connection error: ", error);
  }
};

export { connectDB };
