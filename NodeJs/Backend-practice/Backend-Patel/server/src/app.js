import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Server is working ...");
});

export default app;
