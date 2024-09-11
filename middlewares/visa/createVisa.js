const Country = require('../../models/countryModel');
const Visa = require('../../models/visaModel');
const AppError = require('../../utils/appError'); // Adjust path as needed

// Function to create or update a user profile
const createVisa = async (countryID, { visaType, validityPeriod, duration,urgencyLevel,issuancePeriod, req, res }) => {

  const country = await Country.findById(countryID);

  if (!country) {
    return message('error','error_13', req, res);
  }

  const visa = new Visa({
    name: country.name,
    visaType,
    validityPeriod,
    duration,
    urgencyLevel,
    issuancePeriod,
    refCountry: countryID
  });

  await visa.save();
  // console.log(visa);
  return visa;
};

module.exports = {
  createVisa
};
