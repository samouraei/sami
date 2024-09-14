const Country = require('../../models/countryModel');
const Pickup = require('../../models/pickupModel');
const AppError = require('../../utils/appError'); // Adjust path as needed
const {message,msgList} = require('../../utils/messages_user');


// Function to create or update a user profile
const createPickup = async (countryID,
     { price,pickupLocation,dropoffLocation,duration,pickupDate,createdAt,requiredDocuments }) => {

  const country = await Country.findById(countryID);

  if (!country) {
    return next(new AppError(msgList.error.error_13.msg, msgList.error.error_13.status));
  }

  const pickup = new Pickup({
    name: country.name,
    price,
    pickupLocation,
    dropoffLocation,
    duration,
    pickupDate,
    createdAt,
    requiredDocuments,
    refCountry: countryID
  });

  await pickup.save();
  console.log(pickup);
  return pickup;
};

module.exports = {
    createPickup
};
