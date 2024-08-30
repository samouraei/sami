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