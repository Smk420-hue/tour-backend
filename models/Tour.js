// backend/models/Tour.js
import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Tour = db.define(
  "Tour",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "India",
    },

    shortDescription: {
      type: DataTypes.TEXT,
    },

    overview: {
      type: DataTypes.TEXT,
    },

    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue("price"));
      },
    },

    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      get() {
        return parseFloat(this.getDataValue("discount"));
      },
    },

    coverImage: {
      type: DataTypes.STRING,
    },

    isPopular: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    bookedSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 },
    },

    tourType: {
      type: DataTypes.ENUM("group", "private", "special"),
      defaultValue: "group",
    },

    category: {
      type: DataTypes.ENUM("domestic", "international"),
      allowNull: false,
    },

    departureDate: {
      type: DataTypes.DATE,
    },

    capacity: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
    },

    returnDate: {
      type: DataTypes.DATE,
    },

    averageRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    numReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: (tour) => {
        if (!tour.slug) {
          tour.slug = tour.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
        }
      },
      beforeUpdate: (tour) => {
        if (!tour.slug && tour.title) {
          tour.slug = tour.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
        }
      },
    },
  }
);

export default Tour;
