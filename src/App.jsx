import React from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import RegisterContainer from './Components/LandingPage/RegisterContainer';
import MainPage from './Components/MyScrum/MainPage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={ <LandingPage/> } />
      <Route path="/register" element={ <RegisterContainer/> } />
      <Route path="/myscrum" element={ <MainPage/> } />
    </Routes>
    <ToastContainer />
    </>
  );
}

export default App;
