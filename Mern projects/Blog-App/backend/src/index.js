import "dotenv/config";
import { connectdb } from "./db/index.js";
import app from "./app.js";

connectdb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening st port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Server error: ", err));
