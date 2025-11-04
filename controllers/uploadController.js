// backend/controllers/uploadController.js
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import { cloudinary } from '../config/cloudinary.js';

// Multer temp storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});

// Multer config
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max per file
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPG, PNG, and WEBP allowed.'));
    }
    cb(null, true);
  },
});

// Middleware for route
export const uploadMiddleware = upload.array('images', 10); // max 10 images per request

// Controller function
export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const fileSizeMB = file.size / (1024 * 1024);
      let uploadPath = file.path;
      let compressedPath = null;

      // Compress only if >10MB
      if (fileSizeMB > 10) {
        compressedPath = `uploads/compressed-${Date.now()}-${file.originalname}`;
        await sharp(file.path)
          .resize({ width: 1280 })
          .jpeg({ quality: 80 })
          .toFile(compressedPath);
        uploadPath = compressedPath;
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(uploadPath, {
        folder: 'travel-website',
      });

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
        compressed: fileSizeMB > 10,
      });

      // Delete temp files
      fs.unlinkSync(file.path);
      if (compressedPath && fs.existsSync(compressedPath)) {
        fs.unlinkSync(compressedPath);
      }
    }

    res.status(200).json({
      success: true,
      images: uploadedImages,
    });
  } catch (err) {
    console.error('❌ Upload failed:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};
