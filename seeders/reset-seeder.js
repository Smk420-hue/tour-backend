import db from '../config/db.js';
import Tour from '../models/Tour.js';
import Review from '../models/Review.js'; 

const resetTours = async () => {
  try {
    await db.authenticate();
    console.log('✅ Database connected!');
    
    console.log('🗑️  Deleting related data...');
    await Review.destroy({ where: {} }); // delete reviews first
    await Tour.destroy({ where: {} });   // then delete tours

    console.log('✅ All tours and reviews deleted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting tours:', error);
    process.exit(1);
  }
};

resetTours();
