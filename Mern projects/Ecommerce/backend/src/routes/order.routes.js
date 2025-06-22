import { Router } from "express";
import {
  createOrder,
  createPaymentIntent,
  updateOrderToPaid,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controller/order.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

// User routes (require authentication)
router.use(verifyJWT);

router.route("/create").post(createOrder);
router.route("/payment-intent").post(createPaymentIntent);
router.route("/my-orders").get(getMyOrders);
router.route("/:orderId").get(getOrderById);
router.route("/:orderId/pay").patch(updateOrderToPaid);

// Admin routes (require admin role)
router.route("/admin/all").get(authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/:orderId/status")
  .patch(authorizeRoles("admin"), updateOrderStatus);
router.route("/admin/:orderId").delete(authorizeRoles("admin"), deleteOrder);

export default router;
