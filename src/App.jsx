import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import RegisterContainer from './LandingPage/RegisterContainer';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <LandingPage/> } />
      <Route path="/register" element={ <RegisterContainer/> } />
    </Routes>
  );
}

export default App;
