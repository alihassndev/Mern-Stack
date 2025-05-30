import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/BlogUser`);

    console.log(`DB is connected`);
  } catch (error) {
    console.log(`DB connection error: `, error);
  }
};

export { connectdb };
