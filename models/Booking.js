// models/Booking.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookingReference: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  customerName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  customerEmail: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  customerPhone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  numberOfTravelers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM("online", "cash"),
    allowNull: false,
  },
  bookingStatus: {
    type: DataTypes.ENUM("pending", "confirmed", "cancelled", "completed"),
    defaultValue: "pending",
  },
  travelDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  specialRequirements: {
    type: DataTypes.TEXT,
  },
 emergencyContact: {
  type: DataTypes.TEXT,
  allowNull: true,
  get() {
    const rawValue = this.getDataValue("emergencyContact");
    return rawValue ? JSON.parse(rawValue) : null;
  },
  set(value) {
    this.setDataValue("emergencyContact", JSON.stringify(value));
  },
},

  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tourId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Booking.beforeCreate((booking) => {
  booking.bookingReference = `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
});

export default Booking;

