// backend/routes/upload.js
import express from 'express';
import { uploadMiddleware, uploadImages } from '../controllers/uploadController.js';

const router = express.Router();

// POST /api/upload/images
router.post('/images', uploadMiddleware, uploadImages);

export default router;
