const Admin = require('../models/adminModel');
const AppError = require('../utils/appError');
const { msgList } = require('../utils/messages_user');
const { createToken } = require('./jwtCreateTokenService');

exports.emailLogin = async (email, password) => {
  // 1. Check if email and password are provided
  if (!email || !password) {
    throw new AppError(msgList.error.wrong_input.msg, msgList.error.wrong_input.status);
  }

  // 2. Find the admin by email and check if the role is 'admin'
  const admin = await Admin.findOne({ email }).select('+password'); // Explicitly select password
  if (!admin || admin.role !== 'admin') {
    throw new AppError(msgList.error.not_found_mail.msg, msgList.error.not_found_mail.status);
  }

  // 3. Check if the password is correct
  const isPasswordCorrect = await admin.correctPassword(password, admin.password);
  if (!isPasswordCorrect) {
    throw new AppError(msgList.error.wrong_pass.msg, msgList.error.wrong_pass.status);
  }

  // 4. Check if the admin has verified their email
  if (!admin.emailVerified) {
    throw new AppError(msgList.error.email_not_verified.msg, msgList.error.email_not_verified.status);
  }

  // 5. If everything is correct, generate a JWT token
  const token = createToken(admin._id);

  // Save the token to the admin's record in the database
  admin.token = token;
  await admin.save();

  return { token, admin };
};
