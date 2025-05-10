const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Persons");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  imageURL: String,
});

module.exports = mongoose.model("user", userSchema);
