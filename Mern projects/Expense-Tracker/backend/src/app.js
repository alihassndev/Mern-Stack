import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello i am working ...");
});

export default app;
