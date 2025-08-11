import '../styles/allprojects.css'

function AllProjects () {
    const Alltasks = ['Task 1', 'Task 2', 'Task 3'];

    return (
        <div className="allprojects-container">
            <div className='flex-container'>
                {Alltasks.map((task, index) => (
                    <div key={index} className='item'>
                        <h3>{task.title}</h3>
                        <p>Status: <strong>{task.task_status}</strong></p>
                        <p>Created: {new Date(task.created_at).toLocaleDateString()}</p>
                            {task.due_date && (
                        <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default AllProjects