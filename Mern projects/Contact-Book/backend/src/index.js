import app from "./app.js";
import { dbConnection } from "./db/index.js";

dbConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Server listening error: ", err));
