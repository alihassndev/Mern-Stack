import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);

    console.log(`DB is connected successfully.`);
  } catch (error) {
    console.log(`Error in DB connection: ${error}`);
  }
};

export { connectDB };
