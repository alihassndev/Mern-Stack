import { Router } from "express";
import {
  createRequest,
  updateRequestStatus,
  completeRequest,
  updateDeliveryLocation,
  getAllRequests,
  deleteRequest
} from "../controller/pickup.controller.js";
import { createFeedback } from "../controller/feedback.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createRequest);
router.route("/").get(verifyJWT, getAllRequests);

router.route("/:requestId/status").patch(verifyJWT, updateRequestStatus);
router.route("/:requestId/complete").patch(verifyJWT, completeRequest);
router.route("/:requestId/location").put(verifyJWT, updateDeliveryLocation);
router.route("/:requestId/feedback").post(verifyJWT, createFeedback);
router.route("/:requestId").delete(verifyJWT, deleteRequest);

export default router;
