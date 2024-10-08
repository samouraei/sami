const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');
const AppError = require('../utils/appError');
const { msgList } = require('../utils/messages_user');

exports.resetPassword = async (resetToken, newPassword) => {
  // 1. Hash the reset token received from the URL
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // 2. Find the admin based on the hashed reset token and check if the token is still valid
  const admin = await Admin.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, // Ensure the token is not expired
  });

  if (!admin) {
    throw new AppError(msgList.error.token_expired.msg, msgList.error.token_expired.status);
  }

  // 3. Hash the new password and update the admin's password
  admin.password = await bcrypt.hash(newPassword, 12);
  admin.passwordResetToken = undefined; // Clear the reset token
  admin.passwordResetExpires = undefined; // Clear the expiration

  await admin.save(); // Save the new password and reset the token fields

  return admin;
};
