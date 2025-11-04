import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  getCarouselSlides,
  getAllCarouselSlides,
  getCarouselSlide,
  createCarouselSlide,
  updateCarouselSlide,
  deleteCarouselSlide,
  toggleCarouselSlide
} from '../controllers/carouselController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validateCarousel } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Public route - get active slides
router.get('/', getCarouselSlides);

// Admin routes - need authentication
router.use(protect, admin);

// Get all slides (admin)
router.get('/all', getAllCarouselSlides);

// Get single slide
router.get('/:id', getCarouselSlide);

// Create new slide
router.post(
  '/',
  upload.single('image'),
  validateCarousel,
  createCarouselSlide
);

// Update slide
router.put(
  '/:id',
  upload.single('image'),
  validateCarousel,
  updateCarouselSlide
);

// Delete slide
router.delete('/:id', deleteCarouselSlide);

// Toggle slide active status
router.patch('/:id/toggle', toggleCarouselSlide);

export default router;
