const AppError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const {message} = require('../utils/messages_user');
const { createToken } = require('../middlewares/user/jwtCreateTokenService');




exports.adminSignUp = catchAsync(async (req, res, next) => {
    const { phoneNumber, adminCode } = req.body;

    // Check if the admin code matches the required code
    if (adminCode !== process.env.ADMIN_SIGNUP_CODE) {
        return next(new AppError('Invalid admin sign-up code', 403));
    }

    // Extract the user information from the verified token
    const tokenUser = req.user; // Assuming you have a middleware that verifies the token and attaches the user to req.user

    // Check if the phone number in the token matches the one in the request
    if (tokenUser.phoneNumber !== phoneNumber) {
        return next(new AppError('Phone number mismatch. The phone number in the token does not match the one in the request.', 403));
    }

    // Check if the user exists as a regular user
    const user = await User.findOne({ phoneNumber });
    if (!user) {
        return next(new AppError('User not found. You must first login as a regular user.', 404));
    }

    // Upgrade the user to admin
    user.role = 'admin';
    const token = createToken(user); // Assuming createToken generates a new JWT for the admin user
    user.token = token;
    await user.save();

    // Send response
    return message('custom_message', { msg: "Admin sign-up successful", token, status: 200 }, req, res);
});




// exports.adminLogin = catchAsync(async (req, res, next) => {
//     const { phoneNumber } = req.body;

//     const user = await login(phoneNumber, res, next);

//     // Check if the user is an admin
//     if (user.role !== 'admin') {
//         return next(new AppError('Access denied. Admins only.', 403));
//     }

//     const token = createToken(user); // This token will include the 'admin' role

//     return message('custom_message', { msg: "Admin login success", token, status: 200 }, req, res);
// });
