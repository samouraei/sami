const AppError = require('../utils/appError');
const User = require('../models/userModel');
const { createToken } = require('../middlewares/user/jwtCreateTokenService');

// Middleware to verify the verification code
const verifyCode = async (phoneNumber, verificationCode, next) => {
    // const { phoneNumber, verificationCode } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
        return next(new AppError('No user found with that mobile number', 404));
    }

    if (!user.verificationCode || !user.verificationCodeExpires) {
        return next(new AppError('No verification code found.', 400));
    }

    if (Date.now() > user.verificationCodeExpires) {
        user.verificationCode = null;
        user.verificationCodeExpires = null;
        await user.save();
        return next(new AppError('Verification code expired.', 400));
    }

    if (user.verificationCode !== verificationCode) {
        return next(new AppError('Invalid verification code.', 400));
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
        return next(new AppError('No user available for activation.', 400));
    }

    const token = createToken({ id: user._id, phoneNumber: user.phoneNumber });
    user.token = token;
    await user.save();

    return (user)
};

module.exports = {
    verifyCode,
    userActivation
};
