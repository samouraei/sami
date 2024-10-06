// const jwt = require('jsonwebtoken');
// const { promisify } = require('util');
// const User = require('../models/userModel');
// const AppError = require('../utils/appError'); // Adjust path as needed
// const catchAsync = require('../utils/catchAsync');

// // Function to verify and decode the JWT token
// const verifyToken = async (token) => {
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
//   // If decoding fails, an error will be thrown automatically
//   if (!decoded) {
//     throw new AppError('Invalid or expired token', 401);
//   }

//   return decoded;
// };

// // Function to protect routes by verifying the token and attaching user
// const protect = catchAsync(async (req,res,next) => {
//   let token;
//   // console.log('protect token',req.headers.authorization);
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     throw new AppError('You are not logged in! Please log in to get access.', 401);
//   }

//   const decoded = await  verifyToken(token);

//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     throw new AppError('The user belonging to this token does no longer exist.', 401);
//   }

//   // console.log('findUser',currentUser)

//   req.user = currentUser;
//   next();
// });

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const AppError = require('../utils/appError'); // Adjust path as needed
const catchAsync = require('../utils/catchAsync');

// Middleware to protect routes based on roles (user or admin)
const protect = (model, allowedRoles = []) => {
  return catchAsync(async (req, res, next) => {
    let token;

    // Extract the token from the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Determine which model to use (User or Admin)
    const currentUser = await model.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    // Check if the user's role is allowed to access the route
    if (!allowedRoles.includes(currentUser.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    // Attach the user to the request object
    req.user = currentUser;
    next();
  });
};


const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if req.user is defined and has a role
    if (!req.user || !req.user.role) {
      return next(new AppError('User role is undefined or missing. Access denied.', 403));
    }

    // Check if the user's role is included in the allowedRoles array
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    // If the user has the required role, allow access
    next();
  };
};
// Middleware to restrict access based on roles
// const restrictTo = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(new AppError('You do not have permission to perform this action', 403));
//     }
//     next();
//   };
// };

module.exports = {
  protect,
  restrictTo
};