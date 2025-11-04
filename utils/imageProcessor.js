import sharp from 'sharp';
import fs from 'fs';
import { cloudinary } from '../config/cloudinary.js';
import path from 'path';

/**
 * Compress and upload an image to Cloudinary
 * @param {string} filePath - local path of uploaded image
 * @param {string} folder - Cloudinary folder name
 * @param {number} maxSizeMB - optional, compress if larger than this size
 * @returns {Promise<string>} - secure_url from Cloudinary
 */
export const processImage = async (filePath, folder, maxSizeMB = 10) => {
  const fileSizeMB = fs.statSync(filePath).size / (1024 * 1024);
  let uploadPath = filePath;

  // Compress if larger than maxSizeMB
  if (fileSizeMB > maxSizeMB) {
    const ext = path.extname(filePath).toLowerCase() || '.jpg';
    const compressedPath = filePath.replace(ext, `-compressed${ext}`);

    await sharp(filePath)
      .resize({ width: 1280 })
      .jpeg({ quality: 80 })
      .toFile(compressedPath);

    uploadPath = compressedPath;
  }

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(uploadPath, { folder });

  // Cleanup local files
  fs.unlinkSync(filePath);
  if (uploadPath !== filePath) fs.unlinkSync(uploadPath);

  return result.secure_url;
};
