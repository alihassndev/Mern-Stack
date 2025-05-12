const express = require("express");
const app = express();

const userModel = require("./Models/user");
const postModel = require("./Models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ========================
// Routes
// ========================

app.get("/", isloggedin, async (req, res) => {
  // console.log(req.user);

  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { username, email, password, age } = req.body;

  // 1. User should not already exist
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.send("User already exists!");
  }

  // 2. Hash password and create user
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.create({ username, email, password: hashedPassword, age });

    res.redirect("/login");
  } catch (err) {
    res.send("Error while creating user");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.send("Incorrect password");
  }

  // Token creation
  const token = jwt.sign({ email: user.email, userId: user._id }, "secret"); // Store key in .env in real apps
  res.cookie("token", token);
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.get("/profile", isloggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  console.log(user);

  res.render("profile", { user });
});

function isloggedin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const data = jwt.verify(token, "secret"); // Match secret used in login
    req.user = data;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
}

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
