import "dotenv/config";
import { dbConnection } from "./db/index.js";
import app from "./app.js";

dbConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(`Server error: ${err}`));
