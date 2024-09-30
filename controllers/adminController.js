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
    const { email,password , adminCode } = req.body;

    // Check if the admin code matches the required code
    if (adminCode !== process.env.ADMIN_SIGNUP_CODE) {
        // return message('error','error_1', req, res);
        return next(new AppError(msgList.error.error_1.msg, msgList.error.error_1.status));
    }

      // 1. Check if the email is already in the database as a regular user
  const existingUser = await Admin.findOne({ email, role: 'admin' });
  if (existingUser) {
    return next(new AppError(msgList.error.error_8.msg, msgList.error.error_8.status));
  }


    // 2. Hash the password
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
 
     return message('success','success_email' ,req,res)

   } catch (err) {
    // If email sending fails, remove the admin user
    await Admin.findByIdAndDelete(newAdmin._id);

    return next(new AppError(msgList.error.error_8.msg, msgList.error.error_8.status));
 
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
  
   // Generate a JWT token for the admin
   const token = createToken(admin._id);
   admin.token = token;
    await admin.save();
  
   // Send the response with the token
   return message('success','success',req,res)
  })

  
  // Admin login controller
  exports.adminLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // 1. Check if email and password are provided
    if (!email || !password) {
      return next(new AppError(msgList.error.missing_fields.msg, msgList.error.missing_fields.status));
    }
  
    // 2. Find the admin by email and check if the role is 'admin'
    const admin = await Admin.findOne({ email }).select('+password'); // Explicitly select password
    if (!admin || admin.role !== 'admin') {
      return next(new AppError(msgList.error.invalid_credentials.msg, msgList.error.invalid_credentials.status));
    }
  
    // 3. Check if the password is correct
    const isPasswordCorrect = await admin.correctPassword(password, admin.password);
    if (!isPasswordCorrect) {
      return next(new AppError(msgList.error.invalid_credentials.msg, msgList.error.invalid_credentials.status));
    }
  
    // 4. Check if the admin has verified their email
    if (!admin.emailVerified) {
      return next(new AppError(msgList.error.email_not_verified.msg, msgList.error.email_not_verified.status));
    }
  
    // 5. If everything is correct, generate a JWT token
    const token = createToken(admin._id);
  
    // 6. Send the response with the token
    res.status(200).json({
      status: 'success',
      token,
      data: {
        admin: {
          email: admin.email,
          role: admin.role,
        },
      },
    });
  });



















    // // Extract the user information from the verified token
    // const tokenUser = req.user; // Assuming you have a middleware that verifies the token and attaches the user to req.user

    // // Check if the phone number in the token matches the one in the request
    // if (tokenUser.phoneNumber !== phoneNumber) {
    //     // return message('error','not_found_cellphone', req, res);
    //     return next(new AppError(msgList.error.not_found_cellphone.msg, msgList.error.not_found_cellphone.status));

    // }

    // // Check if the user exists as a regular user
    // const user = tokenUser

    // // Upgrade the user to admin
    // user.role = 'admin';
    // const token = createToken(user); // Assuming createToken generates a new JWT for the admin user
    // user.token = token;
    // await user.save();

    // // Send response
    // return message('custom_message', { msg: "کاربر ادمین شد عملیات موفق آمیز", token, status: 200 }, req, res);
// });


