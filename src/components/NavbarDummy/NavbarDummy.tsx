import styled from 'styled-components';
import logo from '../../assets/Logo-claro.png';
import theme from '../../theme';
import { motion } from 'framer-motion';

export const NAVBAR_HEIGHT = 80;

const NavbarContainer = styled.header`
  width: 100%;
  height: ${NAVBAR_HEIGHT}px;
  background-color: ${theme.palette.primary.main};
  display: flex;
  align-items: center;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;

  img { width: 32px; height: 32px; }

  span {
    font-size: 1.4rem;
    font-weight: bold;
    color: ${theme.palette.primary.contrastText};
  }
`;

const NavbarDummy = () => (
  <NavbarContainer>
    <Logo>
      <img src={logo} alt="Logo" />
      <span>Empredemia Inc</span>
    </Logo>
  </NavbarContainer>
);

export default NavbarDummy;