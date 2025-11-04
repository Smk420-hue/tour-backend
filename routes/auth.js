// backend/routes/auth.js
import express from 'express';
import {
  register,
  login,
  getMe,
  getUsers,
  updateUser,
  deleteUser,
  changePassword
} from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validateUser } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', validateUser, register);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getMe);
router.put('/password', protect, changePassword);

// Admin only routes
router.get('/users', protect, admin, getUsers);
router.put('/users/:id', protect, admin, validateUser, updateUser);
router.delete('/users/:id', protect, admin, deleteUser);

export default router;