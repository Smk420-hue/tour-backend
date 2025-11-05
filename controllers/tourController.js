import asyncHandler from "express-async-handler";
import { Op } from "sequelize";
import slugify from "slugify";
import fs from "fs";
import sharp from "sharp";
import { cloudinary } from "../config/cloudinary.js";
import path from "path";
import Review from "../models/Review.js";
import { Tour, User, Itinerary, Inclusion, Exclusion, TourImage } from '../models/associations.js';
import { deleteImageFromCloudinary } from "../utils/cloudinary.js";
import { generateTourPDFBuffer } from "../utils/pdfGenerator.js";
import { sendEmail } from "../utils/sendEmail.js";





// Utility: create unique slug
const generateUniqueSlug = async (title) => {
  let baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (await Tour.findOne({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }
  return slug;
};

// Cloudinary image processing utility
const processImage = async (file) => {
  let tempCompressedPath = null;
  
  try {
    const fileSizeMB = file.size / (1024 * 1024);
    
    // If file is larger than 2MB, compress it first
    if (fileSizeMB > 2) {
      tempCompressedPath = `tmp/compressed-${Date.now()}-${file.originalname}`;
      
      // Ensure tmp directory exists
      if (!fs.existsSync('tmp')) {
        fs.mkdirSync('tmp', { recursive: true });
      }
      
      // Compress image using sharp
      await sharp(file.path)
        .resize({ 
          width: 1920, 
          height: 1080, 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ 
          quality: 80,
          mozjpeg: true 
        })
        .toFile(tempCompressedPath);

      // Upload compressed version to Cloudinary
      const result = await cloudinary.uploader.upload(tempCompressedPath, {
        folder: 'travel-website/tours', // Specific folder for tours
        resource_type: 'image',
        transformation: [
          { quality: 'auto:good' },
          { format: 'auto' }
        ]
      });

      return result.secure_url;

    } else {
      // Upload original file directly to Cloudinary if small enough
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'travel-website/tours', // Specific folder for tours
        resource_type: 'image',
        transformation: [
          { quality: 'auto:good' },
          { format: 'auto' }
        ]
      });

      return result.secure_url;
    }

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Image upload failed: ${error.message}`);
    
  } finally {
    // Clean up temporary files
    try {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      if (tempCompressedPath && fs.existsSync(tempCompressedPath)) {
        fs.unlinkSync(tempCompressedPath);
      }
    } catch (cleanupError) {
      console.warn('Warning: Could not clean up temp files:', cleanupError);
    }
  }
};

export const createTour = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      state,
      country,
      shortDescription,
      overview,
      destination,
      duration,
      price,
      discount,
      isPopular,
      seats,
      bookedSeats,
      tourType,
      category,
      departureDate,
      capacity,
      returnDate,
      itineraries,
      inclusions,
      exclusions
    } = req.body;

    // Validate required fields
    if (!title || !price || !duration) {
      return res.status(400).json({
        message: "Title, price, and duration are required fields"
      });
    }

    // Generate unique slug
    const slug = await generateUniqueSlug(title);

    // Process images and upload to Cloudinary
    let coverImage = null;
    let uploadedImages = [];

    if (req.files && req.files.length > 0) {
      try {
        console.log(`Processing ${req.files.length} images for Cloudinary upload...`);
        
        uploadedImages = await Promise.all(
          req.files.map(file => processImage(file))
        );
        
        coverImage = uploadedImages[0] || null;
        console.log('Successfully uploaded images to Cloudinary:', uploadedImages.length);
        
      } catch (imageError) {
        console.error('Image upload error:', imageError);
        return res.status(400).json({ 
          message: 'Image upload failed', 
          error: imageError.message 
        });
      }
    }

    // Create the tour
    const tour = await Tour.create({
      title,
      slug,
      state,
      country,
      shortDescription,
      overview,
      destination,
      duration: parseInt(duration),
      price: parseFloat(price),
      discount: discount ? parseFloat(discount) : 0,
      isPopular: isPopular === 'true' || isPopular === true,
      seats: parseInt(seats) || 0,
      bookedSeats: bookedSeats ? parseInt(bookedSeats) : 0,
      tourType,
      category,
      departureDate,
      capacity: parseInt(capacity) || 0,
      returnDate,
      coverImage, // Cloudinary URL
    });

    // Create tour images in database with Cloudinary URLs
    if (uploadedImages.length > 0) {
      const tourImages = uploadedImages.map(url => ({
        imageUrl: url, // Cloudinary URL
        tourId: tour.id
      }));
      await TourImage.bulkCreate(tourImages);
    }

    // Create itineraries if provided
    if (itineraries) {
      try {
        const parsedItineraries = Array.isArray(itineraries) ? itineraries : JSON.parse(itineraries);
        if (parsedItineraries.length > 0) {
          const itineraryData = parsedItineraries.map((item, index) => ({
            dayNumber: index + 1,
            title: item.title || `Day ${index + 1}`,
            description: item.description || '',
            activities: item.activities || '',
            tourId: tour.id
          }));
          await Itinerary.bulkCreate(itineraryData);
        }
      } catch (parseError) {
        console.error('Error parsing itineraries:', parseError);
      }
    }

    // Create inclusions if provided
    if (inclusions) {
      try {
        const parsedInclusions = Array.isArray(inclusions) ? inclusions : JSON.parse(inclusions);
        if (parsedInclusions.length > 0) {
          const inclusionData = parsedInclusions
            .filter(text => text && text.trim() !== '')
            .map(text => ({
              text: text.trim(),
              tourId: tour.id
            }));
          if (inclusionData.length > 0) {
            await Inclusion.bulkCreate(inclusionData);
          }
        }
      } catch (parseError) {
        console.error('Error parsing inclusions:', parseError);
      }
    }

    // Create exclusions if provided
    if (exclusions) {
      try {
        const parsedExclusions = Array.isArray(exclusions) ? exclusions : JSON.parse(exclusions);
        if (parsedExclusions.length > 0) {
          const exclusionData = parsedExclusions
            .filter(text => text && text.trim() !== '')
            .map(text => ({
              text: text.trim(),
              tourId: tour.id
            }));
          if (exclusionData.length > 0) {
            await Exclusion.bulkCreate(exclusionData);
          }
        }
      } catch (parseError) {
        console.error('Error parsing exclusions:', parseError);
      }
    }

    // Fetch the complete tour with associations
    const completeTour = await Tour.findByPk(tour.id, {
      include: [
        { model: Itinerary, as: 'itineraries' },
        { model: Inclusion, as: 'inclusions' },
        { model: Exclusion, as: 'exclusions' },
        { model: TourImage, as: 'images' }
      ]
    });

    res.status(201).json({
      success: true,
      message: "Tour created successfully",
      tour: completeTour,
      imagesUploaded: uploadedImages.length
    });

  } catch (error) {
    console.error("❌ Error creating tour:", error);
    res.status(500).json({ 
      success: false,
      message: error.message || "Failed to create tour",
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// ✅ Get all tours (with optional filters)



export const getTours = asyncHandler(async (req, res) => {
  try {
    const where = {};
    const { state, country, category, isPopular, search, page = 1, limit = 9 } = req.query;

    // Filters
    if (state) where.state = state;
    if (country) where.country = country;
    if (category) where.category = category;
    if (isPopular) where.isPopular = true;
    if (search) where.title = { [Op.like]: `%${search}%` };

    // Pagination setup
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const offset = (pageNum - 1) * limitNum;

    // Fetch paginated tours
    const { rows: tours, count } = await Tour.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: limitNum,
      offset,
    });

    const totalPages = Math.ceil(count / limitNum);

    res.json({
      count,
      totalPages,
      currentPage: pageNum,
      limit: limitNum,
      tours,
    });
  } catch (error) {
    console.error("Error fetching tours:", error);
    res.status(500).json({ message: "Failed to fetch tours" });
  }
});


// ✅ Get single tour by ID
// @desc Get a single tour by ID
// @route GET /api/tours/:id
// @access Public
export const getTour = asyncHandler(async (req, res) => {
  const tour = await Tour.findByPk(req.params.id, {
    include: [
      {
        model: Review,
        as: "reviews",
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      },
      { model: Itinerary, as: "itineraries" },
      { model: Inclusion, as: "inclusions" },
      { model: Exclusion, as: "exclusions" },
      { model: TourImage, as: "images" },
    ],
  });

  if (!tour) {
    res.status(404);
    throw new Error("Tour not found");
  }

  res.json(tour);
});



// ✅ Get tour by slug
export const getTourBySlug = asyncHandler(async (req, res) => {
  const tour = await Tour.findOne({
    where: { slug: req.params.slug },
    include: [{ model: Review, as: "reviews" }],
  });
  if (!tour) {
    res.status(404);
    throw new Error("Tour not found");
  }
  res.json(tour);
});

// ✅ Update tour
// export const updateTour = asyncHandler(async (req, res) => {
//   const tour = await Tour.findByPk(req.params.id);
//   if (!tour) {
//     res.status(404);
//     throw new Error("Tour not found");
//   }

//   // Handle new images
//   let images = [];
//   if (req.files && req.files.length > 0) {
//     images = req.files.map((file) => `/uploads/${file.filename}`);
//     // Remove old image if exists
//     if (tour.coverImage) {
//       const oldPath = path.join(process.cwd(), "backend", tour.coverImage);
//       if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//     }
//     tour.coverImage = images[0];
//   }

//   await tour.update(req.body);
//   res.json({ message: "Tour updated successfully", tour });
// });


export const updateTour = asyncHandler(async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id, {
      include: [
        { model: TourImage, as: 'images' },
        { model: Itinerary, as: 'itineraries' },
        { model: Inclusion, as: 'inclusions' },
        { model: Exclusion, as: 'exclusions' }
      ]
    });

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found"
      });
    }

    const {
      title,
      state,
      country,
      shortDescription,
      overview,
      destination,
      duration,
      price,
      discount,
      isPopular,
      seats,
      bookedSeats,
      tourType,
      category,
      departureDate,
      capacity,
      returnDate,
      itineraries,
      inclusions,
      exclusions,
      deletedImages
    } = req.body;

    // Parse JSON fields if they are strings
    let parsedItineraries = itineraries;
    let parsedInclusions = inclusions;
    let parsedExclusions = exclusions;
    let parsedDeletedImages = deletedImages;

    try {
      if (typeof itineraries === 'string') parsedItineraries = JSON.parse(itineraries);
      if (typeof inclusions === 'string') parsedInclusions = JSON.parse(inclusions);
      if (typeof exclusions === 'string') parsedExclusions = JSON.parse(exclusions);
      if (typeof deletedImages === 'string') parsedDeletedImages = JSON.parse(deletedImages);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON format in request body'
      });
    }

    // Generate new slug if title changed
    let slug = tour.slug;
    if (title && title !== tour.title) {
      slug = await generateUniqueSlug(title);
    }

    // Handle image deletions from Cloudinary and database
    if (parsedDeletedImages && parsedDeletedImages.length > 0) {
      try {
        console.log(`Deleting ${parsedDeletedImages.length} images from Cloudinary...`);
        
        await Promise.all(
          parsedDeletedImages.map(async (imgId) => {
            const img = await TourImage.findByPk(imgId);
            if (img) {
              // Delete from Cloudinary (you'll need to implement this function)
              await deleteImageFromCloudinary(img.imageUrl);
              await img.destroy();
            }
          })
        );
        console.log('Successfully deleted images from Cloudinary');
      } catch (deleteError) {
        console.error('Image deletion error:', deleteError);
        return res.status(400).json({ 
          success: false,
          message: 'Image deletion failed', 
          error: deleteError.message 
        });
      }
    }

    // Process and upload new images to Cloudinary
    let newUploadedImages = [];
    if (req.files && req.files.length > 0) {
      try {
        console.log(`Processing ${req.files.length} new images for Cloudinary upload...`);
        
        newUploadedImages = await Promise.all(
          req.files.map(file => processImage(file))
        );
        
        console.log('Successfully uploaded new images to Cloudinary:', newUploadedImages.length);
        
      } catch (imageError) {
        console.error('New image upload error:', imageError);
        return res.status(400).json({ 
          success: false,
          message: 'New image upload failed', 
          error: imageError.message 
        });
      }
    }

    // Update the tour with new data
    await tour.update({
      title: title || tour.title,
      slug,
      state: state || tour.state,
      country: country || tour.country,
      shortDescription: shortDescription || tour.shortDescription,
      overview: overview || tour.overview,
      destination: destination || tour.destination,
      duration: duration ? parseInt(duration) : tour.duration,
      price: price ? parseFloat(price) : tour.price,
      discount: discount ? parseFloat(discount) : tour.discount,
      isPopular: isPopular !== undefined ? (isPopular === 'true' || isPopular === true) : tour.isPopular,
      seats: seats ? parseInt(seats) : tour.seats,
      bookedSeats: bookedSeats ? parseInt(bookedSeats) : tour.bookedSeats,
      tourType: tourType || tour.tourType,
      category: category || tour.category,
      departureDate: departureDate || tour.departureDate,
      capacity: capacity ? parseInt(capacity) : tour.capacity,
      returnDate: returnDate || tour.returnDate,
      // Update cover image if it's the first new image or keep existing
      coverImage: newUploadedImages.length > 0 ? newUploadedImages[0] : tour.coverImage
    });

    // Create new tour images in database with Cloudinary URLs
    if (newUploadedImages.length > 0) {
      const tourImages = newUploadedImages.map(url => ({
        imageUrl: url, // Cloudinary URL
        tourId: tour.id
      }));
      await TourImage.bulkCreate(tourImages);
    }

    // Update itineraries (replace all existing)
    if (parsedItineraries !== undefined) {
      try {
        await Itinerary.destroy({ where: { tourId: tour.id } });
        
        if (Array.isArray(parsedItineraries) && parsedItineraries.length > 0) {
          const itineraryData = parsedItineraries.map((item, index) => ({
            dayNumber: index + 1,
            title: item.title || `Day ${index + 1}`,
            description: item.description || '',
            activities: item.activities || '',
            tourId: tour.id
          }));
          await Itinerary.bulkCreate(itineraryData);
        }
      } catch (itineraryError) {
        console.error('Error updating itineraries:', itineraryError);
      }
    }

    // Update inclusions (replace all existing)
    if (parsedInclusions !== undefined) {
      try {
        await Inclusion.destroy({ where: { tourId: tour.id } });
        
        if (Array.isArray(parsedInclusions) && parsedInclusions.length > 0) {
          const inclusionData = parsedInclusions
            .filter(text => text && text.trim() !== '')
            .map(text => ({
              text: text.trim(),
              tourId: tour.id
            }));
          if (inclusionData.length > 0) {
            await Inclusion.bulkCreate(inclusionData);
          }
        }
      } catch (inclusionError) {
        console.error('Error updating inclusions:', inclusionError);
      }
    }

    // Update exclusions (replace all existing)
    if (parsedExclusions !== undefined) {
      try {
        await Exclusion.destroy({ where: { tourId: tour.id } });
        
        if (Array.isArray(parsedExclusions) && parsedExclusions.length > 0) {
          const exclusionData = parsedExclusions
            .filter(text => text && text.trim() !== '')
            .map(text => ({
              text: text.trim(),
              tourId: tour.id
            }));
          if (exclusionData.length > 0) {
            await Exclusion.bulkCreate(exclusionData);
          }
        }
      } catch (exclusionError) {
        console.error('Error updating exclusions:', exclusionError);
      }
    }

    // Fetch the complete updated tour with associations
    const updatedTour = await Tour.findByPk(tour.id, {
      include: [
        { model: Itinerary, as: 'itineraries' },
        { model: Inclusion, as: 'inclusions' },
        { model: Exclusion, as: 'exclusions' },
        { model: TourImage, as: 'images' }
      ]
    });

    res.json({
      success: true,
      message: "Tour updated successfully",
      tour: updatedTour,
      newImagesUploaded: newUploadedImages.length,
      imagesDeleted: parsedDeletedImages ? parsedDeletedImages.length : 0
    });

  } catch (error) {
    console.error("❌ Error updating tour:", error);
    res.status(500).json({ 
      success: false,
      message: error.message || "Failed to update tour",
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});


// ✅ Delete tour
export const deleteTour = asyncHandler(async (req, res) => {
  const tour = await Tour.findByPk(req.params.id);
  if (!tour) {
    res.status(404);
    throw new Error("Tour not found");
  }

  // Remove cover image
  if (tour.coverImage) {
    const imagePath = path.join(process.cwd(), "backend", tour.coverImage);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  await tour.destroy();
  res.json({ message: "Tour deleted successfully" });
});

// ✅ Popular tours
export const getPopularTours = asyncHandler(async (req, res) => {
  const tours = await Tour.findAll({
    where: { isPopular: true },
    order: [["createdAt", "DESC"]],
    limit: 6,
  });
  res.json(tours);
});

// ✅ Search tours by keyword
export const searchTours = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const tours = await Tour.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { destination: { [Op.like]: `%${q}%` } },
        { overview: { [Op.like]: `%${q}%` } },
      ],
    },
  });
  res.json(tours);
});

// ✅ Generate Tour PDF (optional)
// Controller function
export const generateTourPDF = asyncHandler(async (req, res) => {
  const tour = await Tour.findByPk(req.params.id,{ include: ['images', 'itineraries', 'inclusions', 'exclusions']})
  ;
  if (!tour) {
    res.status(404);
    throw new Error("Tour not found");
  }

  const buffer = await generateTourPDFBuffer(tour);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${tour.slug || "tour"}.pdf"`
  );
  res.send(buffer);
});

