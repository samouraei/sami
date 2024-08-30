const User = require('../../models/userModel');
const AppError = require('../../utils/appError'); // Adjust path as needed
const catchAsync = require('../../utils/catchAsync'); // Adjust path as needed

// Function to create or update a user profile
const createProfile = async (userId, { name, email, userAddress, bankAcc }) => {

  const authenticatedUser = await User.findById(userId);

  if (!authenticatedUser) {
    throw new AppError('User not found', 404);
  }

  authenticatedUser.name = name;
  authenticatedUser.email = email;
  authenticatedUser.userAddress = userAddress;
  authenticatedUser.bankAcc = bankAcc;
  await authenticatedUser.save();

return authenticatedUser;
};

module.exports = {
  createProfile
};
