// backend/models/Itinerary.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Itinerary = db.define('Itinerary', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dayNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  activities: {
    type: DataTypes.TEXT,
    allowNull: true // Add this field
  }
});

export default Itinerary;