import { Box, Container as MUIContainer } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'; 
import Footer from '../Footer/Footer';

const GRID_HEADER = 'minmax(80px, 8dvh)';
const GRID_FOOTER = 'minmax(80px, 8dvh)';

const PrivateLayout = () => {
  const { pathname } = useLocation();
  const hideBars = pathname === '/login' || pathname === '/register';

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'grid',
        gridTemplateRows: `${GRID_HEADER} 1fr ${GRID_FOOTER}`,
        backgroundColor: '#002b3f',
        padding:'0',
        
      }}
    >
      <Box component="header" sx={{ display: hideBars ? 'none' : 'flex', alignItems: 'center' }}>
        {!hideBars && <Navbar />}
      </Box>

      <Box
        component="main"
        sx={{
          overflowY: 'auto',
          py: { xs: 2, sm: 3 },
        }}
      >
        <MUIContainer maxWidth="xl" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
          <Outlet />
        </MUIContainer>
      </Box>

      <Box component="footer" sx={{ display: hideBars ? 'none' : 'flex', alignItems: 'center' }}>
        {!hideBars && <Footer />}
      </Box>
    </Box>
  );
};

export default PrivateLayout;
