const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        unique: [true, "Phone number is already in use."],
        required: [true, "A phone number is required."],
      
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




const User = mongoose.model('User', userSchema);

module.exports = User;
