const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

// Models
const userModel = require("./Models/user");
const postModel = require("./Models/post");
const upload = require("./config/multer");

// ========================
// Middleware and Setup
// ========================
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ========================
// Routes
// ========================

app.get("/", isloggedin, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");
  res.render("index", { user });
});

app.get("/profile/upload", isloggedin, async (req, res) => {
  res.render("profileUpload");
});

app.post(
  "/uploadProfile",
  upload.single("image"),
  isloggedin,
  async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    // console.log(req.file.originalname);

    user.profile = req.file.filename;
    await user.save();

    res.redirect("/profile");
  }
);

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { username, email, password, age } = req.body;

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.redirect("/signup");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.create({ username, email, password: hashedPassword, age });
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.send("Error while creating user");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.send("Incorrect password");
  }

  const token = jwt.sign({ email: user.email, userId: user._id }, "secret");
  res.cookie("token", token);
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.get("/profile", isloggedin, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  // const user = await userModel.find({ email: req.user.email });
  res.render("profile", { user });
});

app.post("/post", isloggedin, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    const { content } = req.body;

    const post = await postModel.create({
      user: user._id,
      content: content.trim(),
    });

    user.posts.push(post._id);
    await user.save();

    // console.log("user created:", user);
    // console.log("Post created:", post);
    res.redirect("/");
  } catch (err) {
    console.log("Error creating post:", err);
    res.status(500).send("Something went wrong.");
  }
});

// ========================
// Middleware
// ========================
function isloggedin(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  try {
    const data = jwt.verify(token, "secret");
    req.user = data;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
}

app.get("/like/:id", isloggedin, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  if (post.likes.indexOf(req.user.userId) === -1) {
    post.likes.push(req.user.userId);
  } else {
    // remove liked id using splice method
    post.likes.splice(post.likes.indexOf(req.user.userId), 1);
  }
  await post.save();
  res.redirect("/");
});

app.get("/edit/:id", isloggedin, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
});

app.post("/update/:id", async (req, res) => {
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  );

  res.redirect("/");
});

// ========================
// Start Server
// ========================

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
