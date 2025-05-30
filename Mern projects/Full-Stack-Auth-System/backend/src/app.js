import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";

const app = express();

const allowedOrigin = ["http://localhost:5173"];
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome back");
});

app.use("/api/v1/users", userRouter);

export default app;
