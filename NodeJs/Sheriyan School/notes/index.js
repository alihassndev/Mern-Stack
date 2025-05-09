const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    console.log(files);
    res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    `${req.body.description}`,
    (err) => {
      console.log("written");
    }
  );
  console.log(req.body);
  res.redirect("/");
});

app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
    res.render("show", {
      filename: req.params.filename,
      content: data,
    });
  });
});

app.listen("3000", () => {
  console.log("Server is listening ...");
});