//send email with pdf attachment
// controllers/tourController.js


export const sendTourPDFEmail = asyncHandler(async (req, res) => {
  const tour = await Tour.findByPk(req.params.id);
  if (!tour) {
    res.status(404);
    throw new Error("Tour not found");
  }

  const extraInfo = {
    note: `Dear ${req.body.name || "Customer"},\n\nThank you for booking with WanderWorld Tours! Please find your tour details attached.\n\nFor assistance, contact us anytime.`,
  };

  const buffer = await generateTourPDFBuffer(tour, extraInfo);

  await sendEmail({
    to: req.body.email,
    subject: `Your Tour Details: ${tour.title}`,
    text: "Please find attached your tour details.",
    attachments: [
      {
        filename: `${tour.slug}.pdf`,
        content: buffer,
      },
    ],
  });

  res.json({ success: true, message: "Tour PDF sent via email successfully" });
});





export const getFilteredTours = async (req, res) => {
  try {
    const {
      priceRange,
      duration,
      rating,
      category,
      search,
      destination,
      country,
      state,
      tourType,
      difficulty,
      isPopular,
      featured,
      upcoming,
      hasDiscount,
      minSeats,
      maxGroupSize,
      departureDate,
      returnDate,
      dateRange,
      sortBy,
      page = 1,
      limit = 12,
      include = "images",
    } = req.query;

    const where = {};
    const includeModels = [];

    // 🔍 SEARCH FILTER
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { shortDescription: { [Op.iLike]: `%${search}%` } },
        { overview: { [Op.iLike]: `%${search}%` } },
        { destination: { [Op.iLike]: `%${search}%` } },
      ];
    }

    // 💰 PRICE RANGE (with discount support)
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      if (min < 0 || (max && max < min)) {
        return res.status(400).json({ message: "Invalid price range" });
      }

      if (hasDiscount === "true") {
        where[Op.and] = [
          { price: { [Op.gte]: min } },
          {
            [Op.or]: [
              { discount: { [Op.gt]: 0 } },
              Sequelize.where(
                Sequelize.literal('"price" - ("price" * "discount" / 100)'),
                { [Op.lte]: max || min }
              ),
            ],
          },
        ];
      } else {
        where.price = { [Op.gte]: min };
        if (max) where.price[Op.lte] = max;
      }
    }

    // ⏱️ DURATION FILTER
    if (duration) {
      if (duration.includes("+")) {
        const minDays = parseInt(duration.replace("+", ""));
        where.duration = { [Op.gte]: minDays };
      } else {
        const [minDays, maxDays] = duration.split("-").map(Number);
        where.duration = { [Op.gte]: minDays };
        if (maxDays) where.duration[Op.lte] = maxDays;
      }
    }

    // ⭐ RATING FILTER
    if (rating) {
      const ratingNum = Number(rating);
      if (ratingNum >= 0 && ratingNum <= 5) {
        where.averageRating = { [Op.gte]: ratingNum };
      }
    }

    // 📦 CATEGORY
    if (category) where.category = category;

    // 🌍 LOCATION FILTERS
    if (destination) where.destination = { [Op.iLike]: `%${destination}%` };
    if (country) where.country = { [Op.iLike]: `%${country}%` };
    if (state) where.state = { [Op.iLike]: `%${state}%` };

    // 🧭 TOUR TYPE
    if (tourType) where.tourType = tourType;

    // ⚙️ FLAGS
    if (isPopular === "true") where.isPopular = true;
    if (featured === "true") where.featured = true;
    if (hasDiscount === "true") where.discount = { [Op.gt]: 0 };

    // 👥 SEATS FILTER
    if (minSeats) {
      const availableSeats = Sequelize.literal('"seats" - "bookedSeats"');
      where[Op.and] = [
        Sequelize.where(availableSeats, { [Op.gte]: parseInt(minSeats) }),
      ];
    }

    // 👨‍👩‍👧 GROUP SIZE
    if (maxGroupSize)
      where.capacity = { [Op.lte]: parseInt(maxGroupSize) };

    // 📅 DATE FILTERS
    if (departureDate)
      where.departureDate = { [Op.gte]: new Date(departureDate) };
    if (returnDate)
      where.returnDate = { [Op.lte]: new Date(returnDate) };
    if (dateRange) {
      const [startDate, endDate] = dateRange.split("_");
      where.departureDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    // 🚀 UPCOMING TOURS
    if (upcoming === "true") where.departureDate = { [Op.gte]: new Date() };

    // 📎 RELATED MODELS
    if (include) {
      const includes = include.split(",");
      if (includes.includes("images")) {
        includeModels.push({
          model: TourImage,
          as: "images",
          attributes: ["id", "imageUrl", "caption", "isPrimary"],
        });
      }
      if (includes.includes("itineraries")) {
        includeModels.push({
          model: Itinerary,
          as: "itineraries",
          attributes: ["id", "day", "title", "description", "accommodation", "meals"],
        });
      }
      if (includes.includes("inclusions")) {
        includeModels.push({
          model: Inclusion,
          as: "inclusions",
          attributes: ["id", "description"],
        });
      }
      if (includes.includes("exclusions")) {
        includeModels.push({
          model: Exclusion,
          as: "exclusions",
          attributes: ["id", "description"],
        });
      }
      if (includes.includes("reviews")) {
        includeModels.push({
          model: Review,
          as: "reviews",
          attributes: ["id", "rating", "comment", "createdAt"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name", "avatar"],
            },
          ],
        });
      }
    }

    // 📊 SORTING
    let order = [["createdAt", "DESC"]];
    if (sortBy === "price-asc") order = [["price", "ASC"]];
    else if (sortBy === "price-desc") order = [["price", "DESC"]];
    else if (sortBy === "rating-desc") order = [["averageRating", "DESC"]];
    else if (sortBy === "latest") order = [["createdAt", "DESC"]];
    else if (sortBy === "popular") order = [["isPopular", "DESC"], ["averageRating", "DESC"]];
    else if (sortBy === "discount-desc") order = [["discount", "DESC"]];
    else if (sortBy === "duration-asc") order = [["duration", "ASC"]];
    else if (sortBy === "duration-desc") order = [["duration", "DESC"]];
    else if (sortBy === "departure-asc") order = [["departureDate", "ASC"]];

    // 🧮 PAGINATION
    const limitNum = Number(limit) || 12;
    const pageNum = Number(page) || 1;
    const offset = (pageNum - 1) * limitNum;

    // 🧠 EXECUTE QUERY
    const { count, rows: tours } = await Tour.findAndCountAll({
      where,
      include: includeModels,
      order,
      limit: limitNum,
      offset,
      distinct: true,
    });

    // ⚙️ EXTRA FILTER DATA
    const [categories, countries, tourTypes] = await Promise.all([
      Tour.findAll({
        attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("category")), "category"]],
        raw: true,
      }),
      Tour.findAll({
        attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("country")), "country"]],
        raw: true,
      }),
      Tour.findAll({
        attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("tourType")), "tourType"]],
        raw: true,
      }),
    ]);

    const totalPages = Math.ceil(count / limitNum);

    res.json({
      success: true,
      count,
      pagination: {
        currentPage: pageNum,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1,
        totalTours: count,
      },
      filters: {
        applied: Object.keys(req.query).filter(
          (key) => !["page", "limit", "sortBy", "include"].includes(key)
        ),
        available: { categories, countries, tourTypes },
      },
      tours: tours.map((tour) => ({
        ...tour.toJSON(),
        availableSeats: tour.seats - tour.bookedSeats,
        discountedPrice:
          tour.discount > 0
            ? tour.price - tour.price * (tour.discount / 100)
            : null,
        isAvailable: tour.seats - tour.bookedSeats > 0,
      })),
    });
  } catch (error) {
    console.error("❌ Error fetching filtered tours:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching tours",
      error:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// 🧭 RECOMMENDED TOURS
export const getRecommendedTours = async (req, res) => {
  try {
    const { tourId, category } = req.query;

    const where = {
      [Op.and]: [
        category ? { category } : {},
        tourId ? { id: { [Op.ne]: tourId } } : {},
      ],
    };

    const recommendations = await Tour.findAll({
      where,
      order: [
        ["isPopular", "DESC"],
        ["averageRating", "DESC"],
        ["bookedSeats", "DESC"],
      ],
      limit: 6,
      include: [
        {
          model: TourImage,
          as: "images",
          where: { isPrimary: true },
          required: false,
        },
      ],
    });

    res.json({
      success: true,
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recommendations",
    });
  }
};

// 🌎 AVAILABLE DESTINATIONS
export const getAvailableDestinations = async (req, res) => {
  try {
    const destinations = await Tour.findAll({
      attributes: [
        "destination",
        "country",
        "state",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "tourCount"],
      ],
      group: ["destination", "country", "state"],
      order: [[Sequelize.literal('"tourCount"'), "DESC"]],
    });

    res.json({
      success: true,
      count: destinations.length,
      destinations,
    });
  } catch (error) {
    console.error("❌ Error fetching destinations:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching destinations",
    });
  }
};


