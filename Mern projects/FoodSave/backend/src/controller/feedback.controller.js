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

// Get feedback for a specific pickup request
export const getFeedbackForPickup = asyncHandler(async (req, res) => {
  const { pickupRequestId } = req.params;
  
  const feedback = await Feedback.findOne({ pickupRequest: pickupRequestId })
    .populate('ngo', 'username email')
    .populate('pickupRequest');
    
  return res
    .status(200)
    .json(new ApiResponse(200, feedback, "Feedback retrieved successfully"));
});

// Get all feedback for donations by a specific donor
export const getFeedbackForDonor = asyncHandler(async (req, res) => {
  const { donorId } = req.params;
  
  const feedback = await Feedback.find()
    .populate({
      path: 'pickupRequest',
      populate: {
        path: 'donation',
        match: { donor: donorId },
        select: 'title description createdAt expiryDate'
      }
    })
    .populate('ngo', 'username')
    .sort({ createdAt: -1 });
    
  // Filter out feedback where donation doesn't match (due to populate match)
  const validFeedback = feedback.filter(f => f.pickupRequest && f.pickupRequest.donation);
  
  // Calculate donor stats
  const stats = {
    totalFeedback: validFeedback.length,
    averageRating: validFeedback.length > 0 
      ? (validFeedback.reduce((sum, f) => sum + f.rating, 0) / validFeedback.length).toFixed(1)
      : 0,
    ratingDistribution: {
      5: validFeedback.filter(f => f.rating === 5).length,
      4: validFeedback.filter(f => f.rating === 4).length,
      3: validFeedback.filter(f => f.rating === 3).length,
      2: validFeedback.filter(f => f.rating === 2).length,
      1: validFeedback.filter(f => f.rating === 1).length,
    }
  };
    
  return res
    .status(200)
    .json(new ApiResponse(200, {
      feedback: validFeedback,
      stats
    }, "Donor feedback retrieved successfully"));
});

// Get donor profile with feedback summary
export const getDonorProfile = asyncHandler(async (req, res) => {
  const { donorId } = req.params;
  
  // Get donor basic info
  const donor = await User.findById(donorId).select('username email phone createdAt');
  if (!donor) {
    throw new ApiError(404, "Donor not found");
  }
  
  // Get donation count
  const donationCount = await FoodDonation.countDocuments({ donor: donorId });
  
  // Get completed donations count
  const completedDonations = await FoodDonation.countDocuments({ 
    donor: donorId, 
    status: 'completed' 
  });
  
  // Get feedback stats
  const feedback = await Feedback.find()
    .populate({
      path: 'pickupRequest',
      populate: {
        path: 'donation',
        match: { donor: donorId }
      }
    });
    
  const validFeedback = feedback.filter(f => f.pickupRequest && f.pickupRequest.donation);
  
  const profile = {
    donor,
    stats: {
      totalDonations: donationCount,
      completedDonations,
      totalFeedback: validFeedback.length,
      averageRating: validFeedback.length > 0 
        ? (validFeedback.reduce((sum, f) => sum + f.rating, 0) / validFeedback.length).toFixed(1)
        : 0,
      memberSince: donor.createdAt
    },
    recentFeedback: validFeedback.slice(0, 3) // Last 3 feedback
  };
    
  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Donor profile retrieved successfully"));
});

// Get aggregated feedback stats for an NGO
export const getNGOFeedbackStats = asyncHandler(async (req, res) => {
  const { ngoId } = req.params;
  
  const stats = await Feedback.aggregate([
    { $match: { ngo: mongoose.Types.ObjectId(ngoId) } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalFeedback: { $sum: 1 },
        ratingDistribution: {
          $push: '$rating'
        }
      }
    }
  ]);
  
  const recentFeedback = await Feedback.find({ ngo: ngoId })
    .populate({
      path: 'pickupRequest',
      populate: {
        path: 'donation',
        select: 'title'
      }
    })
    .sort({ createdAt: -1 })
    .limit(5);
    
  return res
    .status(200)
    .json(new ApiResponse(200, {
      stats: stats[0] || { averageRating: 0, totalFeedback: 0, ratingDistribution: [] },
      recentFeedback
    }, "NGO feedback stats retrieved successfully"));
});
