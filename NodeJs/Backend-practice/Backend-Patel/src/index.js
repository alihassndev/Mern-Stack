import app from "./app.js";
import { connectDB } from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(`Server Error: ${err}`));
