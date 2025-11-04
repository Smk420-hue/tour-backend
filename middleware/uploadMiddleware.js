// middleware/uploadTourImages.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary.js";

// Multer storage for Tour images
const tourStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "travel-website/tours", // Specific folder for tour images
    allowed_formats: ["jpg", "jpeg", "png", "webp", "avif", "gif"],
  },
});
 
export const upload = multer({
  storage: tourStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// You can also allow multiple files
//export const uploadMultipleTourImages = uploadTourImages.array('images', 10); // Max 10 images