import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/allprojects.css';
import api from '../lib/api';

function AllProjects () {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found');
                    setLoading(false);
                    navigate('/login');
                    return;
                }
                const response = await api.get('/api/task/tasks');
                setProjects(response.data.tasks || []);
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch tasks');
                setLoading(false);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate('/login');
                }
            }
        };
        fetchProjects();
    }, [navigate]);

    return (
        <div className="allprojects-container">
            <div className='flex-container'>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : projects.length === 0 ? (
                    <p>No tasks found.</p>
                ) : (
                    projects.map((task, index) => (
                        <div key={task.id || index} className='item'>
                            <h3>{task.title}</h3>
                            <p>Status: <strong>{task.task_status}</strong></p>
                            <p>Created: {task.created_at ? new Date(task.created_at).toLocaleDateString() : 'N/A'}</p>
                            {task.due_date && (
                                <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default AllProjects