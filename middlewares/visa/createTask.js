const User = require('../../models/userModel');
const Task = require('../../models/taskModel');
const {message,msgList} = require('../../utils/messages_user');
const AppError = require('../../utils/appError'); // Adjust path as needed

// Function to create or update a user profile
const createTask = async (userID,{name, taskType, validityPeriod, duration,urgencyLevel, req, res , next }) => {

  const user = await User.findById(userID);

  if (!user) {
    // return message('error','error_13', req, res);
    return next(new AppError(msgList.error.error_13.msg, msgList.error.error_13.status));

  }

  const task = new Task({
    name,
    taskType,
    validityPeriod,
    duration,
    urgencyLevel,
    refUser: userID
  });

  await task.save();

    // Add the visa ID to the country's visas array and update the country
    user.tasks.push(user._id);
    await user.save(); // Save the updated country with the new visa ID
 
  // console.log(visa);
  return task;
};

module.exports = {
  createTask
};
