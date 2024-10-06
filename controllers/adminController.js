const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const Admin = require('../models/adminModel');
const sendEmail = require('../utils/email')
const catchAsync = require('../utils/catchAsync');
const {message,msgList} = require('../utils/messages_user');
const { createToken } = require('../services/jwtCreateTokenService');


exports.adminSignUp = catchAsync(async (req, res, next) => {
  const { email, password, adminCode } = req.body;

  // 1. Check if the admin code matches the required code
  if (adminCode !== process.env.ADMIN_SIGNUP_CODE) {
    return next(new AppError(msgList.error.error_1.msg, msgList.error.error_1.status));
  }

  // 2. Check if the email is already in the database
  const existingAdmin = await Admin.findOne({ email });

  if (!existingAdmin) {
    // If email is not found, create a new admin
    const hashedPassword = await bcrypt.hash(password,12);

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

      return message('success', 'success_email', req, res);
    } catch (err) {
      // If email sending fails, remove the admin user
      await Admin.findByIdAndDelete(newAdmin._id);
      return next(new AppError(msgList.error.error_8.msg, msgList.error.error_8.status));
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

      return message('success', 'success_email', req, res);
    } catch (err) {
      return next(new AppError(msgList.error.error_8.msg, msgList.error.error_8.status));
    }
  } else {
    // If email is found and already verified, ask to login
    return next(new AppError(msgList.error.error_8.msg, msgList.error.error_8.status)); // Custom message asking the admin to log in
  }
});



 exports.adminVerification = catchAsync(async (req, res, next) => {
  console.log(req.params.token)
   const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  
   // Find user by token and check if token has not expired
   const admin = await Admin.findOne({
     emailVerificationToken: hashedToken,
     emailVerificationExpires: { $gt: Date.now() },
   });
  
   if (!admin) {
    
     return next(new AppError(msgList.error.token_expired.msg, msgList.error.token_expired.status));
   }
  
   // Update the admin's emailVerified field to true and remove the verification token and expiration time
   await Admin.findByIdAndUpdate(admin._id, {
     emailVerified: true,
     role: 'admin',
     emailVerificationToken: undefined,
     emailVerificationExpires: undefined,
   });
  
   // Send the response with the token
   return message('success','success',req,res)
  })

  
  // Admin login controller
  exports.adminLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // 1. Check if email and password are provided
    if (!email || !password) {
      return next(new AppError(msgList.error.wrong_input.msg, msgList.error.wrong_input.status));
    }
  
    // 2. Find the admin by email and check if the role is 'admin'
    const admin = await Admin.findOne({ email }).select('+password'); // Explicitly select password
    if (!admin || admin.role !== 'admin') {
      return next(new AppError(msgList.error.not_found_mail.msg, msgList.error.not_found_mail.status));
    }
    
  
    // 3. Check if the password is correct
    const isPasswordCorrect = await admin.correctPassword(password, admin.password);
    console.log(isPasswordCorrect)
    if (!isPasswordCorrect) {
      return next(new AppError(msgList.error.wrong_pass.msg, msgList.error.wrong_pass.status));
    }
  
    // 4. Check if the admin has verified their email
    if (!admin.emailVerified) {
      return next(new AppError(msgList.error.email_not_verified.msg, msgList.error.email_not_verified.status));
    }
  
    // 5. If everything is correct, generate a JWT token
         const token = createToken(admin._id);
         admin.token = token;
         await admin.save();  

    // 6. Send the response with the token

    return message('custom_message',{  msg: "ادمین وارد شد", token, status: 200 },req,res)

    // res.status(200).json({
    //   status: 'success',
    //   token,
    //   data: {
    //     admin: {
    //       email: admin.email,
    //       role: admin.role,
    //     },
    //   },
    // });
  });



