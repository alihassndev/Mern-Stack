import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_NAME}`
    );

    console.log("DB connected successfully ...");
  } catch (error) {
    console.error("DB connection error: ", error);
  }
};

export { connectDB };
