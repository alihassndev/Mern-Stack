import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { router as userRouter } from "./routes/user.routes.js";
import { router as taskRouter } from "./routes/tasks.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(cookieParser());

app.use("api/v1/users", userRouter);
app.use("api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ success: true, message: "Working ..." });
});

export default app;
