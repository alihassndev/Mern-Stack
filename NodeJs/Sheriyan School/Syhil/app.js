const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");

const db = require("./config/mongoose-connection");
const ownerRouter = require("./routes/ownerRouter");
const userRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/owner", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen("3000", () => {
  console.log("Server is listening ...");
});
