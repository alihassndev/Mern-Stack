const express = require("express");
const router = express.Router();

const {
  getProducts,
  postProducts,
  deleteProduct,
  putProducts,
} = require("../controller/products");

router.get("/", getProducts);

router.post("/", postProducts);

router.delete("/:id", deleteProduct);

router.put("/:id", putProducts);

module.exports = router;
