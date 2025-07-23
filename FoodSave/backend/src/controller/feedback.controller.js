import { Feedback } from "../model/feedback.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// NGO submits feedback after pickup
export const createFeedback = asyncHandler(async (req, res) => {
  const { pickupRequest, rating, comment } = req.body;
  if (!pickupRequest || !rating)
    throw new ApiError(400, "Pickup request and rating required");
  const feedback = await Feedback.create({
    pickupRequest,
    ngo: req.user._id,
    rating,
    comment,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, feedback, "Feedback submitted"));
});

// Get feedback for a pickup request
export const getFeedbackForPickup = asyncHandler(async (req, res) => {
  const { pickupRequestId } = req.params;
  const feedback = await Feedback.findOne({ pickupRequest: pickupRequestId });
  if (!feedback) throw new ApiError(404, "Feedback not found");
  return res
    .status(200)
    .json(new ApiResponse(200, feedback, "Feedback fetched"));
});
