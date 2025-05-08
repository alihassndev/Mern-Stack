// setting up parser for form
// setting up ejs
// setting up public static file

// Dynamic routing
// how to get data from frontend at backend

const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/profile/:username", (req, res) => {
  const user = req.params.username;
  res.send(`Welcome, ${user}`);
});

app.get("/profile/:username/:age", (req, res) => {
  const user = req.params.username;
  const age = req.params.age;
  res.send(`Welcome, ${user}. You are ${age} years old`);
});

app.listen("3000", () => {
  console.log("Server is listening ...");
});
