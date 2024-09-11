const Country = require('../../models/countryModel');
const Pickup = require('../../models/pickupModel');
const AppError = require('../../utils/appError'); // Adjust path as needed

// Function to create or update a user profile
const createPickup = async (countryID,
     { price,pickupLocation,dropoffLocation,duration,pickupDate,createdAt,requiredDocuments }) => {

  const country = await Country.findById(countryID);

  if (!country) {
    return ( new AppError('country not found', 404));
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
