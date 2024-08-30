// models/Country.js
const mongoose = require('mongoose');

const visaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  visaType: {
    type: String,
    enum: ['ویزا لیبلی', 'ویزا الکترونیکی', 'ویزا نیاز به مشاوره'],
    required: [true, 'Visa type is required'],
},
validityPeriod: {
    type: Number, // Duration in days
    required: [true, 'Validity period is required']
},
duration: {
    type: Number, // Duration in days
    required: [true, 'duration  is required']
},
urgencyLevel: {
    type: String,
    enum: [' عادی', 'فوری '],
    required: [true, 'urgency type is required'],
},
issuancePeriod: {
    type: Number, // Duration in days
    required: [true, 'issuance Period  is required']
},
refCountry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: [true, 'Country is required']
  }
});

const Visa = mongoose.model('Visa', visaSchema);

module.exports = Visa;
