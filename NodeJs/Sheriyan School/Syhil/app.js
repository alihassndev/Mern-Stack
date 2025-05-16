const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

const db = require("./config/mongoose-connection");
const ownerRouter = require("./routes/ownerRouter");
const userRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");
const index = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/owner", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/", index);

app.get("/shop", (req, res) => {
  res.render("shop");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.listen("3000", () => {
  console.log("Server is listening ...");
});
