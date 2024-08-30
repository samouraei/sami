const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        unique: [true, "Phone number is already in use."],
        // validate: {
        //     validator: function(v) {
        //         return /^09\d{9}$/.test(v); // Adjust the regex pattern according to the length of the phone number
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        // }
    },
    verificationCode: {
        type: String,
        required: false
    },
    verificationRequests: {
        type: Number,
        default: 0
    },
    lastVerificationRequest: {
        type: Date,
        required: false
    },
    verificationCodeExpires: {
        type: Date,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator', 'editor', 'viewer'],
        default: 'user',
      },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Please provide a valid email address'],
        trim: true
    },
    userAddress: {
        type: String,
        trim: true
    },
    bankAcc: {
        type: Number,
        trim: true
    },
    token: 
        
             {
                type: String,
            }
        
});

// Method to send verification code
// userSchema.methods.sendVerificationCode = function(callback) {
//     sendVerificationCode(this, callback);
// };

// Method to verify code
// userSchema.methods.verifyCode = function(code, callback) {
//     verifyCode(this, code, callback);
// };



const User = mongoose.model('User', userSchema);

module.exports = User;
