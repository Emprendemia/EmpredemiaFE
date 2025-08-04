import { Container, Logo, NavItems, NavLink, NavButton, InnerWrapper } from './style';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo-claro.png';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const role = localStorage.getItem('role');


    return (
        <Container>
            <InnerWrapper>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <Logo>
                        <img src={logo} alt="Logo" />
                        <span>Emprendemia Inc</span>
                    </Logo>
                </Link>
                <NavItems>
                    <NavLink to="/home">Home</NavLink>
                    {(role === 'teacher' || role === 'admin') && (
                        <NavLink to="/teacher">Profesor</NavLink>
                    )}

                    {role === 'admin' && (
                        <NavLink to="/administrar">Administrar</NavLink>
                    )}

                    <NavLink to="/course">Cursos</NavLink>
                    <NavLink to="/profile">Perfil</NavLink>
                    <NavLink to="/contact">Contacto</NavLink>
                    <NavLink to="/About">Sobre Nosotros</NavLink>
                    <NavButton onClick={handleLogout}>Salir</NavButton>
                </NavItems>
            </InnerWrapper>
        </Container>
    );
};

export default Navbar;
