import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { router as userRouter } from "./routes/user.routes.js";
import { router as blogsRouter } from "./routes/blog.routes.js";
// import cors from "cors"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "base url is working" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogsRouter);

export default app;
