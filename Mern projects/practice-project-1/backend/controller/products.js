const mongoose = require("mongoose");
const { productModel } = require("../models/products");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(404).json({ success: false, message: "No products found" });
  }
};

module.exports.postProducts = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  const newProduct = productModel(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    let deleteUser = await productModel.findByIdAndDelete({
      _id: req.params.id,
    });

    if (!deleteUser) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid Product ID" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product delete successfully ..." });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports.putProducts = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid id" });
  }
  try {
    let updatedproduct = await productModel.findByIdAndUpdate(id, product, {
      new: true,
    });

    // await updatedproduct.save();
    res.status(200).json({ success: true, data: updatedproduct });
  } catch (error) {
    res.status(404).json({ success: false, message: `"failed to updated"` });
  }
};
