const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("Working ...");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    username: "ali",
    age: 22,
    email: "ali@gmail.com",
  });

  res.send(user);
});

app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postData: "Hello every this is MongoDB.",
    user: "6821aeb67922575d6eea6707",
  });

  let user = await userModel.findOne({ _id: "6821aeb67922575d6eea6707" });
  user.posts.push(post._id);
  await user.save();

  res.send({
    user,
    post,
  });
});

app.listen("3000", () => {
  console.log("Server is listening ...");
});
