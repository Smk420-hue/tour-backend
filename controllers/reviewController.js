// backend/controllers/reviewController.js
import Review from '../models/Review.js';
import Tour from '../models/Tour.js';

// ------------------------
// Helper Functions
// ------------------------

// Check if user can modify review
const checkUserAccess = (review, user) => {
  if (review.userId !== user.id) {
    const error = new Error('Not authorized');
    error.statusCode = 403;
    throw error;
  }
};

// Recalculate averageRating & numReviews for a tour
const updateTourRatings = async (tourId) => {
  const reviews = await Review.findAll({ where: { tourId } });
  const numReviews = reviews.length;
  const averageRating = numReviews > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / numReviews
    : 0;

  const tour = await Tour.findByPk(tourId);
  await tour.update({ averageRating, numReviews });
};

// ------------------------
// Review Controllers
// ------------------------

// Get reviews by tour
export const getReviewsByTour = async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { tourId: req.params.tourId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create review
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.create({
      userId: req.user.id,
      tourId: req.params.tourId,
      rating,
      comment
    });

    await updateTourRatings(req.params.tourId);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    checkUserAccess(review, req.user);
    await review.update(req.body);

    await updateTourRatings(review.tourId);
    res.json(review);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    checkUserAccess(review, req.user);
    await review.destroy();

    await updateTourRatings(review.tourId);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
