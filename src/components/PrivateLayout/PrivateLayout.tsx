import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const PrivateLayout = () => {
  const { pathname } = useLocation();
  const hideNavbar = pathname === '/login' || pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default PrivateLayout;