// routes/customTourRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  createCustomTour,
  getAllCustomTours,
  getCustomTourById,
  deleteCustomTour,
} from "../controllers/customTourController.js";

const router = express.Router();

// 📦 Setup multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/customTours");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.fieldname + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createCustomTour);
router.get("/", getAllCustomTours);
router.get("/:id", getCustomTourById);
router.delete("/:id", deleteCustomTour);

export default router;
