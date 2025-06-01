import "dotenv/config";
import { connectDB } from "./db/index.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("Server listening error: ", err));
