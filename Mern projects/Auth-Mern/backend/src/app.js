import express from "express";
import { registerUser } from "./controller/user.controller.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", registerUser);

export { app };
