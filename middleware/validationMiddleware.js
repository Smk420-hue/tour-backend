// backend/middleware/validationMiddleware.js
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

// Common validation rules
export const validateTour = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 255 }).withMessage('Title must be less than 255 characters')
    .trim(),
  
  body('price')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  
  body('duration')
    .isInt({ min: 1 }).withMessage('Duration must be at least 1 day'),
  
  body('seats')
    .isInt({ min: 1 }).withMessage('Seats must be at least 1'),
  
  body('category')
    .isIn(['domestic', 'international']).withMessage('Category must be domestic or international'),
  
  body('tourType')
    .isIn(['group', 'private', 'special']).withMessage('Tour type must be group, private, or special'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }
    next();
  }
];

export const validateUser = [
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be less than 100 characters')
    .trim()
    .escape(),
  
  body('role')
    .optional()
    .isIn(['admin', 'employee', 'customer']).withMessage('Role must be admin, employee, or customer'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }
    next();
  }
];



export const validateCarousel = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 255 }).withMessage('Title must be less than 255 characters')
    .trim(),

  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description must be less than 500 characters')
    .trim(),

  body('textAlign')
    .optional()
    .isIn(['left', 'center', 'right']).withMessage('textAlign must be left, center, or right'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }
    next();
  }
];
export const tourCreationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 create requests per 15 minutes
  message: {
    success: false,
    message: 'Too many tour creation attempts. Please try again later.'
  }
});