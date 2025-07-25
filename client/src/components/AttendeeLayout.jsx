import React from 'react';
import { Outlet } from 'react-router-dom';
import AttendeeNavbar from '../pages/Attendee/AttendeeNavbar';
import Footer from './Footer';

const AttendeeLayout = () => {
  return (
    <>
      <AttendeeNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AttendeeLayout;
