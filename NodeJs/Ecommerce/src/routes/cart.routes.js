import express from "express";
import {
  addToCart,
  getUserCart,
  removeCartItem,
  updateCartItem,
} from "../controller/cart.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", verifyJWT, addToCart);
router.put("/update", verifyJWT, updateCartItem);
router.delete("/remove/:productId", verifyJWT, removeCartItem);
router.get("/", verifyJWT, getUserCart);

export default router;
