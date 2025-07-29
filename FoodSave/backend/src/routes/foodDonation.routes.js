import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createFoodDonation,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,updateDonationStatus
} from "../controller/foodDonation.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(getDonations)
  .post(verifyJWT,upload.array("images", 5), createFoodDonation);

router
  .route("/:id")
  .get(getDonationById)
  .patch(verifyJWT, upload.array("images", 5), updateDonation)
  .delete(verifyJWT, deleteDonation);

  router.route("/status/:id").patch(updateDonationStatus);
export default router;
