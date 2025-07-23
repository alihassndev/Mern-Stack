import { Router } from "express";
import {
  createFeedback,
  getFeedbackForPickup,
} from "../controller/feedback.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createFeedback);
router.route("/pickup/:pickupRequestId").get(verifyJWT, getFeedbackForPickup);

export default router;