export const getToursByDiscount = asyncHandler(async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 9, 
      minDiscount = 1,
      // Add these for filter support:
      minPrice,
      maxPrice,
      duration,
      minRating,
      category,
      state,
      country,
      sortBy = "discount-desc"
    } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const offset = (pageNum - 1) * limitNum;

    // Build where clause dynamically
    const whereClause = {
      discount: { [Op.gte]: minDiscount },
    };

    // Add optional filters
    if (minPrice) whereClause.price = { [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) whereClause.price = { ...whereClause.price, [Op.lte]: parseFloat(maxPrice) };
    if (duration) whereClause.duration = duration;
    if (minRating) whereClause.rating = { [Op.gte]: parseFloat(minRating) };
    if (category) whereClause.category = category;
    if (state) whereClause.state = state;
    if (country) whereClause.country = country;

    // Build order clause
    let orderClause = [];
    switch (sortBy) {
      case 'price-asc':
        orderClause = [['price', 'ASC']];
        break;
      case 'price-desc':
        orderClause = [['price', 'DESC']];
        break;
      case 'rating-desc':
        orderClause = [['rating', 'DESC']];
        break;
      case 'duration-asc':
        orderClause = [['duration', 'ASC']];
        break;
      case 'duration-desc':
        orderClause = [['duration', 'DESC']];
        break;
      case 'departure-asc':
        orderClause = [['departureDate', 'ASC']];
        break;
      default: // 'discount-desc' and others
        orderClause = [['discount', 'DESC']];
    }

    const { rows: tours, count } = await Tour.findAndCountAll({
      where: whereClause,
      order: orderClause,
      limit: limitNum,
      offset,
    });

    if (!tours || tours.length === 0) {
      return res.status(404).json({ success: false, error: "No discounted tours found" });
    }

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
      limit: limitNum,
      tours,
    });
  } catch (error) {
    console.error("Error fetching discounted tours:", error);
    res.status(500).json({ success: false, error: "Failed to fetch discounted tours" });
  }
});


