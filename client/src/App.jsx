
// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import ManageCategories from './pages/Admin/ManageCategories';
import AdminLayout from './components/AdminLayout';
import ManageEvents from './pages/Admin/ManageEvents';
import ManageRequest from './pages/Admin/ManageRequest';
import Profile from './pages/Admin/ManageProfile';
import EditProfile from './pages/Admin/EditProfile';
import EditEvent from './pages/Admin/EditEvent';
import EditCategory from './pages/Admin/EditCategory';
import ManageHosts from './pages/Admin/ManageHosts';
import ManageUsers from './pages/Admin/ManageUsers';
import AdminDashboard from './pages/Admin/AdminDashboard';
import HostDashboard from './pages/Host/HostDashboard';
import NewEventPage from './pages/Host/NewEventPage';
import MyEventsPage from "./pages/Host/MyEventsPage";
import ArtistPage from './pages/ArtistPage';
import WalletPage from './pages/Attendee/WalletPage';
import BookingsPage from './pages/Attendee/BookingsPage';
import MyBookings from './pages/Attendee/MyBookings';
import AttendeeLayout from './components/AttendeeLayout';
import HostLayout from './components/HostLayout';
import UpdateEvent from './pages/Host/UpdateEventPage';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/events" element={
          <>
            <Header />
            <EventsPage />
            <Footer />
          </>
        } />
        <Route path="/favourites" element={
          <>
            <Header />
            <Favourites />
            <Footer />
          </>
        } />
        <Route path="/login" element={
          <>
            <Header />
            <Login />
            <Footer />
          </>
        } />
        <Route path="/register" element={
          <>
            <Header />
            <Register />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Header />
            <AboutUs />
            <Footer />
          </>
        } />
        <Route path="/artists" element={
          <>
            <Header />
            <ArtistPage />
            <Footer />
          </>
        } />
        <Route path="/event-details/:id" element={
          <>
            <Header />
            <EventDetails />
            <Footer />
          </>
        } />

        {/* Attendee Routes */}
        <Route path="/attendee" element={<AttendeeLayout />}>
          <Route path="wallet" element={<WalletPage />} />
          <Route path="update" element={<Update />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="booking" element={<BookingsPage />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="" element={<Home />} /> 
          <Route path="artists" element={<ArtistPage />} /> 
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="categories" element={<ManageCategories />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="events/edit/:id" element={<EditEvent />} />
          <Route path="requests" element={<ManageRequest />} />
          <Route path="hosts" element={<ManageHosts />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Host Routes */}
        <Route path="/host" element={<HostLayout />}>
          <Route path="" element={<HostDashboard />} />
          <Route path="new-event" element={<NewEventPage />} />
          <Route path="my-events" element={<MyEventsPage />} />
          <Route path="my-events/edit/:id" element={<UpdateEvent />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="artists" element={<ArtistPage />} /> 
        </Route>
      </Routes>
    </>
  );
}

export default App;
