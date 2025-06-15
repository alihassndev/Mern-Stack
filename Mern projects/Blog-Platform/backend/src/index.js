import { connectDB } from "./db/index.js";
import app from "./app.js";
import "dotenv/config";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is listening at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server listening error ${err}`);
  });
