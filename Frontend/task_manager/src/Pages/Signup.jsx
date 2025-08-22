import { useState } from 'react';
import Navbar from '../Components/navbar.jsx';
import { useNavigate } from 'react-router-dom';
import Alert from '../Components/alert.jsx';
import '../styles/signup.css';
import api from '../lib/api.js';

function Signup() {
    const [formData, setFormData] = useState ({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        username:'',
        confirmPassword: ''
    });

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    // Handles input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handles Submit
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check for empty fields
        for (const key in formData) {
            if (!formData[key]) {
                setAlertType('error');
                setAlertMessage('Please fill all required fields');
                return;
            }
        }
        if (formData.password !== formData.confirmPassword) {
            setAlertType('error');
            setAlertMessage("Passwords do not match");
            return;
        }
        try {
            const response = await api.post('/api/user/signup', formData);
            if (response.status === 200 || response.status === 201) {
                setAlertType('success');
                setAlertMessage('Signup successful! Redirecting...');
                setTimeout(() => navigate('/login'), 1500);
            } else {
                setAlertType('error');
                setAlertMessage('Signup failed. Please fill all required fields');
                console.log('Signup failed with status:', response.status);
            }
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            setAlertType('error');
            setAlertMessage(error.response?.data?.message || 'Signup failed. Please fill all fields');
        }
    };
        
    return (
        <div className="page-container">
            <Navbar />
            <div className="pixie" style={{ backgroundImage: "url('/img/task-graphic.png')"}}>
            <p className='signup-header'>SignUp</p>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                </div>
                <div>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                </div>
                <div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                    />
                </div>
                <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                </div>
                <div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                </div>
                <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                    />
                </div>
                <button type='submit' className='signup-button'>Signup</button>
            </form>
            <div className='alert'>
                <Alert
                   message={alertMessage}
                   type={alertType}
                   onClose={() => setAlertMessage('')}
                   duration={3000}
                />
                </div>
            </div>
        </div>
    )
}

export default Signup;