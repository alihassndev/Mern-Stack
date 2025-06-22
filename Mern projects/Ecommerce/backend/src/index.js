import app from "./app.js";
import { connectDB } from "./db/index.js";
import seedDatabase from "./utils/seeder.js";
import "dotenv/config";

connectDB()
  .then(async () => {
    // Seed database with initial data
    await seedDatabase();

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port: ${process.env.PORT}`);
      console.log(
        `📱 API Base URL: http://localhost:${process.env.PORT}/api/v1`
      );
      console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.error(`❌ Server error: ${err}`);
  });
