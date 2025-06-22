import { Router } from "express";
import {
  createProduct,
  getAllProducts as adminGetAllProducts,
  getProductById as adminGetProductById,
  updateProduct,
  deleteProduct,
  addProductReview,
  getProductReviews,
} from "../controller/admin.controller.js";
import {
  getAllProducts,
  getProductById,
  getProductCategories,
  getFeaturedProducts,
  getNewArrivals,
  getProductsByCategory,
} from "../controller/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

// Public product routes (no authentication required)
router.route("/").get(getAllProducts);
router.route("/categories").get(getProductCategories);
router.route("/featured").get(getFeaturedProducts);
router.route("/new-arrivals").get(getNewArrivals);
router.route("/category/:category").get(getProductsByCategory);
router.route("/:productId").get(getProductById);

// Protected routes (require authentication)
router.route("/:productId/reviews").get(getProductReviews);
router.route("/:productId/review").post(verifyJWT, addProductReview);

// Admin routes (require admin authentication)
router
  .route("/admin/create")
  .post(
    verifyJWT,
    authorizeRoles("admin"),
    upload.array("images", 5),
    createProduct
  );
router
  .route("/admin/all")
  .get(verifyJWT, authorizeRoles("admin"), adminGetAllProducts);
router
  .route("/admin/:productId")
  .get(verifyJWT, authorizeRoles("admin"), adminGetProductById);
router
  .route("/admin/:productId")
  .patch(
    verifyJWT,
    authorizeRoles("admin"),
    upload.array("images", 5),
    updateProduct
  );
router
  .route("/admin/:productId")
  .delete(verifyJWT, authorizeRoles("admin"), deleteProduct);

export default router;
