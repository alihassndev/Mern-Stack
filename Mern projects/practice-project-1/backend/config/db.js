const { default: mongoose } = require("mongoose");

module.exports.connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connected ...");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // 1 code means failure but 0 means success
  }
};
