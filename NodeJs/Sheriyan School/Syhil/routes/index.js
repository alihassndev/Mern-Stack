const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();

router.get("/", (req, res) => {
  let err = req.flash("error");
  res.render("index", { err });
});

router.get("/shop", isLoggedIn, (req, res) => {
  res.render("shop");
});

module.exports = router;
