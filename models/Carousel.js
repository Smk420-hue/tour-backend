import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Carousel = db.define('Carousel', {
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  textAlign: {
    type: DataTypes.ENUM('left', 'center', 'right'),
    defaultValue: 'center',
    allowNull: false
  },
  position: {
    type: DataTypes.ENUM('top', 'center', 'bottom'),
    defaultValue: 'center',
    allowNull: false
  }
});

export default Carousel;
