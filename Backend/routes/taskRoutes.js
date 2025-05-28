import express from 'express';
import { createTask, updateTask, viewTasks } from '../controllers/taskController.js';

const router = express.Router();

router.post('/task', createTask, updateTask);
router.get('/tasks', viewTasks);

export default router;