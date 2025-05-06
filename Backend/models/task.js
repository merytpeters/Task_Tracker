import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  task_status: {
    type: String,
    enum: {
      values: ['pending', 'in progress', 'completed', 'cancelled', 'deferred', 'unknown'],
      message: '{VALUE} is not a valid status'
    },
    default: 'pending',
  },
  due_date: {
    type: Date,
    required: false
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
