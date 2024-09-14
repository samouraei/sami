const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Ensure the price is a non-negative number
  },
  appointmentLocation: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    minDays: {
      type: Number,
      required: true,
      min: 1 // Minimum days constraint
    },
    maxDays: {
      type: Number,
      required: true,
      // validate: {
      //   validator: function(value) {
      //     // Ensuring maxDays is greater than or equal to minDays
      //     return value >= this.minDays;
      //   },
      //   message: 'Max days must be greater than or equal to min days'
      // }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  requiredDocuments: {
    type: [String], // Array of strings to store document names
    required: true,
    validate: {
      validator: function(arr) {
        return arr.length > 0; // Ensure there's at least one required document
      },
      message: 'At least one document is required'
    }
  },
  refCountry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: [true, 'Country is required']
  }
});

const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = Appointment;
