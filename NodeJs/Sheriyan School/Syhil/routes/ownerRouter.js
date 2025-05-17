const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner");
const bcrypt = require("bcrypt");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.length > 0) {
      return res
        .status(504)
        .send("You don't have permission to create a new onwer");
    }

    let { fullname, email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.send("Something went wrong ...");
      } else {
        bcrypt.hash(password, salt, async (err, hash) => {
          let createdOwner = await ownerModel.create({
            fullname,
            email,
            password: hash,
          });
          res.status(201).send(createdOwner);
        });
      }
    });
  });
}

router.get("/", (req, res) => {
  res.send("Welcome to owner router");
});

router.get("/products", (req, res) => {
  res.render("index");
});

router.get("admin", (req, res) => {
  res.render("createproducts");
});

module.exports = router;

// $env:NODE_ENV="development"
