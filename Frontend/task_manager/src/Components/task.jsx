import '../styles/task.css';

function Tasks () {

    return (
        <div className="taskcard">
            <form>
                <label>
                    Title:
                    <input type="text" name="title" required />
                </label>
                <br />
                <label>
                    Status:
                    <select name="task_status" defaultValue="pending" required>
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
                    <input type="date" name="due_date" />
                </label>
                <br />
                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}

export default Tasks;