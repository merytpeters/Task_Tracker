import Task from '../models/task.js';

export async function createTask(req, res) {
  try {
    const { title, created_at, task_status, due_date } = req.body;
    const newTask = new Task({
      title,
      created_at,
      task_status,
      due_date
    });

    const savedTask = newTask.save();
    res.status(201).json({
       message: "Task created successfully",
      task: savedTask
    });
   } catch (err) {
    res.status(500).send('Error creating task')
   }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, created_at, task_status, due_date } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, created_at, task_status, due_date },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask
    });
  } catch (err) {
    res.status(500).send('Error updating task');
  }
}

export async function viewTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks
    });
  } catch (err) {
    res.status(500).send('Error retrieving tasks');
  }
}

export function Notification(task, due_date) {
  const timeUntilDue = new Date(due_date) - new Date();
  if (timeUntilDue > 0) {
    setTimeout(() => {
      //send the actual notification
      console.log(`${task.title} is due in ${due_date}`);
    }, timeUntilDue);
  } else {
    console.log(`${task.title} was due in the past`);
  }
}

export async function taskNotification(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    scheduleNotification(task, task.due_date);
    res.status(200).json({ message: "Notification scheduled successfully" });
  } catch (err) {
    res.status(500).send('Error scheduling notification');
  }
}

