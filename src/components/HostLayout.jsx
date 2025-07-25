import React from 'react';
import HostNavbar from '../pages/Host/HostNavbar';
import { Outlet } from 'react-router-dom';

const HostLayout = () => (
  <>
    <HostNavbar />
    <Outlet />
  </>
);

export default HostLayout;
