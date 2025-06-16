import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Working perfectly ...");
});

export default app;
