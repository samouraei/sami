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

    // Check if the user exists as a regular user
    const user = await User.findOne({ phoneNumber });
    if (!user) {
        return next(new AppError('User not found. You must first login as a regular user.', 404));
    }

    // Upgrade the user to admin
    user.role = 'admin';
    await user.save();

    const token = createToken(user);
    user.token = token;
    await user.save();

    return message('custom_message', { msg: "Admin sign-up successful",token, status: 200 }, req, res);
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
