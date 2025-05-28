import "dotenv/config";
import { connectDB } from "./bd/index.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Server error: ", error));
