const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generatetoken } = require("../utils/generatetoken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, fullname, password } = req.body;

    let userexist = await userModel.findOne({ email });

    if (!userexist) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            return res.send(err.message);
          } else {
            let user = await userModel.create({
              email,
              fullname,
              password: hash,
            });

            let token = generatetoken(user);
            res.cookie("token", token);
            res.send("user created successfully");
          }
        });
      });
    } else {
      return res.status(401).send("You aleady have account");
    }
  } catch (error) {
    res.send(error.message);
  }
};
