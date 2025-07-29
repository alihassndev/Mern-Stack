import dotenv from "dotenv";
import { connectDB } from "./db/dbConnection.js";
import { httpServer } from "./app.js";
import "./utils/cron.js";

dotenv.config();

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    httpServer.listen(port, () => {
      console.log(`🚀 Server is running on port: ${port}`);
      console.log(
        `📊 Database: ${process.env.MONGO_URI ? "Connected" : "Not configured"}`
      );
    });
  })
  .catch((err) => console.error("❌ Server error: ", err));
