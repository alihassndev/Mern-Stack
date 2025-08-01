import { Router } from "express";
import {
  createFeedback,
  getFeedbackForPickup,
  getFeedbackForDonor,
  getNGOFeedbackStats,
  getDonorProfile,
} from "../controller/feedback.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createFeedback);
router.route("/pickup/:pickupRequestId").get(verifyJWT, getFeedbackForPickup);
router.route("/donor/my-feedback").get(verifyJWT, getFeedbackForDonor);
router.route("/ngo/:ngoId/stats").get(verifyJWT, getNGOFeedbackStats);
router.route("/donor/:donorId").get(verifyJWT, getFeedbackForDonor);
router.route("/donor/:donorId/profile").get(verifyJWT, getDonorProfile);

export default router;
