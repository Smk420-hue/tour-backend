import express from 'express';
import {
  getReviewsByTour,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

// Public route - get reviews of a tour
router.get('/', getReviewsByTour);

// Protected routes - user must be logged in
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;
