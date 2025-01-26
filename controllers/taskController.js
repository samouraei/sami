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
      return message('custom_message', {
        msg: "No tasks found matching your criteria.",
        status: 404
      }, req, res);
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

    return message('custom_message',{  msg: "Task not found or does not belong to you.", status: 404 },req,res)

  }

  if (task.status !== 'progress') {

    return message('custom_message',{  msg: "Task is not in progress and cannot be marked as done.", status: 400 },req,res)

  }

  // Update the task status to 'done'
  task.status = 'done';
  await task.save();

  return message('custom_message',{  msg: "تسک انجام شده است", task, status: 200 },req,res)

});