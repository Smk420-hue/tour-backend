// backend/routes/tour.js
import express from 'express';
import {
  getTours,
  getTour,
  getTourBySlug,
  createTour,
  updateTour,
  deleteTour,
  getPopularTours,
  generateTourPDF,
  sendTourPDFEmail,
  searchTours,
  getFilteredTours,
  getRecommendedTours,
  getAvailableDestinations,
  getToursByDiscount,
  getDomesticTours,
  getInternationalTours 
} from '../controllers/tourController.js';
import { protect, admin, employee } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { validateTour, tourCreationLimiter } from '../middleware/validationMiddleware.js';

// Import nested review routes
import reviewRoutes from './review.js';

const router = express.Router();

// ------------------------
// Public routes
// ------------------------
router.get('/', getTours);
router.get('/popular', getPopularTours);
router.get('/search', searchTours);
router.get("/discounted", getToursByDiscount);
router.get("/domestic", getDomesticTours);
router.get("/international", getInternationalTours);
router.get('/:id', getTour);
router.get('/slug/:slug', getTourBySlug);
router.get('/:id/pdf', generateTourPDF);

router.post('/:id/send-pdf', sendTourPDFEmail);



// ------------------------
// Nested review routes
// ------------------------
// All review routes will use /api/tours/:tourId/reviews
router.use('/:tourId/reviews', reviewRoutes);

// ------------------------
// Protected routes
// ------------------------

// Create new tour with rate limiting
router.post(
  '/',
  protect,
  employee,
  tourCreationLimiter,
  upload.array('images', 10), // max 10 images
  validateTour,
  createTour
);

// Update existing tour
router.put(
  '/:id',
  protect,
  employee,
  upload.array('images', 10),
  validateTour,
  updateTour
);

// Delete tour (admin only)
router.delete('/:id', protect, admin, deleteTour);

router.get("/filter", getFilteredTours);

router.get('/recommendations', getRecommendedTours);
router.get('/destinations', getAvailableDestinations);


export default router;
