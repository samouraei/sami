const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');


const createToken = (user) => {
  // Payload includes the user ID and role
  const payload = {
    id: user._id,
    role: user.role
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new AppError('Invalid or expired token');
  }
};

module.exports = {
  createToken,
  verifyToken
};
