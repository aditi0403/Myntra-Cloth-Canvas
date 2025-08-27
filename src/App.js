import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OOTD from './components/ootd';
import CanvasComponent from './components/Canvas';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname === '/' && <Navbar />}
      {location.pathname === '/' && <Hero />}
      <Routes>
        <Route path="/canvas" element={<CanvasComponent/>} />
        <Route path="/ootd" element={<OOTD />} />
      </Routes>
    </div>
  );
}

export default App;
