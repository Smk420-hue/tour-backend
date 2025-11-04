// backend/models/associations.js
import Tour from "./Tour.js";
import Itinerary from "./Itinerary.js";
import Inclusion from "./Inclusion.js";
import Exclusion from "./Exclusion.js";
import TourImage from "./TourImage.js";
import Booking from "./Booking.js";
import User from "./User.js";
import Review from "./Review.js";

// ----------------------
// Tour associations
// ----------------------
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

// ----------------------
// User associations
// ----------------------
User.hasMany(Booking, { foreignKey: "userId", as: "bookings", onDelete: "CASCADE" });
User.hasMany(Review, { foreignKey: "userId", as: "reviews", onDelete: "CASCADE" });

Booking.belongsTo(User, { foreignKey: "userId", as: "user" });
Review.belongsTo(User, { foreignKey: "userId", as: "user" });

// booking associations
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Tour, { foreignKey: 'tourId' });

User.hasMany(Booking, { foreignKey: 'userId' });
Tour.hasMany(Booking, { foreignKey: 'tourId' });

export { Tour, Itinerary, Inclusion, Exclusion, TourImage, Booking, User, Review };
