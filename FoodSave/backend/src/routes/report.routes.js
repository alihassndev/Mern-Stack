import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  getSystemStats,
  exportStatsPDF,
  exportStatsCSV,
} from "../controller/report.controller.js";

const router = Router();

router.route("/stats").get(verifyJWT, getSystemStats); // Admin-only
router.route("/stats/pdf").get(verifyJWT, exportStatsPDF);
router.route("/stats/csv").get(verifyJWT, exportStatsCSV);

export default router;
