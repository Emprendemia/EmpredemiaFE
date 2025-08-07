import styled from 'styled-components';
import logo from '../../assets/Logo-claro.png';
import theme from '../../theme';
import { motion } from 'framer-motion';

const NavbarContainer = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${theme.palette.primary.main};
  display: flex;
  align-items: center;
  padding: 0 24px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

   @media (max-width: 768px) {
    height: 80px;
    padding: 0 16px;
  }
`;

export const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;

  img {
    width: 32px;
    height: 32px;
  }

  span {
    font-size: 1.4rem;
    font-weight: bold;
    color: ${theme.palette.primary.contrastText};
  }
`;

const NavbarDummy = () => {
  return (
    <NavbarContainer>
      <Logo>
          <img src={logo} alt="Logo" />
          <span>Empredemia Inc</span>
        </Logo>
    </NavbarContainer>
  );
};

export default NavbarDummy;
