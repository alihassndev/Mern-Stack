import express from "express";
const app = express();
import dotenv from "dotenv";
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.static("dist"));

// app.get("/", (req, res) => {
//   res.send("Welcome to home page");
// });

app.get("/api/jokes", (req, res) => {
  const jokes = [
    { id: 1, title: "A joke", content: "this is a joke" },
    { id: 2, title: "Another joke", content: "this is another joke" },
    { id: 3, title: "Third joke", content: "this is third joke" },
    { id: 4, title: "fourth joke", content: "this is fourth joke" },
    { id: 5, title: "fifth joke", content: "this is fifth joke" },
  ];

  res.send(jokes);
});

app.listen(port, () => {
  console.log("Server is listening ...");
});
