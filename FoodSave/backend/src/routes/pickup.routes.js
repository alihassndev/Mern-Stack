import { Router } from "express";
import {
  createRequest,
  updateRequestStatus,
  completeRequest,
  updateDeliveryLocation,
  getAllRequests
} from "../controller/pickup.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createRequest);
router.route("/").get(verifyJWT, getAllRequests);


router.route("/:requestId/status").patch(verifyJWT, updateRequestStatus);

router.route("/:requestId/complete").patch(verifyJWT, completeRequest);

// New tracking endpoint
router.route("/:requestId/location").put(verifyJWT, updateDeliveryLocation);

export default router;
