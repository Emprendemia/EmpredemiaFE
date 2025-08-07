import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #002B3F;
  color: white;
  padding: 16px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    padding: 20px;
  }
`;

export const InnerWrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;


export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 32px;
    height: 32px;
  }

  span {
    font-size: 1.4rem;
    font-weight: bold;
    color: white;
  }
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: opacity 0.2s;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #F4B535;
  }
`;

export const NavButton = styled.button`
  color: white;
  background: none;
  border: none;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
   color: #F4B535;
  }
`;
