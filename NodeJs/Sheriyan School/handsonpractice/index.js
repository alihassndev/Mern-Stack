const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    console.log(files);
    res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  let filename = req.body.title.split(" ").join("");
  let content = req.body.description || "";

  if (filename.length > 0) {
    filename += ".txt";
    fs.writeFile(`./files/${filename}`, content, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("File created:", filename);
      filename = "";
      content = "";
      res.redirect("/"); // Redirect to home after creating the file
    });
  } else {
    res.send("Please enter a valid title ...");
  }
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}.txt`, "utf-8", (err, data) => {
    res.render("show", {
      filename: req.params.filename,
      content: data,
    });
    // res.redirect(`/file/${req.params.filename}`);
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});

app.post("/edit", (req, res) => {
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}.txt`,
    (err) => {
      res.redirect("/");
    }
  );
  console.log(req.body);
});

app.listen("3000", () => {
  console.log("Server is listening ...");
});
