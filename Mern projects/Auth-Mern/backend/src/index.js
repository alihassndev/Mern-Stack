import { connectdb } from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config();

connectdb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Connect Error"));
