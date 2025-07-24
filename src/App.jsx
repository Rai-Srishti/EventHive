
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
import HostNavbar from './pages/Host/HostNavbar';
import NewEventPage from './pages/Host/NewEventPage';
import MyEventsPage from "./pages/Host/MyEventsPage";
import SpeakersPage from './pages/SpeakersPage';
import WalletPage from './pages/Attendee/WalletPage';
import BookingsPage from './pages/Attendee/BookingsPage';

function App() {
  const location = useLocation();

  const hostPaths = [
    '/host/myevents',
    '/host/newevent',
    '/host/updateevent',
    '/host/dashboard',
  ];

    const adminPaths = [
    '/admin/requests',
    '/admin/hosts',
    '/admin/users',
    '/admin/categories',
    '/admin/events',
    '/admin/profile',
  ];

  // Check if the current route is a host page (even with dynamic segments)
  const isHostRoute = hostPaths.some(path => location.pathname.startsWith(path));
  // Check if the current route is a host page (even with dynamic segments)
  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path));

  // .some() checks whether at least one item in the array passes the test function
  // .startsWith(path) allows us to match both exact and nested paths (like /host/updateevent/1001)
  // This way, dynamic or nested host routes will still trigger the HostNavbar
  
  return (
    <>
    {/* Render Header only when not on host routes */}
      {!isHostRoute && !isAdminRoute && <Header />}


      
      {/* Render HostNavbar only on host routes */}
      {isHostRoute && <HostNavbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} /> 
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/speakers' element={<SpeakersPage/>} />

        <Route path= '/event-details/:id' element={<EventDetails/>}/>
        <Route path= '/attendee/wallet' element={<WalletPage/>}/>
        <Route path="/attendee/update" element={<Update />} />
        <Route path="/attendee/booking" element={<BookingsPage />} />


        <Route path="/admin" element={<AdminLayout />}>
          <Route path="categories" element={<ManageCategories />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="requests" element={<ManageRequest />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="events/edit/:id" element={<EditEvent />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
          <Route path="hosts" element={<ManageHosts />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="/host/dashboard" element={<HostDashboard />} />
        <Route path="/host/newevent" element={<NewEventPage />} />
        <Route path="/host/myevents" element={<MyEventsPage />} />
      </Routes>
 <Footer/>
    </>
  );
}

export default App;
