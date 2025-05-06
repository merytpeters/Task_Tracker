import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
