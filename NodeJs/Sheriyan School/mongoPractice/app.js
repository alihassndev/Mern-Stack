const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("Hello Mongo");
});

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "hassan",
    username: "hassanali",
    email: "hassan@gmail.com",
    age: 20,
  });

  res.send(createdUser);
});

app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { username: "alihassan" },
    { name: "ali hassan" },
    { new: true }
  );

  res.send(updatedUser);
});

app.get("/read", async (req, res) => {
  //   return all user data return array
  let users = await userModel.find();
  //   return object
  //   let users = await userModel.findOne({ name: "ali hassan" });

  res.send(users);
});

app.get("/delete", async (req, res) => {
  const deletedUSer = await userModel.findOneAndDelete({ name: "hassan" });

  res.send(deletedUSer);
});

app.listen("3000", () => {
  console.log("Server is listening ...");
});
