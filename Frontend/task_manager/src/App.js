import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import './App.css';
import Profile from './Pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
