import Carousel from "../models/Carousel.js";
import { cloudinary } from "../config/cloudinary.js";

// =========================
// Create carousel slide
// =========================
export const createCarouselSlide = async (req, res) => {
  try {
    const { title, description, position = "center", textAlign = "center", isActive = true } = req.body;

    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const slide = await Carousel.create({
      title,
      description,
      position,
      textAlign,
      isActive: isActive === "true",
      imageUrl: req.file.path, // Cloudinary URL from multer-storage-cloudinary
    });

    res.status(201).json(slide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// =========================
// Update carousel slide
// =========================
export const updateCarouselSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, position, textAlign, isActive } = req.body;

    const slide = await Carousel.findByPk(id);
    if (!slide) return res.status(404).json({ message: "Carousel slide not found" });

    // If new file uploaded, delete old image
    if (req.file && slide.imageUrl) {
      const publicId = slide.imageUrl
        .split("/")
        .slice(-1)[0]
        .split(".")[0]; // Extract Cloudinary public_id
      await cloudinary.uploader.destroy(`travel-website/carousel/${publicId}`);
    }

    await slide.update({
      title: title || slide.title,
      description: description ?? slide.description,
      position: position || slide.position,
      textAlign: textAlign || slide.textAlign,
      isActive: isActive !== undefined ? isActive === "true" : slide.isActive,
      imageUrl: req.file ? req.file.path : slide.imageUrl,
    });

    res.json(slide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// =========================
// Delete carousel slide
// =========================
export const deleteCarouselSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await Carousel.findByPk(id);
    if (!slide) return res.status(404).json({ message: "Carousel slide not found" });

    // Delete image from Cloudinary
    if (slide.imageUrl) {
      const publicId = slide.imageUrl.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`travel-website/carousel/${publicId}`);
    }

    await slide.destroy();
    res.json({ message: "Carousel slide deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// =========================
// Toggle active status
// =========================
export const toggleCarouselSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await Carousel.findByPk(id);
    if (!slide) return res.status(404).json({ message: "Carousel slide not found" });

    slide.isActive = !slide.isActive;
    await slide.save();

    res.json(slide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// =========================
// Fetch slides
// =========================
export const getCarouselSlides = async (req, res) => {
  try {
    const slides = await Carousel.findAll({ where: { isActive: true }, order: [["createdAt", "DESC"]] });
    res.json(slides);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCarouselSlides = async (req, res) => {
  try {
    const slides = await Carousel.findAll({ order: [["createdAt", "DESC"]] });
    res.json(slides);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCarouselSlide = async (req, res) => {
  try {
    const slide = await Carousel.findByPk(req.params.id);
    if (!slide) return res.status(404).json({ message: "Carousel slide not found" });
    res.json(slide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
