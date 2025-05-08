import  { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '../Components/navbar.jsx';
import '../styles/login.css'

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function Login() {
    const [formData, setFormData] = useState ({
            email: '',
            password: '',
            username:'',
        });
    
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
                const response = axios.post(`${baseUrl}/api/users/login`, formData)
                console.log("Login succesful:", response.data)
                alert("Successful");
                navigate('/profile');
            } catch (error) {
                console.error("Error Signing in:", error);
            }
        };

    return (
        <div className="login">
            <Navbar />
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
            </form>
        </div>
    );
}

export default Login;