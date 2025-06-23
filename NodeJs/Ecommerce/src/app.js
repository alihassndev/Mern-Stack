import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.routes.js";
import productRouter from "./routes/admin.routes.js";
import cartRouter from "./routes/cart.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.get("/", (req, res) => {
  res.send("Working fine ...");
});

export default app;
