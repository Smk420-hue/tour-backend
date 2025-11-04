// backend/config/cors.js
import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL || 'https://yourdomain.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(
      (allowed) => allowed.toLowerCase() === origin.toLowerCase()
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`🚫 CORS blocked request from origin: ${origin}`);
      }
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
  ],
  optionsSuccessStatus: 200,
};

export default corsOptions;
