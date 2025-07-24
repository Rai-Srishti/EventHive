
// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Header from './components/Header';
import EventsPage from './pages/EventPage';
import Update from './pages/Attendee/Update';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUsPage';
import EventDetails from './pages/Attendee/EventDetailsPage';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} /> 
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/attendee/update" element={<Update />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path= '/event-details/:id' element={<EventDetails/>}/>
      </Routes>
 <Footer/>
    </>
  );
}

export default App;
