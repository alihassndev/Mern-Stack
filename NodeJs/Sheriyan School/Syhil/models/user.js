const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: 3,
  },
  email: String,
  password: String,
  cart: {
    type: Array,
    default: [],
  },
  order: {
    type: Array,
    default: [],
  },
  contact: Number,
  image: String,
});

module.exports = mongoose.model("user", userSchema);
