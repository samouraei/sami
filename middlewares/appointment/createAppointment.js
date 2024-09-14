const Country = require('../../models/countryModel');
const Appointment = require('../../models/appointmentModel');
const AppError = require('../../utils/appError'); // Adjust path as needed
const {message,msgList} = require('../../utils/messages_user');


// Function to create or update a user profile
const createAppointment = async (countryID,
     { price,appointmentLocation,duration,createdAt,requiredDocuments }) => {

  const country = await Country.findById(countryID);

  if (!country) {
    return next(new AppError(msgList.error.error_13.msg, msgList.error.error_13.status));
  }

  const appointment  = new Appointment ({
    name: country.name,
    price,
    appointmentLocation,
    duration,
    createdAt,
    requiredDocuments,
    refCountry: countryID
  });

  await appointment.save();
  console.log(appointment);
  return appointment;
};

module.exports = {
    createAppointment
};
