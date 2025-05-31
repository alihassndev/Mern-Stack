import express from "express";
import { router } from "./routes/test.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/tests", router);

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Base url is working" });
});

export default app;
