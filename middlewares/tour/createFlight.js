const Flight = require('../../models/flightModel');
// const Tour = require('../../models/tourModel');
const {message,msgList} = require('../../utils/messages_user');
const AppError = require('../../utils/appError'); // Adjust path as needed

// Function to create or update a user profile
const createFlight = async ( req, res ) => {

const {airline,flightNumber,flightKind,departureCity,departureAirport,
    arrivalCity,arrivalAirport,departureTime,arrivalTime,price,
    layoversNumber,layoversDuration,duration,seatClass,flightStatus,createdAt,updatedAt } =req.body;
//   const country = await Country.findById(countryID);

//   if (!country) {
//     // return message('error','error_13', req, res);
//     return next(new AppError(msgList.error.error_13.msg, msgList.error.error_13.status));

//   }

  const flight = new Flight({
    // name: country.name,
    airline,
    flightNumber,
    flightKind,
    departureCity,
    departureAirport,
    arrivalCity,
    arrivalAirport,
    departureTime,
    arrivalTime,
    price,
    layoversNumber,
    layoversDuration,
    duration,
    seatClass,
    flightStatus,
    createdAt,
    updatedAt
                   });

  await flight.save();

    // Add the visa ID to the country's visas array and update the country
    // country.visas.push(visa._id);
    // await country.save(); // Save the updated country with the new visa ID
 
  // console.log(visa);
  return flight;
};

module.exports = {
  createFlight
};
