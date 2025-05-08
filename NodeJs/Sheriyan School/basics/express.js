const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Middle execute");
  next();
});

app.use((req, res, next) => {
  console.log("Middle execute again");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Node Js");
});

app.get("/about", (req, res) => {
  res.send("Hello ali");
});

// app.get("/profile", (req, res, next) => {
//   return next(new Error("Something broke"));
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong !");
});

app.listen(3000);
