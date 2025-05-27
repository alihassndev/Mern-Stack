const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const productRouter = require("./routes/products");
const path = require("path");

dotenv.config();

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is listening ...");
});
