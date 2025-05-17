const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const productRouter = require("./routes/products");

dotenv.config();

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is listening ...");
});
