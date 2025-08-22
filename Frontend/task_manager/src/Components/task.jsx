import '../styles/task.css';
import api from '../lib/api';
import { useState } from 'react';

function Tasks () {
    const [taskData, setTaskData] = useState({
        title: "",
        task_status: "pending",
        due_date: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addTask = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/task/', taskData);
            setSuccess('Task added successfully!');
            setError("");
            setTaskData({ title: "", task_status: "pending", due_date: "" });
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to add task');
            setSuccess("");
        }
    };

    return (
        <div className="taskcard">
            <form onSubmit={addTask}>
                <label>
                    Title:
                    <input type="text" name="title" value={taskData.title} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Status:
                    <select name="task_status" value={taskData.task_status} onChange={handleChange} required>
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="deferred">Deferred</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </label>
                <br />
                <label>
                    Due Date:
                    <input type="date" name="due_date" value={taskData.due_date} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Add Task</button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    )
}

export default Tasks;