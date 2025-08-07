import styled from 'styled-components';
import { Theme } from '@mui/material/styles';
import theme from '../../theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(0, 62, 95);

  @media (max-width: 768px) {
    align-items: flex-start;
    height: 100dvh;
    padding: 0;
  }
`;


export const PanelWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100dvh;
  }
`;

export const LeftPanel = styled.div`
  width: 35%;
  background-color: ${theme.palette.primary.main};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 30px;

  @media (max-width: 768px) {
    width: 100%;
    height: 240px;
    padding-bottom: 0;
  }
`;

export const RightPanel = styled.div`
  width: 65%;
  background-color: ${theme.palette.background.default};
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 24px 16px;
    align-items: flex-start;
    overflow-y: auto;
    box-sizing: border-box; // ✅ para que el padding no colapse
  }
`;


export const BoyImage = styled.img`
  width: 100%;
  max-width: 420px;
  position: absolute;
  bottom: 25%;
  right: -40%;
  object-fit: contain;
  z-index: 2;

  @media (max-width: 768px) {
    position: relative;
    width: 70%;
    max-width: 260px;
    bottom: 0;
    margin: 0 auto;
    right: auto;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: ${theme.palette.primary.main};

  span {
    color: red;
    font-size: 13px;
    margin-top: -4px;
    margin-bottom: 4px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 10px;
  color: ${theme.palette.primary.main};
`;

export const Label = styled.label`
  font-size: 14px;
  color: ${theme.palette.text.primary};
  font-family: 'Inter', sans-serif;
`;

export const Input = styled.input`
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: white;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border: 1px solid ${theme.palette.primary.main};
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.primary.main};
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;


  &:hover {
    background-color: ${theme.palette.secondary.dark};
  }
`;

export const GoogleButton = styled(Button)`
  background-color: ${theme.palette.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${theme.palette.primary.contrastText};

  transition: background-color 0.3s;

   &:hover {
    background-color: ${theme.palette.secondary.contrastText};
`;

export const GoogleIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const Links = styled.div`
  margin-top: 8px;
  text-align: center;
  font-size: 13px;

  p {
    margin: 4px 0;
  }

  a {
    text-decoration: underline;
    color: ${theme.palette.primary.main};
    font-weight: 500;
  }
`;
