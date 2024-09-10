const AppError = require('../utils/appError');
const {createVisa}  = require('../middlewares/visa/createVisa');
const catchAsync = require('../utils/catchAsync');
const {message} = require('../utils/messages_user');




exports.createVisa = catchAsync(async (req, res, next) => {
    const { name, visaType, validityPeriod, duration,urgencyLevel,issuancePeriod,refCountry } = req.body;
    const countryID = req.countryId; // Access the user ID from the authenticated user

    // Assuming createVisa is a service function that saves the visa
    const newVisa = await createVisa
    (countryID, { name, visaType, validityPeriod, duration,urgencyLevel,issuancePeriod,refCountry });


    return message('custom_message',{  msg: "done", newVisa, status: 200 },req,res)

})


exports.findCountry = catchAsync(async (req, res, next) => {
    // Get page number from query, default to 1 if not provided
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 20; // Number of countries per page
    const skip = (page - 1) * limit; // Calculate how many items to skip
    
    // Find countries with pagination
    const countryList = await Country.find()
        .skip(skip)
        .limit(limit)
        .select('name') // Select only the country name field if you need only names
    
    // Get total count of countries for pagination metadata
    const totalCountries = await Country.countDocuments();

    // Return the country list along with pagination info
    return message('custom_message', {
        countryList,
        status: 200,
        totalCountries,
        currentPage: page,
        totalPages: Math.ceil(totalCountries / limit)
    }, req, res);
});


exports.setVisaKind = catchAsync(async (req, res, next) => {

    const countryId = req.body.countryId; // Access the country ID from the request
    const visaKind = req.body.visaKind

    const country = await Country.findById(countryId);

    if(!country) {
        return next(new AppError('there is no country with that ID', 400))
    } else {

        country.visaKind = visaKind;

        // Save the updated country document
        await country.save();

    return message('custom_message',{  msg: "success", country, status: 200 },req,res)
    }

})

exports.createPickup = catchAsync(async (req, res, next) => {
    const { name, price,pickupLocation,dropoffLocation,duration,pickupDate,createdAt,requiredDocuments } = req.body;
    const countryId = req.body.countryId; // Access the user ID from the authenticated user

    // Assuming createPickup is a service function that saves the visa
    const newPickup = await createPickup (countryId,
         { name, price,pickupLocation,dropoffLocation,duration,pickupDate,createdAt,requiredDocuments });


    return message('custom_message',{  msg: "done", newPickup, status: 200 },req,res)

})