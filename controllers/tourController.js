const AppError = require('../utils/appError');
const Flight = require('../models/flightModel');
const catchAsync = require('../utils/catchAsync');
const {message,msgList} = require('../utils/messages_user');
const {createFlight} = require('../middlewares/tour/createFlight');



exports.createFlight = catchAsync(async (req, res, next) => {
    // Assuming createFlight is a service function that saves the visa
    const newFlight = await createFlight( req, res );


    return message('custom_message',{  msg: "پرواز جدید ثبت شد", newFlight, status: 200 },req,res)

})
