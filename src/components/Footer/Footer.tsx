import { Box, Typography } from '@mui/material';
import theme from '../../theme';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 3 },
        bgcolor: theme.palette.primary.dark,
      }}
    >
      <Typography variant="body2" color="white">
        © {new Date().getFullYear()} Empredemia — Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default Footer;
