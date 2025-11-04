// backend/models/Exclusion.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Exclusion = db.define('Exclusion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

export default Exclusion;