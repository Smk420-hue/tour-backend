// backend/models/TourImage.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const TourImage = db.define('TourImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default TourImage;