const AppError = require('../utils/appError');
const {createVisa}  = require('../middlewares/visa/createVisa');
const catchAsync = require('../utils/catchAsync');
const {message} = require('../utils/messages_user');
const Country = require('../models/countryModel');




exports.createVisa = catchAsync(async (req, res, next) => {
    const { visaType, validityPeriod, duration,urgencyLevel,issuancePeriod } = req.body;
    const countryID = req.body.countryId; // Access the user ID from the authenticated user

    console.log(countryID);

    // Assuming createVisa is a service function that saves the visa
    const newVisa = await createVisa
    (countryID, { visaType, validityPeriod, duration,urgencyLevel,issuancePeriod });


    return message('custom_message',{  msg: "done", newVisa, status: 200 },req,res)

})


exports.findCountry = catchAsync(async (req, res, next) => {

    const countryID = req.body.countryId; // Access the country ID from the request

    const country = await Country.findById(countryID);

    if(!country) {
        return next(new AppError('there is no country with that ID', 400))
    } else {

    return message('custom_message',{  msg: "success", country, status: 200 },req,res)
    }

})

exports.setVisaKind = catchAsync(async (req, res, next) => {

    const countryID = req.body.countryId; // Access the country ID from the request
    const visaKind = req.body.visaKind

    const country = await Country.findById(countryID);

    if(!country) {
        return next(new AppError('there is no country with that ID', 400))
    } else {

        country.visaKind = visaKind
        await Country.save(country)

    return message('custom_message',{  msg: "success", country, status: 200 },req,res)
    }

})