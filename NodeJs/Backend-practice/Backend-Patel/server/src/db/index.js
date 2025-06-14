import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_NAME}`
    );
    console.log(`DB connected ...`);
  } catch (error) {
    console.log(`DB connection error !`);
  }
};

export { connectDB };
