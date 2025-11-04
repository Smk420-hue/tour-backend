// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    const publicId = imageUrl.split('/').pop().split('.')[0]; // extract publicId
    await cloudinary.uploader.destroy(`tours/${publicId}`);
    console.log(`🗑️ Deleted from Cloudinary: ${publicId}`);
  } catch (err) {
    console.error("❌ Cloudinary deletion error:", err);
    throw new Error("Cloudinary deletion failed");
  }
};
