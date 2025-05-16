const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Syhil")
  .then(() => {
    console.log("Connected ...");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose.connection;
