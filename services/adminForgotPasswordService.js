const crypto = require('crypto');
const Admin = require('../models/adminModel');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const { msgList } = require('../utils/messages_user');

exports.forgotPassword = async (email, req) => {
  // 1. Find the admin by email
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new AppError(msgList.error.not_found_mail.msg, msgList.error.not_found_mail.status);
  }

  // 2. Generate a reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // 3. Save the token and expiration time to the admin's record
  admin.passwordResetToken = hashedResetToken;
  admin.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
  await admin.save({ validateBeforeSave: false });

  // 4. Create the reset URL
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/admin/resetPassword/${resetToken}`;
  const messageURL = `Please click on the following link to reset your password: ${resetURL}`;

  // 5. Send the email with the reset link
  try {
    await sendEmail({
      email: admin.email,
      subject: 'Your Admin Password Reset',
      message: messageURL,
    });
    return { status: 'success', message: 'Verification email sent successfully.' };
} catch (err) {
    // If sending the email fails, reset the fields
    admin.passwordResetToken = undefined;
    admin.passwordResetExpires = undefined;
    await admin.save({ validateBeforeSave: false });
    throw new AppError(msgList.error.error_16_1.msg, msgList.error.error_16_1.status);
  }
};
