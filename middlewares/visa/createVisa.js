const Country = require('../../models/countryModel');
const AppError = require('../../utils/appError'); // Adjust path as needed
const catchAsync = require('../../utils/catchAsync'); // Adjust path as needed

// Function to create or update a user profile
const createVisa = async (countryID, { name, visaType, validityPeriod, duration,urgencyLevel,issuancePeriod,refCountry }) => {

  const country = await Country.findById(countryID);

  if (!country) {
    throw new AppError('country not found', 404);
  }

  country.name = name;
  country.visaType = visaType;
  country.validityPeriod = validityPeriod;
  country.duration = duration;
  country.urgencyLevel = urgencyLevel;
  country.issuancePeriod = issuancePeriod;
  country.country = refCountry;

  await country.save();
country
return country;
};

module.exports = {
  createVisa
};
