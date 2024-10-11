
const { emailSignUp } = require('../services/emailSignUpService');
const { verifyEmailToken } = require('../services/emailVerificationTokenService');
const { emailLogin } = require('../services/emailLoginService');
const { forgotPassword } = require('../services/adminForgotPasswordService');
const { resetPassword } = require('../services/adminResetPasswordService');
const { createToken } = require('../services/jwtCreateTokenService');
const catchAsync = require('../utils/catchAsync');
const {message,msgList} = require('../utils/messages_user');


exports.adminSignUp = catchAsync(async (req, res, next) => {
  const { email, password, adminCode } = req.body;

  // Call the service for admin sign-up
  const result = await emailSignUp({ email, password, adminCode, req });

  // Send success message to the client
  return message('success', 'success_email', req, res);
});



exports.adminVerification = catchAsync(async (req, res, next) => {
  // Call the service to verify the email
  await verifyEmailToken(req.params.token);

  // Send the success message to the client
  return message('success', 'success', req, res);
});

  
  // Admin login controller
  exports.adminLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // Use the login service to handle the business logic
    const { token, admin } = await emailLogin(email, password);
  
    // Send the response with the token
    return message('custom_message', { msg: "ادمین وارد شد", token, status: 200 }, req, res);
  });


exports.adminForgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
  
    // Use the service to handle forgot password logic
    const successMessage = await forgotPassword(email, req);
  
    // Send the response to the client
    return message('success', 'success_email', req, res);
  });


exports.adminResetPassword = catchAsync(async (req, res, next) => {
    const { token } = req.params;  // Extract token from the URL
    const { password } = req.body; // Extract the new password from the request body
  
    // Use the service to handle the password reset logic
    const admin = await resetPassword(token, password);
  
    // Optionally, you can generate a new token for the user if needed
    const newToken = createToken(admin._id);
  
    // Send the response with a success message
    return message('custom_message', { msg: "پسورد جدید شما ثبت شد", token: newToken, status: 200 }, req, res);
  });


