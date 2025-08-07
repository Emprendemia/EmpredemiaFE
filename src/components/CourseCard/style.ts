import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../theme';

export const CardWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  min-height: 440px;
  background-color: ${theme.palette.primary.main};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
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
  gap: 12px;
  flex: 1;
  background-color: ${theme.palette.primary.main};
`;

export const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0;
`;

export const Description = styled.p`
  font-size: 0.95rem;
  color: #ddd;
  flex-grow: 1;
  line-height: 1.4;
  margin: 0;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Hours = styled.span`
  font-size: 0.85rem;
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ViewButton = styled(Link)`
  margin-top: 12px;
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.info.main};
  text-align: center;
  padding: 10px 16px;
  border-radius: 20px;
  font-weight: bold;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${theme.palette.secondary.dark};
  }
`;

export const MenuButton = styled.button`
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  div {
    width: 16px;
    height: 2px;
    background: white;
    position: relative;
  }

  div::before,
  div::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background: white;
    left: 0;
  }

  div::before {
    top: -6px;
  }

  div::after {
    top: 6px;
  }
`;

//Menu dsplegable profe
export const DropdownMenu = styled.div`
  position: absolute;
  top: 44px;
  right: 0;
  background: ${theme.palette.background.default};
  border: 1px solid ${theme.palette.secondary.main};
  border-radius: 8px;
  padding: 8px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

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


//boton borrar cruz roja
export const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
`;
