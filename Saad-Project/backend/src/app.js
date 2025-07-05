import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ORIGIN }));
app.use(cookieParser);
app.use(express.static("public"));

app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("App route is working fine ...");
});

export default app;
