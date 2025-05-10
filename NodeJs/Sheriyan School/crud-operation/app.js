const express = require("express");
const app = express();
const path = require("path");
const user = require("./usermodel");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  const users = await user.find();
  console.log(users);

  res.render("read", { users: users });
});

app.post("/create", (req, res) => {
  //   console.log(req.body);

  user.create({
    username: req.body.name,
    email: req.body.email,
    imageURL: req.body.image,
  });

  res.redirect("/");
});

app.get("/edit/:username", async (req, res) => {
  console.log(req.params.username);
  const editUser = await user.findOne({ username: req.params.username });
  res.render("edit", { user: editUser });
});

app.post("/edit", async (req, res) => {
  //   console.log(req.body);
  await user.findOneAndUpdate(
    { username: req.body.previousName },
    {
      username: req.body.newName || req.body.previousName,
      email: req.body.newEmail || req.body.previousEmail,
    }
  );
  res.redirect("/read");
});

app.get("/delete/:username", async (req, res) => {
  await user.findOneAndDelete({ username: req.params.username });

  res.redirect("/read");
});

app.listen("3000", () => {
  console.log("Server is listening ...");
});
