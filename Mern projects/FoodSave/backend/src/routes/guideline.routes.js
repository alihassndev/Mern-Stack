import { Router } from "express";
import {
  createGuideline,
  getGuidelines,
  updateGuideline,
  deleteGuideline,
  broadcastGuidelines,
} from "../controller/guideline.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").get(getGuidelines).post(verifyJWT, createGuideline);
router.route("/broadcast").post(verifyJWT, broadcastGuidelines);
router
  .route("/:id")
  .put(verifyJWT, updateGuideline)
  .delete(verifyJWT, deleteGuideline);

export default router;
