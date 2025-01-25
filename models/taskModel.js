const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true
  },
  taskType: {
    type: String,
    enum: ['database task', 'frontend task', 'backend task'],
    required: [true, 'task type is required'],
},
validityPeriod: {
    type: Number, // Duration in days
    required: [true, 'Validity period is required']
},
duration: {
    type: Number, // Duration in days
    required: [true, 'duration  is required']
},
urgencyLevel: {
    type: String,
    enum: ['عادی', 'فوری'],
    required: [true, 'urgency type is required'],
},
issuanceDate: {
    type: Date,
    default: Date.now, // Automatically sets the current date
  },

status: {
    type: String,
    enum: ['progress', 'done', 'cancel'], // Options for status
    default: 'progress', // Default value
    required: [true, 'Status is required'],
  },
  
refUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'user is required']
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