// toursController.js

// ✅ Get only domestic tours
export const getDomesticTours = asyncHandler(async (req, res) => {
  try {
    const { state, isPopular, search, page = 1, limit = 9 } = req.query;
    
    const where = { category: 'domestic' };
    if (state) where.state = state;
    if (isPopular) where.isPopular = true;
    if (search) where.title = { [Op.like]: `%${search}%` };

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const offset = (pageNum - 1) * limitNum;

    const { rows: tours, count } = await Tour.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: limitNum,
      offset,
    });

    res.json({
      count,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
      limit: limitNum,
      tours,
    });
  } catch (error) {
    console.error("Error fetching domestic tours:", error);
    res.status(500).json({ message: "Failed to fetch domestic tours" });
  }
});

// ✅ Get only international tours
export const getInternationalTours = asyncHandler(async (req, res) => {
  try {
    const { country, isPopular, search, page = 1, limit = 9 } = req.query;
    
    const where = { category: 'international' };
    if (country) where.country = country;
    if (isPopular) where.isPopular = true;
    if (search) where.title = { [Op.like]: `%${search}%` };

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const offset = (pageNum - 1) * limitNum;

    const { rows: tours, count } = await Tour.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: limitNum,
      offset,
    });

    res.json({
      count,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
      limit: limitNum,
      tours,
    });
  } catch (error) {
    console.error("Error fetching international tours:", error);
    res.status(500).json({ message: "Failed to fetch international tours" });
  }
});
