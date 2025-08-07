import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../theme';

export const CardWrapper = styled.div`
  background-color: ${theme.palette.primary.main};
  color: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

export const Info = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
`;

export const Description = styled.p`
  font-size: 0.95rem;
  color: #f0f0f0;
  min-height: 60px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Hours = styled.span`
  font-size: 0.85rem;
  color: #ccc;
`;

export const ViewButton = styled(Link)`
  margin-top: 12px;
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.info.main};
  text-align: center;
  padding: 10px;
  border-radius: 20px;
  font-weight: bold;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background-color: ${theme.palette.secondary.dark};
  }
`;

export const MenuButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  cursor: pointer;

  &::before,
  &::after,
  div {
    content: '';
    display: block;
    height: 3px;
    background: white;
    margin: 4px 0;
    border-radius: 2px;
  }
`;

// Nuevo: menú desplegable
export const DropdownMenu = styled.div`
  position: absolute;
  top: 44px;
  right: 12px;
  background: ${theme.palette.background.default};
  border: 1px solid ${theme.palette.secondary.main};
  border-radius: 8px;
  padding: 8px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);

  button {
    display: block;
    width: 100%;
    background: none;
    border: none;
    padding: 8px 12px;
    color: ${theme.palette.text.primary};
    text-align: left;
    cursor: pointer;
    font-size: 0.85rem;
    transition: background 0.2s;

    &:hover {
      background-color: ${theme.palette.secondary.light};
    }
  }
`;

export const CardTop = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
`;