const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const servicesSchema = new mongoose.Schema({


    country: {
        type: String,
        unique: [true, "country is already saved to the list."],
      
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

const Services = mongoose.model('Services', servicesSchema);

module.exports = Services;