const express = require("express");
const app = express();

const userModel = require("./models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const path = require("path");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { username, email, password, age } = req.body;
  const existingUser = await userModel.findOne({ email });

  if (!existingUser) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send("Error generating salt");

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(500).send("Error hashing password");

        await userModel.create({
          username,
          email,
          password: hash,
          age,
        });

        // res.send("User created successfully");
      });
    });
  } else {
    res.send("User already exists");
    return;
  }

  const token = jwt.sign({ email: email }, "secret");
  res.cookie("token", token);
  res.redirect("/");
});

app.get("/read", (req, res) => {
  const token = jwt.verify(req.cookies.token, "secret", async (err, result) => {
    if (result) {
      let users = await userModel.find();
      res.render("read", { users });
    } else {
      res.send("You are un-authorize to see the data !");
    }
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    res.send("Something went wrong");
    return;
  } else {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        let token = jwt.sign(req.body.email, "secret");
        res.cookie("token", token);
        res.render("index");
        return;
      } else {
        res.send("Something went wrong");
        return;
      }
    });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.listen("3000", () => {
  console.log("Server is Listening ...");
});
