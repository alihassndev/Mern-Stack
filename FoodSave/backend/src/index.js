import dotenv from "dotenv";
import { connectDB } from "./db/dbConnection.js";
import { httpServer } from "./app.js";
import "./utils/cron.js";

dotenv.config();

connectDB()
  .then(() => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server is listening at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Server error: ", err));
