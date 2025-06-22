// src/utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";

// Check if Cloudinary is configured
const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    // If Cloudinary is not configured, return a placeholder response
    if (!isCloudinaryConfigured) {
      console.warn("⚠️ Cloudinary is not configured. Using placeholder image.");
      // Clean up the uploaded file
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return {
        public_id: "placeholder_id",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      };
    }

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // Clean up the uploaded file
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return response;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    // Clean up the uploaded file on error
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return null;
  }
};

export { uploadOnCloudinary };
