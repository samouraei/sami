const AppError = require('../utils/appError');
const User = require('../models/userModel');
const { createToken } = require('../middlewares/user/jwtCreateTokenService');
const catchAsync = require('../utils/catchAsync');
const {message} = require('../utils/messages_user');


// Middleware to verify the verification code
const verifyCode = async (phoneNumber, verificationCode,req,res, next) => {
    // const { phoneNumber, verificationCode } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {

        return message('error','not_found_cellphone', req, res);
    }

    if (!user.verificationCode || !user.verificationCodeExpires) {
        return message('error','wrong_input_code', req, res);
    }

    if (Date.now() > user.verificationCodeExpires) {
        user.verificationCode = null;
        user.verificationCodeExpires = null;
        await user.save();
        return message('error','verification_not_valid', req, res);
    }

    if (user.verificationCode !== verificationCode) {
        return message('error','wrong_input_code', req, res);
    }

    // Verification successful, clear the code and expiration time
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    user.verificationRequests = 0; // Reset request count on successful verification
    user.isVerified = true; // Set user as verified
    await user.save();

    // req.user = user; // Attach user to request object for further processing
    return(user);
};

// Middleware to activate the user and generate a token
const userActivation = async (user, res, next) => {
    // const user = req.user; // Access the user from the previous middleware

    if (!user) {
        return message('error','not_found_cellphone', req, res);
    }

    const token = createToken(user);
    user.token = token;
    await user.save();

    return (user)
};

module.exports = {
    verifyCode,
    userActivation
};
