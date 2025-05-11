const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// Encryption

// app.get("/", (req, res) => {
//   const saltRounds = 10; // default value 10
//   bcrypt.genSalt(saltRounds, (err, salt) => {
//     bcrypt.hash("alihassan", salt, (err, hash) => {
// store hash in DB
//       res.send(hash);
//     });
//   });
// });

// Decryption

// app.get("/", (req, res) => {
//   bcrypt.compare(
//     "alihassan",
//     "$2b$10$L9mHADWmX9tIbbYUw4vhhul37Fn.EMoBp4boe7sqjHPfgrboEvq26", // hash
//     (err, result) => {
//       res.send(result); // true / false
//     }
//   );
// });

// JWT

app.get("/", (req, res) => {
  let token = jwt.sign({ email: "ali@gmail.com" }, "secret");
  res.cookie("token", token);
  res.send("done");
});

app.get("/read", (req, res) => {
  res.send("read");
  //   console.log(req.cookies.token);
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
});

app.listen("3000", () => {
  console.log("Server is listening ...");
});
