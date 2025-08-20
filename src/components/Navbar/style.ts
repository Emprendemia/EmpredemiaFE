import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../theme';

export const Container = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;               
  position: fixed;
  z-index: 2;
  background-color: ${theme.palette.primary.dark};
  color: ${theme.palette.primary.contrastText};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const InnerWrapper = styled.div`
  max-width: 1400px;          
  width: 100%;
  padding: 16px 24px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;

  img { width: 32px; height: 32px; }

  span {
    font-size: 1.4rem;
    font-weight: bold;
    color: ${theme.palette.primary.contrastText};
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: ${theme.palette.primary.contrastText};
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    z-index: 3;
  }
`;

interface NavItemsProps { $open: boolean; }

export const NavItems = styled.div<NavItemsProps>`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 80px; 
    right: 0;
    background-color: ${theme.palette.primary.dark};
    width: 100%;
    padding: 20px 0;
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    gap: 16px;
    z-index: 2;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
`;

export const NavLink = styled(Link)`
  color: ${theme.palette.primary.contrastText};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;

  &:hover { color: ${theme.palette.secondary.main}; }
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.palette.primary.contrastText};
  background: none;
  border: none;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${theme.palette.secondary.main};
  }
`;

