import { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/navbar.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function Signup() {
    const [formData, setFormData] = useState ({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        username:'',
        confirmPassword: ''
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
            // const response = 
            axios.post(`${baseUrl}/api/users/signup`, formData)
            // console.log("User Created:", response.data)
            alert("Signup Successful");
            navigate('/login');
        } catch (error) {
            // console.error("Error creating user:", error);
        }

        if (formData.password !== formData.confirmPassword) {
            alert ("Passwords do not match");
            return;
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
            </div>
        </div>
    )
}

export default Signup;