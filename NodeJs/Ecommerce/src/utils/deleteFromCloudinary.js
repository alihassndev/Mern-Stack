import cloudinary from "cloudinary";

const deleteFromCloudinary = async (public_id) => {
  return await cloudinary.v2.uploader.destroy(public_id);
};

export { deleteFromCloudinary };
