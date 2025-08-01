import { Guideline } from "../model/guideline.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create guideline
export const createGuideline = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content) throw new ApiError(400, "Title and content required");

  const guideline = await Guideline.create({
    title,
    content,
    category: category || null,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, guideline, "Guideline created successfully"));
});

// Get all guidelines
export const getGuidelines = asyncHandler(async (req, res) => {
  const { category, active } = req.query;

  let query = {};

  // Filter by active status (default to true)
  if (active !== "false") {
    query.isActive = true;
  }

  // Filter by category if provided
  if (category && category !== "all") {
    query.category = category;
  }

  const guidelines = await Guideline.find(query).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, guidelines, "Guidelines fetched successfully"));
});

// Update guideline
export const updateGuideline = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, category, isActive } = req.body;

  const updateData = {};
  if (title) updateData.title = title;
  if (content) updateData.content = content;
  if (category !== undefined) updateData.category = category || null;
  if (isActive !== undefined) updateData.isActive = isActive;

  const guideline = await Guideline.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );

  if (!guideline) throw new ApiError(404, "Guideline not found");

  return res
    .status(200)
    .json(new ApiResponse(200, guideline, "Guideline updated successfully"));
});

// Delete guideline
export const deleteGuideline = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const guideline = await Guideline.findByIdAndDelete(id);
  if (!guideline) throw new ApiError(404, "Guideline not found");
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Guideline deleted successfully"));
});

// Broadcast guidelines (send to all users)
export const broadcastGuidelines = asyncHandler(async (req, res) => {
  const { message } = req.body;
  // This is a placeholder: actual implementation would use notifier.js to send to all users
  // For now, just return success
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Guidelines broadcasted successfully"));
});
