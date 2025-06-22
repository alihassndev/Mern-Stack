import { Router } from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controller/cart.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// All cart routes require authentication
router.use(verifyJWT);

router.route("/add").post(addToCart);
router.route("/").get(getCart);
router.route("/update").patch(updateCartItem);
router.route("/remove/:productId").delete(removeFromCart);
router.route("/clear").delete(clearCart);

export default router;
