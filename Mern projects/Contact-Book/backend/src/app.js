import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { router as contactRoutes } from "./routes/contact.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use("/api/v1/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.send("Server is working ...");
});

export default app;
