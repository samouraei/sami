const catchAsync = require('../utils/catchAsync');
const { redisPublisher } = require('../utils/redis');
const {message,msgList} = require('../utils/messages_user');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const Task = require('../models/taskModel');

exports.createTask = catchAsync(async (req, res, next) => {
    const { userID, name, taskType, validityPeriod, duration, urgencyLevel } = req.body;
  
    const user = await User.findById(userID);
    if (!user) {

        return next(new AppError('کاربر با این مشخصات یافت نشد.', 404));
     }
  
    const task = new Task({
      name,
      taskType,
      validityPeriod,
      duration,
      urgencyLevel,
      refUser: userID,
    });
  
    await task.save();
  
    user.tasks.push(task._id);
    await user.save();
  
    return message('custom_message', { msg: "تسک جدید ایجاد شد", task, status: 200 }, req, res);
  });


exports.getUserTasks = catchAsync(async (req, res, next) => {
    const userId = req.user.id; 
    const { status } = req.query; 
  
    
    let filter = {};
  
    // If the user is an admin, they can see all tasks (no refUser filter)
    if (req.user.role === 'admin') {
     
      if (status) {
        filter.status = status;
      }
    } else {
      // If the user is not an admin, filter tasks by their own refUser
      filter.refUser = userId;
      
      if (status) {
        filter.status = status;
      }
    }
    
    const tasks = await Task.find(filter);
    
    if (tasks.length === 0) {
        return next(new AppError('تسک با این مشخصات یافت نشد.', 404));
    }
  
   
    return message('custom_message', {
      msg: "لیست تسکهای شما",
      tasks,
      status: 200
    }, req, res);
  });

  

  exports.markTaskAsDone = catchAsync(async (req, res, next) => {
    const { taskId } = req.params; 
    const userId = req.user.id; 
  
    const task = await Task.findOne({ _id: taskId, refUser: userId });
  
    if (!task) {
        return next(new AppError('تسک مورد نظر یافت نشد.', 404));    }
  
    if (task.status !== 'progress') {
        return next(new AppError('تسک با این مشخصات یافت نشد.', 400));
    //   return message('custom_message', { msg: "Task is not in progress and cannot be marked as done.", status: 400 }, req, res);
    }
  
    task.status = 'done';
    await task.save();
  
    // Publish task update to Redis
    await redisPublisher.publish(
      'taskUpdates',
      JSON.stringify({ taskId: task._id, status: task.status, userId })
    );
  
    return message('custom_message', { msg: "Task marked as done.", task, status: 200 }, req, res);
  });


exports.updateTask = catchAsync(async (req, res, next) => {
    const { taskId } = req.params;
    const updates = req.body;
  
    const task = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
      runValidators: true,
    });
  
    if (!task) {

        return next(new AppError('تسک مورد نظر یافت نشد.', 404));
    }

     // Publish the task update to Redis for broadcasting
    await redisPublisher.publish('taskUpdates', JSON.stringify({
          userId: task.refUser, // User to notify about the task update
          task,
         }));

    return message('custom_message',{  msg: "تغییرات انجام شد ", task, status: 200 },req,res)

  });


  exports.deleteTask = catchAsync(async (req, res, next) => {
    const {taskId}  = req.params;

    console.log(taskId)
  
    const task = await Task.findById(taskId);
    if (!task) {
      return next(new AppError('تسک مورد نظر یافت نشد.', 404));
    }
  
    // Remove the task reference from the user's tasks array
    await User.findByIdAndUpdate(task.refUser, { $pull: { tasks: taskId } });
  
    await task.deleteOne();
  
    return message('custom_message', { msg: "تسک با موفقیت حذف شد", status: 200 }, req, res);
  });