import { Guideline } from "../model/guideline.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Create guideline
export const createGuideline = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) throw new ApiError(400, "Title and content required");
  const guideline = await Guideline.create({ title, content });
  return res
    .status(201)
    .json(new ApiResponse(201, guideline, "Guideline created"));
});

// Get all guidelines
export const getGuidelines = asyncHandler(async (req, res) => {
  const guidelines = await Guideline.find({ isActive: true }).sort({
    createdAt: -1,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, guidelines, "Guidelines fetched"));
});

// Update guideline
export const updateGuideline = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, isActive } = req.body;
  const guideline = await Guideline.findByIdAndUpdate(
    id,
    { $set: { title, content, isActive } },
    { new: true }
  );
  if (!guideline) throw new ApiError(404, "Guideline not found");
  return res
    .status(200)
    .json(new ApiResponse(200, guideline, "Guideline updated"));
});

// Delete guideline
export const deleteGuideline = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const guideline = await Guideline.findByIdAndDelete(id);
  if (!guideline) throw new ApiError(404, "Guideline not found");
  return res.status(200).json(new ApiResponse(200, null, "Guideline deleted"));
});

// Broadcast guidelines (send to all users)
export const broadcastGuidelines = asyncHandler(async (req, res) => {
  const { message } = req.body;
  // This is a placeholder: actual implementation would use notifier.js to send to all users
  // For now, just return success
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Guidelines broadcasted"));
});
