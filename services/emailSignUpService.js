const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');
const sendEmail = require('../utils/email');
const AppError = require('../utils/appError');
const { message, msgList } = require('../utils/messages_user');

exports.emailSignUpService = async ({ email, password, adminCode, req }) => {
  // 1. Check if the admin code matches the required code
  if (adminCode !== process.env.ADMIN_SIGNUP_CODE) {
    throw new AppError(msgList.error.error_1.msg, msgList.error.error_1.status);
  }

  // 2. Check if the email is already in the database
  const existingAdmin = await Admin.findOne({ email });

  if (!existingAdmin) {
    // If email is not found, create a new admin
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
      role: 'user',
      emailVerificationToken: hashedVerificationToken,
      emailVerificationExpires: Date.now() + 10 * 60 * 1000, // 10 minutes expiration
    });

    // 4. Send the email with the verification token
    const verificationURL = `${req.protocol}://${req.get('host')}/api/v1/web/admin/verification/${verificationToken}`;
    const messageURL = `Please verify your admin account by clicking on the link: ${verificationURL}`;

    try {
      await sendEmail({
        email: newAdmin.email,
        subject: 'Your Admin Account Email Verification',
        message: messageURL,
      });

      return { status: 'success', message: 'Verification email sent successfully.' };
    } catch (err) {
      // If email sending fails, remove the admin user
      await Admin.findByIdAndDelete(newAdmin._id);
      throw new AppError(msgList.error.error_16_1.msg, msgList.error.error_16_1.status);
    }
  } else if (!existingAdmin.emailVerified) {
    // If email is in the database but not verified, resend the verification email

    // Generate new email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    // Update the existing admin with the new token and expiration
    existingAdmin.emailVerificationToken = hashedVerificationToken;
    existingAdmin.emailVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiration
    await existingAdmin.save({ validateBeforeSave: false });

    // Send the email with the new verification token
    const verificationURL = `${req.protocol}://${req.get('host')}/api/v1/web/admin/verification/${verificationToken}`;
    const messageURL = `Please verify your admin account by clicking on the link: ${verificationURL}`;

    try {
      await sendEmail({
        email: existingAdmin.email,
        subject: 'Resend Admin Account Email Verification',
        message: messageURL,
      });

      return { status: 'success', message: 'Verification email resent successfully.' };
    } catch (err) {
      throw new AppError(msgList.error.error_8.msg, msgList.error.error_8.status);
    }
  } else {
    // If email is found and already verified, ask to login
    throw new AppError(msgList.error.error_8.msg, msgList.error.error_8.status);
  }
};
