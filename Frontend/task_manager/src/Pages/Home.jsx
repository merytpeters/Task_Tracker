import axios from 'axios';
import {useEffect, useState } from 'react';
import Navbar from '../Components/navbar.jsx'
import '../styles/home.css';


function Home() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000')
        .then((response) => {
            console.log(response.data)
            if (response.data) {
                setMessage(response.data.message);
            }
        })
        .catch((error) => console.error('Error fetching home page:', error));
    }, [])
    
    return (
        <div className='home-container'>
           <Navbar/>
           <h1>Home Page</h1>
           <h2>{message}</h2>
        </div>
    );
};

export default Home;