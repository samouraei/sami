
const { emailSignUpService } = require('../services/emailSignUpService');
const { verifyEmailToken } = require('../services/emailVerificationTokenService');
const { emailLoginService } = require('../services/emailLoginService');
const catchAsync = require('../utils/catchAsync');
const {message,msgList} = require('../utils/messages_user');


exports.adminSignUp = catchAsync(async (req, res, next) => {
  const { email, password, adminCode } = req.body;

  // Call the service for admin sign-up
  const result = await emailSignUpService({ email, password, adminCode, req });

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
    const { token, admin } = await emailLoginService(email, password);
  
    // Send the response with the token
    return message('custom_message', { msg: "ادمین وارد شد", token, status: 200 }, req, res);
  });



