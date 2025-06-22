import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
    console.log(`DB Connected successfully.`);
  } catch (error) {
    console.log(`DB connection Error: ${error}`);
  }
};

export { connectDB };
