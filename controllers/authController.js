// backend/controllers/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Only admin can create employees and other admins
    if (req.user) {
      if (['admin', 'employee'].includes(role) && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admin can create admin/employee accounts' });
      }
    } else {
      // Public registration - only customer role allowed
      if (role && role !== 'customer') {
        return res.status(403).json({ message: 'Public registration only allowed for customer role' });
      }
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'customer',
      phone,
      address
    });

    const token = generateToken(user.id);

    res.status(201).json({
      user: user.toSafeObject(),
      token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user && (await user.matchPassword(password))) {
      if (!user.isActive) {
        return res.status(401).json({ message: 'Account is deactivated' });
      }

      const token = generateToken(user.id);

      res.json({
        user: user.toSafeObject(),
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Current User
export const getMe = async (req, res) => {
  try {
    res.json(req.user.toSafeObject());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Users (Admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update User (Admin only)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, isActive, phone, address } = req.body;

    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from modifying their own role
    if (req.user.id === parseInt(id) && role && role !== req.user.role) {
      return res.status(403).json({ message: 'Cannot change your own role' });
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
      role: role || user.role,
      isActive: isActive !== undefined ? isActive : user.isActive,
      phone: phone || user.phone,
      address: address || user.address
    });

    res.json(user.toSafeObject());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete User (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent self-deletion
    if (req.user.id === parseInt(id)) {
      return res.status(403).json({ message: 'Cannot delete your own account' });
    }

    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};