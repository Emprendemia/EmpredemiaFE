import { useState } from 'react';
import {
  Container,
  InnerWrapper,
  Logo,
  NavItems,
  NavLink,
  NavButton,
  HamburgerButton
} from './style';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo-claro.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <Container>
      <InnerWrapper>
        <Logo to="/home">
          <img src={logo} alt="Logo" />
          <span>Empredemia Inc</span>
        </Logo>

        <HamburgerButton onClick={() => setMenuOpen(prev => !prev)}>
          ☰
        </HamburgerButton>

        <NavItems $open={menuOpen}>
          <NavLink to="/home">Home</NavLink>
          {(role === 'teacher' || role === 'admin') && <NavLink to="/teacher">Profesor</NavLink>}
          {role === 'admin' && <NavLink to="/administrar">Administrar</NavLink>}
          <NavLink to="/course">Cursos</NavLink>
          <NavLink to="/profile">Perfil</NavLink>
          <NavLink to="/contact">Contacto</NavLink>
          <NavLink to="/about">Sobre Nosotros</NavLink>
          <NavButton onClick={handleLogout}>Salir</NavButton>
        </NavItems>
      </InnerWrapper>
    </Container>
  );
};

export default Navbar;
