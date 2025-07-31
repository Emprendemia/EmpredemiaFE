import { Container, Logo, NavItems, NavLink, NavButton, InnerWrapper } from './style';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo-claro.png';


const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const role = localStorage.getItem('role');


    return (
        <Container>
            <InnerWrapper>
                <Logo>
                    <img src={logo} alt="Logo" />
                    <span>Emprendemia</span>
                </Logo>

                <NavItems>
                    {(role === 'teacher' || role === 'admin') && (
                        <NavLink to="/teacher">Profesor</NavLink>
                    )}

                    {role === 'admin' && (
                        <NavLink to="/administrar">Administrar</NavLink>
                    )}

                    <NavLink to="/course">Cursos</NavLink>
                    <NavLink to="/profile">Perfil</NavLink>
                    <NavLink to="/contact">Contacto</NavLink>
                    <NavButton onClick={handleLogout}>Salir</NavButton>
                </NavItems>
            </InnerWrapper>
        </Container>
    );
};

export default Navbar;
