const crypto = require('crypto');
const Admin = require('../models/adminModel');
const AppError = require('../utils/appError');
const { msgList } = require('../utils/messages_user');

exports.verifyEmailToken = async (token) => {
  // 1. Hash the token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // 2. Find admin by token and check if token has not expired
  const admin = await Admin.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  });

  if (!admin) {
    throw new AppError(msgList.error.token_expired.msg, msgList.error.token_expired.status);
  }

  // 3. Update the admin's emailVerified field and remove the verification token and expiration time
  await Admin.findByIdAndUpdate(admin._id, {
    emailVerified: true,
    role: 'admin',
    emailVerificationToken: undefined,
    emailVerificationExpires: undefined,
  });

  return admin;
};
