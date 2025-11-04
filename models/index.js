import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Import model definition functions
import TourModel from "./Tour.js";
import ItineraryModel from "./Itinerary.js";
import InclusionModel from "./Inclusion.js";
import ExclusionModel from "./Exclusion.js";
import TourImageModel from "./TourImage.js";
import BookingModel from "./Booking.js";
import UserModel from "./User.js";
import ReviewModel from "./Review.js";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});

// Initialize models
const Tour = TourModel(sequelize);
const Itinerary = ItineraryModel(sequelize);
const Inclusion = InclusionModel(sequelize);
const Exclusion = ExclusionModel(sequelize);
const TourImage = TourImageModel(sequelize);
const Booking = BookingModel(sequelize);
const User = UserModel(sequelize);
const Review = ReviewModel(sequelize);

// -------------------------------------
// Define associations (now it’s valid!)
// -------------------------------------

// Tour associations
Tour.hasMany(Itinerary, { foreignKey: "tourId", as: "itineraries", onDelete: "CASCADE" });
Tour.hasMany(Inclusion, { foreignKey: "tourId", as: "inclusions", onDelete: "CASCADE" });
Tour.hasMany(Exclusion, { foreignKey: "tourId", as: "exclusions", onDelete: "CASCADE" });
Tour.hasMany(TourImage, { foreignKey: "tourId", as: "images", onDelete: "CASCADE" });
Tour.hasMany(Booking, { foreignKey: "tourId", as: "bookings", onDelete: "CASCADE" });
Tour.hasMany(Review, { foreignKey: "tourId", as: "reviews", onDelete: "CASCADE" });

Itinerary.belongsTo(Tour, { foreignKey: "tourId", as: "tour" });
Inclusion.belongsTo(Tour, { foreignKey: "tourId", as: "tour" });
Exclusion.belongsTo(Tour, { foreignKey: "tourId", as: "tour" });
TourImage.belongsTo(Tour, { foreignKey: "tourId", as: "tour" });
Booking.belongsTo(Tour, { foreignKey: "tourId", as: "tour" });
Review.belongsTo(Tour, { foreignKey: "tourId", as: "tour" });

// User associations
User.hasMany(Booking, { foreignKey: "userId", as: "bookings", onDelete: "CASCADE" });
User.hasMany(Review, { foreignKey: "userId", as: "reviews", onDelete: "CASCADE" });

Booking.belongsTo(User, { foreignKey: "userId", as: "user" });
Review.belongsTo(User, { foreignKey: "userId", as: "user" });

export {
  sequelize,
  Tour,
  Itinerary,
  Inclusion,
  Exclusion,
  TourImage,
  Booking,
  User,
  Review,
};
