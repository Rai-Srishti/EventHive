
// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Header from './components/Header';
import Update from './pages/Attendee/Update';
import Login from './pages/Login';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/attendee/update" element={<Update />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>
  );
}

export default App;
