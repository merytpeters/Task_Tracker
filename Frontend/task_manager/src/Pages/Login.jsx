import  { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/navbar.jsx';
import Alert from '../Components/alert.jsx';
import '../styles/login.css';
import GoogleLoginButton from '../Components/googleLoginButton.jsx';
import api from '../lib/api.js';

function Login() {
    const [formData, setFormData] = useState ({
            email: '',
            password: '',
            username:'',
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
            try {
                // const response = 
                const response = await api.post(`${baseUrl}/api/user/login`, formData);
                if (response.status === 200 && response.data?.token) {
                    setAlertType('success');
                    setAlertMessage('Login successful! Redirecting...');
                    setTimeout(() => navigate('/profile'), 1500);
                } else {
                    setAlertType('error');
                    setAlertMessage('Login failed. Please try again.');
                }
            } catch (error) {
                // console.error("Login error:", error.response?.data || error.message);
                setAlertType('error');
                setAlertMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
            }
        };

    return (
        <div className="page-container">
            <Navbar />
            <div className="pixie" style={{ backgroundImage: "url('/img/task-graphic.png')"}}>
            <p className='login-header'>Login</p>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="identifier"
                        value={formData.email || formData.username}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prevData) => ({
                                ...prevData,
                                email: value.includes('@') ? value : '',
                                username: !value.includes('@') ? value : '',
                            }));
                        }}
                        placeholder="Email or Username"
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
                <button type="submit" className="login-button">Login</button>
                <GoogleLoginButton />
                <Alert
                   message={alertMessage}
                   type={alertType}
                   onClose={() => setAlertMessage('')}
                   duration={3000}
                />
            </form>

            </div>
        </div>
    );
}

export default Login;