import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
// import cors from "cors"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "base url is working" });
});

export default app;
