const mongoose = require('mongoose');

const visaOrderSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    validate: {
      validator: function(v) {
        return /^09\d{9}$/.test(v); // Example: mobile number starts with '09' and is 11 digits long
      },
      message: 'Mobile number must start with 09 and be 11 digits long'
    }
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  paymentKind: {
    type: String,
    enum: ['online', 'offline'],
    required: [true, 'Payment kind is required']
  },
  birthday: {
    type: Date,
    required: [true, 'Birthday is required']
  },
  passportExpirationDate: {
    type: Date,
    required: [true, 'Passport expiration date is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  refVisa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visa',
    required: [true, 'Visa is required']
  }
});

const VisaOrder = mongoose.model('VisaOrder', visaOrderSchema);

module.exports = VisaOrder;
