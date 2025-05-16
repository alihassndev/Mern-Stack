const mongoose = require("mongoose");
const config = require("config");

const debuger = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/Syhil`)
  .then(() => {
    debuger("Connected ...");
  })
  .catch((err) => {
    debuger(err);
  });

module.exports = mongoose.connection;

// $env:DEBUG="development:*"; node db.js
// to run debugger
