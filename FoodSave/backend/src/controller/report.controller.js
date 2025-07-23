import { asyncHandler } from "../utils/asyncHandler.js";
import { FoodDonation } from "../models/foodDonation.model.js";
import { PickupRequest } from "../models/pickupRequest.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getSystemStats = asyncHandler(async (req, res) => {
  const [donations, requests] = await Promise.all([
    FoodDonation.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    PickupRequest.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { donations, requests }, "System stats fetched")
    );
});

export { getSystemStats };
