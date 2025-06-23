import express from "express";
import {
  getMyOrders,
  getOrderById,
  placeOrder,
} from "../controller/order.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/place", verifyJWT, placeOrder);
router.get("/my", verifyJWT, getMyOrders);
router.get("/:id", verifyJWT, getOrderById);
router.get("/admin/all", verifyJWT, authorizeRoles("admin"), getAllOrders);

export default router;
