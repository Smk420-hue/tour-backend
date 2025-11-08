// backend/server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import morgan from 'morgan';
import db from './config/db.js';
import tourRoutes from './routes/tours.js';
import carouselRoutes from './routes/carousel.js';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/booking.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { apiLimiter, authLimiter } from './middleware/rateLimiter.js';
import corsOptions from './config/cors.js';
import { requestLogger } from './middleware/logger.js';
import uploadRoutes from './routes/upload.js';
import CustomTourRoutes from './routes/customTourRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🛡 Security and Performance Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 📜 Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(requestLogger);

// 🚦 Rate Limiting
app.use('/api/auth', authLimiter);
app.use('/api/', apiLimiter);

// 📍 Routes
app.use('/api/tours', tourRoutes);
app.use('/api/carousel', carouselRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/custom-tours', CustomTourRoutes);

// ❤️ Health Check (includes DB status)
app.get('/api/health', async (req, res) => {
  try {
    await db.authenticate();
    res.json({
      message: '✅ Server and database are running fine!',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Database connection failed', error: err.message });
  }
});

// 🧱 Error Handling
app.use(notFound);
app.use(errorHandler);

// 🚀 Start Server
const startServer = async () => {
  try {
    await db.authenticate();
    console.log('✅ Database connected successfully');

    if (process.env.NODE_ENV === 'development') {
      await db.sync({ alter: true });
      console.log('🔄 Database synchronized (development)');

      if (process.env.SEED_DATA === 'true') {
        const { seedData } = await import('./seeders/seedData.js');
        await seedData();
      }
    } else {
      await db.sync();
      console.log('✅ Database synchronized (production)'
      );
    }

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      console.log('Loaded NODE_ENV:', process.env.NODE_ENV);


    });
    console.log('Loaded NODE_ENV:', process.env.NODE_ENV);


    // Add this to your server.js or app.js to debug routes
app.use('/api/bookings', (req, res, next) => {
  console.log('📦 Booking routes available:');
  console.log('GET /api/bookings');
  console.log('POST /api/bookings');
  console.log('GET /api/bookings/my');
  console.log('GET /api/bookings/:id');
  console.log('DELETE /api/bookings/:id');
  console.log('PUT /api/bookings/:id/status'); // This should show up
  next();
});


    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received: closing server gracefully');
      server.close(() => {
        console.log('HTTP server closed');
        db.close();
      });
    });

  } catch (error) {
    console.error('❌ Unable to start server:', error.message);
    process.exit(1);
  }
};

startServer();
