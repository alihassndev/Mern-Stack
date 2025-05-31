import mongoose from "mongoose";
import "dotenv/config";

const dbConnection = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_NAME}`
    );

    console.log("Mongodb Connected successfully ...");
  } catch (err) {
    console.error("DB connection error: ", err);
  }
};

export { dbConnection };
