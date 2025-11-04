// backend/seeders/seedData.js
import { Tour, User, Carousel } from '../models/associations.js';
import bcrypt from 'bcryptjs';

export const seedData = async () => {
  try {
    // Create admin user
    const adminUser = await User.findOrCreate({
      where: { email: 'admin@travel.com' },
      defaults: {
        name: 'Admin User',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        phone: '+1234567890'
      }
    });

    // Create sample carousel slides
    const carouselSlides = await Carousel.bulkCreate([
      {
        title: 'Discover Amazing Destinations',
        description: 'Explore the world with our curated travel experiences',
        imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
        isActive: true
      },
      {
        title: 'Luxury Travel Experiences',
        description: 'Indulge in premium travel packages tailored for you',
        imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        isActive: true
      }
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error);
  }
};