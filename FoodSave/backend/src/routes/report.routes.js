import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getSystemStats } from "../controllers/report.controller.js";

const router = Router();

router.route("/stats").get(verifyJWT, getSystemStats); // Admin-only

export default router;
