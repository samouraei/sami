// models/Country.js
const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    unique: true
  },
  visaKind :{

    type: String,
    enum: ['3ماهه', '45روزه','الکترونیکی','فرودگاهی','مسدود','بدون ویزا','30روزه'],
    required: [true, 'visa kind is required']
  }
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
