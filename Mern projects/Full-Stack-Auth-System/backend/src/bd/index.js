import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_COLLECTION_NAME}`
    );

    console.log(`DB is connected ...`);
  } catch (error) {
    console.log("DB connect error: ", error);
  }
};

export { connectDB };
