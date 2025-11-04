// backend/controllers/tourController.js
import { Tour, Itinerary, Inclusion, Exclusion, TourImage } from '../models/associations.js';
import { cloudinary } from '../config/cloudinary.js';
import { Op } from 'sequelize';
import sharp from 'sharp';
import fs from 'fs';

// Process and upload image
const processImage = async (file) => {
  try {
    const fileSizeMB = file.size / (1024 * 1024);
    let uploadPath = file.path;
    let compressedPath = null;

    if (fileSizeMB > 2) {
      compressedPath = `uploads/compressed-${Date.now()}-${file.originalname}`;
      await sharp(file.path)
        .resize({ width: 1920, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(compressedPath);
      uploadPath = compressedPath;
    }

    const result = await cloudinary.uploader.upload(uploadPath, {
      folder: 'travel-website/tours',
      resource_type: 'image'
    });

    // Clean up temporary files
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    if (compressedPath && fs.existsSync(compressedPath)) fs.unlinkSync(compressedPath);

    return result.secure_url;
  } catch (error) {
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

export const createTour = async (req, res) => {
  try {
    const {
      title,
      price,
      duration,
      seats,
      category,
      tourType,
      shortDescription,
      overview,
      destination,
      state,
      country = 'India',
      discount = 0,
      isPopular = false,
      capacity = 20,
      departureDate,
      returnDate,
      itineraries = '[]',
      inclusions = '[]',
      exclusions = '[]'
    } = req.body;

    // Validate required fields
    if (!title || !price || !duration || !seats || !category || !destination) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields: title, price, duration, seats, category, destination' 
      });
    }

    // Validate numeric fields
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a positive number'
      });
    }

    if (isNaN(duration) || duration <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Duration must be a positive number'
      });
    }

    if (isNaN(seats) || seats <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Seats must be a positive number'
      });
    }

    // Create tour data - let the model handle slug generation
    const tourData = {
      title: title.trim(),
      price: parseFloat(price),
      duration: parseInt(duration),
      seats: parseInt(seats),
      category,
      tourType: tourType || 'group',
      shortDescription: shortDescription?.trim() || '',
      overview: overview?.trim() || '',
      destination: destination.trim(),
      state: state?.trim() || null,
      country,
      discount: parseFloat(discount) || 0,
      isPopular: isPopular === 'true' || isPopular === true,
      capacity: parseInt(capacity) || 20,
      departureDate: departureDate || null,
      returnDate: returnDate || null
      // Don't set slug - let the model hook handle it
    };

    // Create tour - this will trigger the beforeValidate hook for slug generation
    const tour = await Tour.create(tourData);

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      try {
        const imageUploads = await Promise.all(
          req.files.map(file => processImage(file))
        );
        
        // Set first image as cover image
        if (imageUploads[0]) {
          await tour.update({ coverImage: imageUploads[0] });
        }

        // Create tour images for all uploaded images
        const tourImages = imageUploads.map(url => ({
          imageUrl: url,
          tourId: tour.id
        }));
        
        if (tourImages.length > 0) {
          await TourImage.bulkCreate(tourImages);
        }
      } catch (imageError) {
        console.error('Image upload error:', imageError);
        // Continue without images if upload fails
      }
    }

    // Create related records
    try {
      // Itineraries
      const itineraryData = JSON.parse(itineraries).map((item, index) => ({
        day: index + 1,
        title: item.title || `Day ${index + 1}`,
        description: item.description || '',
        activities: item.activities || '',
        tourId: tour.id
      })).filter(item => item.title || item.description || item.activities); // Only create if there's content
      
      if (itineraryData.length > 0) {
        await Itinerary.bulkCreate(itineraryData);
      }

      // Inclusions
      const inclusionData = JSON.parse(inclusions)
        .map(text => ({ text: text.trim(), tourId: tour.id }))
        .filter(item => item.text !== '');
      
      if (inclusionData.length > 0) {
        await Inclusion.bulkCreate(inclusionData);
      }

      // Exclusions
      const exclusionData = JSON.parse(exclusions)
        .map(text => ({ text: text.trim(), tourId: tour.id }))
        .filter(item => item.text !== '');
      
      if (exclusionData.length > 0) {
        await Exclusion.bulkCreate(exclusionData);
      }
    } catch (parseError) {
      console.error('Error parsing related data:', parseError);
      // Continue even if related data parsing fails
    }

    // Fetch complete tour with relations
    const createdTour = await Tour.findByPk(tour.id, {
      include: [Itinerary, Inclusion, Exclusion, TourImage]
    });

    res.status(201).json({
      success: true,
      message: 'Tour created successfully',
      data: createdTour
    });

  } catch (error) {
    console.error('Create tour error:', error);
    
    // Handle specific Sequelize errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'A tour with similar details already exists. Please try a different title.'
      });
    }
    
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create tour: ' + error.message
    });
  }
};