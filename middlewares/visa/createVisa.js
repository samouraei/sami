const Country = require('../../models/countryModel');
const Visa = require('../../models/visaModel');
const {message,msgList} = require('../../utils/messages_user');
const AppError = require('../../utils/appError'); // Adjust path as needed

// Function to create or update a user profile
const createVisa = async (countryID, { visaType, validityPeriod, duration,urgencyLevel,issuancePeriod, req, res }) => {

  const country = await Country.findById(countryID);

  if (!country) {
    // return message('error','error_13', req, res);
    return next(new AppError(msgList.error.error_13.msg, msgList.error.error_13.status));

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
