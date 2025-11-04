// backend/routes/booking.js
import express from 'express';
import {
  createBooking,
  getBookings,
  getMyBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking
} from '../controllers/bookingController.js';
import { protect, admin, employee } from '../middleware/authMiddleware.js';

const router = express.Router();

// ------------------------
// Public / Protected Routes
// ------------------------

// Customer can create a booking
router.post('/', createBooking);

// Customer can get their own bookings
router.get('/my', protect, getMyBookings);

// Get single booking (admin, employee, or customer owner)
router.get('/:id', protect, getBooking);

// ------------------------
// Admin / Employee Routes
// ------------------------

// Admin or employee can get all bookings
router.get('/', protect, admin, getBookings);

// Admin can update booking status
router.patch('/:id/status', protect, admin, updateBookingStatus);

// Admin can delete booking
router.delete('/:id', protect, admin, deleteBooking);

export default router;
