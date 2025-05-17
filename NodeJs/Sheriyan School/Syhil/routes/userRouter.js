const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const { registerUser, loginUser } = require("../controllers/authcontroller");

router.get("/", (req, res) => {
  res.send("Welcome to users router");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/cart", (req, res) => {
  res.render("cart");
});

module.exports = router;
