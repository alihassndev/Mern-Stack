import { Product } from "../model/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // adjust path if needed

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const user = req.user;

  // Validate required fields
  if (
    [name, description, price, category, stock].some(
      (field) => field === "" || field === undefined
    )
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  // Admin role check
  if (user.role !== "admin") {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access." });
  }

  // Check for uploaded files
  const files = req.files;
  if (!files || files.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No product images provided." });
  }

  // Upload images to Cloudinary
  const images = [];
  for (const file of files) {
    const uploadedImage = await uploadOnCloudinary(file.path);
    if (uploadedImage?.url) {
      images.push({
        public_id: uploadedImage.public_id,
        url: uploadedImage.url,
      });
    }
  }

  if (images.length === 0) {
    return res
      .status(500)
      .json({ success: false, message: "Image upload failed." });
  }

  // Create product
  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    createdBy: user._id,
    images, // array of image objects
  });

  return res.status(201).json({
    success: true,
    message: "Product created successfully.",
    product,
  });
});

export { createProduct };
