const User = require('../models/userModel');
const AppError = require('../utils/appError');
const sendVerificationCode = require('../middlewares/user/sendVerificationCode');


const login = async (phoneNumber) => {    

    // Check if user already exists
    let user = await User.findOne({ phoneNumber: phoneNumber });

    console.log('user:',user)

    if (!user) {
        // If user does not exist, create a new user with the sanitized phone number
        user = new User({ phoneNumber: phoneNumber });
        await user.save();

        console.log('newUser:',user)


    } 
    
     // Send verification code
      await sendVerificationCode(user);

console.log('service:',user)
        
        return (user)

    
};

module.exports = { login };
