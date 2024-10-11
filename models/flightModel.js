const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: [true, 'Airline is required'],
    trim: true,
  },
  flightNumber: {
    type: String,
    required: [true, 'Flight number is required'],
    trim: true,
    unique: true,
  },
  flightKind: {
    type: String,
    enum: ['Charter', 'Regular'],
    required: [true, 'Flight kind is required'],
  },
  departureCity: {
    type: String,
    required: [true, 'Departure city is required'],
    trim: true,
  },
  departureAirport: {
    type: String,
    required: [true, 'Departure airport is required'],
    trim: true,
  },
  arrivalCity: {
    type: String,
    required: [true, 'Arrival city is required'],
    trim: true,
  },
  arrivalAirport: {
    type: String,
    required: [true, 'Arrival airport is required'],
    trim: true,
  },
  departureTime: {
    type: Date,
    required: [true, 'Departure time is required'],
  },
  arrivalTime: {
    type: Date,
    required: [true, 'Arrival time is required'],
  },
  layoversNumber: {
    type: Number,
    default: 0, // Defaults to non-stop flight
  },
  layoversDuration: {
    type: Number, // in minutes
    default: 0, // Defaults to 0 for non-stop flight
  },
  price: {
    type: Number,
    required: [true, 'Flight price is required'],
    min: 0,
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Flight duration is required'],
  },
  seatClass: {
    type: String,
    enum: ['Economy', 'Business', 'First'],
    required: [true, 'Seat class is required'],
  },
  flightStatus: {
    type: String,
    enum: ['Scheduled', 'Delayed', 'Cancelled', 'Landed'],
    default: 'Scheduled',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
