const AppError = require('../utils/appError');
const User = require('../models/userModel');
const { createToken } = require('./jwtCreateTokenService');
const catchAsync = require('../utils/catchAsync');
const {message,msgList} = require('../utils/messages_user');


// Middleware to verify the verification code
const verifyCode = async (phoneNumber, verificationCode,req,res, next) => {
    // const { phoneNumber, verificationCode } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {

        // return message('error','not_found_cellphone', req, res);
        return next(new AppError(msgList.error.not_found_cellphone.msg, msgList.error.not_found_cellphone.status));

    }

    if (!user.verificationCode || !user.verificationCodeExpires) {
        // return message('error','wrong_input_code', req, res);
        return next(new AppError(msgList.error.wrong_input_code.msg, msgList.error.wrong_input_code.status));

    }

    if (Date.now() > user.verificationCodeExpires) {
        user.verificationCode = null;
        user.verificationCodeExpires = null;
        await user.save();
        // return message('error','verification_not_valid', req, res);
        return next(new AppError(msgList.error.verification_not_valid.msg, msgList.error.verification_not_valid.status));

    }

    if (user.verificationCode !== verificationCode) {
        // return message('error','wrong_input_code', req, res);
        return next(new AppError(msgList.error.wrong_input_code.msg, msgList.error.wrong_input_code.status));

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
        return next(new AppError(msgList.error.not_found_cellphone.msg, msgList.error.not_found_cellphone.status));
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
