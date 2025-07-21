import dotenv from "dotenv";
import { connectDB } from "./db/dbConnection.js";
import app from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Server error: ", err));
