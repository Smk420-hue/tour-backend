// backend/models/Inclusion.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Inclusion = db.define('Inclusion', {
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

export default Inclusion;