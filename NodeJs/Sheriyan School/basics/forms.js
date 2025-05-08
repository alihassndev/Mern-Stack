// session and cookies
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is home page !");
});

app.get("/about", (req, res) => {
  res.send("This is about page !");
});

app.listen("3000");
