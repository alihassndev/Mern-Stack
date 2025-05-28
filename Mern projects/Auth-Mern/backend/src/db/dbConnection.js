import mongoose from "mongoose";

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
