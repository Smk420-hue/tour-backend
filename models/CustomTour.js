// models/CustomTour.js
import { DataTypes } from "sequelize";
import db from "../config/db.js";

const CustomTour = db.define("CustomTour", {
  tourType: {
    type: DataTypes.ENUM("Domestic", "International"),
    allowNull: false,
  },
  destinationType: {
    type: DataTypes.STRING, // state or country name
    allowNull: false,
  },
  stayType: {
    type: DataTypes.ENUM("Premium", "Budget Friendly"),
    allowNull: false,
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  persons: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fromDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  toDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  interests: {
    type: DataTypes.STRING, // comma-separated (e.g. "Adventure,Beach")
    allowNull: true,
  },
  budgetRange: {
    type: DataTypes.STRING, // e.g. "Below ₹25,000"
    allowNull: true,
  },
  transportMode: {
    type: DataTypes.STRING, // Flight, Train, etc.
    allowNull: true,
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING, // path of uploaded image
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default CustomTour;
