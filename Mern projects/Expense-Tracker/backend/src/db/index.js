import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_NAME}`);

    console.log("DB is connected ...");
  } catch (error) {
    console.log("Error in DB connection ...");
  }
};

export { connectDB };
