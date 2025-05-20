const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.get("/", (req, res) => {
  res.send("Welcome back");
});

app.get("/about", (req, res) => {
  res.send("Welcome back on about");
});

app.get("/login", (req, res) => {
  res.send("<h1>Welcome to login page</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("Server is listening ...");
});
