
// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Header from './components/Header';
import Update from './pages/Attendee/Update';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/attendee/update" element={<Update />} />
        
      </Routes>

    </>
  );
}

export default App;
