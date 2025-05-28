import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { registerUser } from "./controller/user.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use("/api/v1/users", registerUser);

export default app;
