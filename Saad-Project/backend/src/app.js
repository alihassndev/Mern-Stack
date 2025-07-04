import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ORIGIN }));
app.use(cookieParser);
app.use(express.static("public"));

app.get("/", (rea, res) => {
  res.send("App route is working fine ...");
});

export default app;
