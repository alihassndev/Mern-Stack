import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.use(verifyJWT);
router.use(authorizeRoles("admin"));

router.route("/create").post(upload.array("images", 5), createProduct);
router.route("/update/:id").post(upload.array("images", 5), updateProduct);
router.route("/delete/:id").post(deleteProduct);
router.route("/getProduct/:id").post(getSingleProduct);
router.route("/").get(getAllProducts);

export default router;
