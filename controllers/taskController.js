const AppError = require('../utils/appError');
const {createTask}  = require('../middlewares/task/createTask');
const catchAsync = require('../utils/catchAsync');
const {message,msgList} = require('../utils/messages_user');
const Task = require('../models/taskModel');

exports.createTask = catchAsync(async (req, res , next) => {
    const {userID, name, taskType, validityPeriod, duration,urgencyLevel } = req.body;
    
    // Assuming createtask is a service function that saves the task
    const newTask = await createTask
    (userID,{ name, taskType, validityPeriod, duration,urgencyLevel, req, res });


    return message('custom_message',{  msg: "تسک جدید ایجاد شد", newTask, status: 200 },req,res)

})



exports.getUserTasks = catchAsync(async (req, res, next) => {

    console.log(req)

    const userId = req.user.id; 
  console.log(userId)
    const tasks = await Task.find({ refUser: userId });

    return message('custom_message',{  msg: "لیست تسکهای شما", tasks, status: 200 },req,res)

  });


exports.markTaskAsDone = catchAsync(async (req, res, next) => {
  const { taskId } = req.params; 
  const userId = req.user.id; 

  const task = await Task.findOne({ _id: taskId, refUser: userId });

  if (!task) {

    return message('custom_message',{  msg: "Task not found or does not belong to you.", status: 404 },req,res)

    // return res.status(404).json({
    //   status: 'fail',
    //   message: 'Task not found or does not belong to you.',
    // });
  }

  if (task.status !== 'progress') {

    return message('custom_message',{  msg: "Task is not in progress and cannot be marked as done.", status: 400 },req,res)

    // return res.status(400).json({
    //   status: 'fail',
    //   message: 'Task is not in progress and cannot be marked as done.',
    // });
  }

  // Update the task status to 'done'
  task.status = 'done';
  await task.save();

  return message('custom_message',{  msg: "تسک انجام شده است", task, status: 200 },req,res)

//   res.status(200).json({
//     status: 'success',
//     data: task,
//   });
});


  

// exports.findCountry = catchAsync(async (req, res, next) => {
//     // Get page number from query, default to 1 if not provided
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = 20; // Number of countries per page
//     const skip = (page - 1) * limit; // Calculate how many items to skip
    
//     // Find countries with pagination
//     const countryList = await Country.find()
//         .skip(skip)
//         .limit(limit)
//         .select('name _id'); // Select both the name and _id fields
    
//     // Get total count of countries for pagination metadata
//     const totalCountries = await Country.countDocuments();

//     // Return the country list along with pagination info
//     return message('custom_message', {
//         countryList,
//         status: 200,
//         totalCountries,
//         currentPage: page,
//         totalPages: Math.ceil(totalCountries / limit)
//     }, req, res);
// });


// exports.setVisaKind = catchAsync(async (req, res, next) => {

//     const countryId = req.body.countryId; // Access the country ID from the request
//     const visaKind = req.body.visaKind

//     const country = await Country.findById(countryId);

//     if(!country) {
//         // return message('error','error_13', req, res);
//         return next(new AppError(msgList.error.error_13.msg, msgList.error.error_13.status));

//     } else {

//         country.visaKind = visaKind;

//         // Save the updated country document
//         await country.save();

//     return message('custom_message',{  msg: "ویزا ثبت شد", country, status: 200 },req,res)
//     }

// })

// exports.createPickup = catchAsync(async (req, res, next) => {
//     const { name, price,pickupLocation,dropoffLocation,duration,pickupDate,createdAt,requiredDocuments } = req.body;
//     const countryId = req.body.countryId; // Access the user ID from the authenticated user

//     // Assuming createPickup is a service function that saves the visa
//     const newPickup = await createPickup (countryId,
//          { name, price,pickupLocation,dropoffLocation,duration,pickupDate,createdAt,requiredDocuments });


//     return message('custom_message',{  msg: "پیکاپ جدید ایجاد شد", newPickup, status: 200 },req,res)

// })

// exports.createAppointment = catchAsync(async (req, res, next) => {
//     const { name, price,appointmentLocation,duration,createdAt,requiredDocuments } = req.body;
//     const countryId = req.body.countryId; // Access the user ID from the authenticated user

//     // Assuming createPickup is a service function that saves the visa
//     const newAppointment = await createAppointment (countryId,
//          { name, price,appointmentLocation,duration,createdAt,requiredDocuments });


//     return message('custom_message',{  msg: "وقت سفارت جدید ایجاد شد", newAppointment, status: 200 },req,res)

// })


// exports.visaOrdering = catchAsync(async (req, res, next) => {

//     const countryId = req.body.countryId; // Access the country ID from the request
//     const visaId = req.body.visaId;

//     const country = await Country.findById(countryId);

//     if(!country) 
//         // return message('error','error_13', req, res);
//         return next(new AppError(msgList.error.error_13.msg, msgList.error.error_13.status));

//     const visa = await Visa.findById(visaId);

//          if(!visa) 
//         // return message('error','error_13', req, res);
//         return next(new AppError(msgList.error.wrong_input_visa.msg, msgList.error.wrong_input_visa.status));

//         if(!country.visas.some(visa => visa._id.toString() === visaId))

//             return next(new AppError(msgList.error.wrong_input_visa_1.msg, msgList.error.wrong_input_visa_1.status));

//             const newOrdering = await visaOrdering (req, res, next);
            
//     return message('custom_message',{  msg: " ثبت سفارش انجام شد", newOrdering, status: 200 },req,res)
    

// })