import { useState, useRef, useEffect } from 'react';
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
  const wrapperRef = useRef<HTMLDivElement>(null); // incluye todo
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Detectar el click y cerrarlo cuando se apreta fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth <= 768 &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  //cerrar el menu cuando se clickea un Navlink 
    const handleNavigate = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  };

  return (
    <Container>
      <InnerWrapper ref={wrapperRef}>
        <Logo to="/home" onClick={handleNavigate}>
          <img src={logo} alt="Logo" />
          <span>Empredemia Inc</span>
        </Logo>

        <HamburgerButton onClick={() => setMenuOpen(prev => !prev)}>
          ☰
        </HamburgerButton>

        <NavItems $open={menuOpen}>
          <NavLink to="/home" onClick={handleNavigate}>Inicio</NavLink>
          {(role === 'teacher' || role === 'admin') && (
            <NavLink to="/teacher" onClick={handleNavigate}>Profesor</NavLink>
          )}
          {role === 'admin' && (
            <NavLink to="/administrar" onClick={handleNavigate}>Administrar</NavLink>
          )}
          <NavLink to="/course" onClick={handleNavigate}>Cursos</NavLink>
          <NavLink to="/profile" onClick={handleNavigate}>Perfil</NavLink>
          <NavLink to="/contact" onClick={handleNavigate}>Contacto</NavLink>
          <NavLink to="/about" onClick={handleNavigate}>Sobre Nosotros</NavLink>
          <NavButton onClick={handleLogout}>Salir</NavButton>
        </NavItems>
      </InnerWrapper>
    </Container>
  );
};

export default Navbar;
