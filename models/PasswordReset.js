// backend/models/PasswordReset.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import crypto from 'crypto';

const PasswordReset = db.define('PasswordReset', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  used: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

// Generate reset token
PasswordReset.generateToken = function() {
  return crypto.randomBytes(32).toString('hex');
};

export default PasswordReset;