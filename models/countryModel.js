const mongoose = require('mongoose');

// Updated Country schema
const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  visaKind: {
    type: String,
    enum: ['3ماهه', '45روزه', 'الکترونیکی', 'فرودگاهی', 'مسدود', 'بدون ویزا', '30روزه'],
    required: [true, 'Visa kind is required']
  },
  visas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visa'
    }
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    }
  ],
  pickups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pickup'
    }
  ]
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
