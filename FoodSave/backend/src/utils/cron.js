import cron from "node-cron";
import { FoodDonation } from "../models/foodDonation.model.js";

// Runs every hour
cron.schedule("0 * * * *", async () => {
  const expired = await FoodDonation.updateMany(
    {
      expiryDate: { $lt: new Date() },
      status: { $nin: ["collected", "expired"] },
    },
    { status: "expired" }
  );

  console.log(`Marked ${expired.modifiedCount} donations as expired`);
});
