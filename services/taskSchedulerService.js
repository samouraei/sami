const cron = require('node-cron');
const Task = require('../models/taskModel'); // Adjust the path if needed

const startTaskScheduler = () => {
  console.log('Initializing the task scheduler...');
  cron.schedule('0 0 * * *', async () => {
    console.log('Running daily task scheduler...');

    try {
      const now = new Date();

      const tasks = await Task.find({
        status: 'progress',
        $expr: { $lte: ['$issuanceDate', { $subtract: [now, { $multiply: ['$validityPeriod', 24 * 60 * 60 * 1000] }] }] },
      });

      console.log(`Found ${tasks.length} tasks to update.`);

      for (const task of tasks) {
        task.status = 'cancel';
        await task.save();
        console.log(`Updated task with ID: ${task._id}`);
      }

      console.log('Task scheduler completed successfully.');
    } catch (error) {
      console.error('Error in task scheduler:', error.message);
    }
  });
};

module.exports = { startTaskScheduler };
