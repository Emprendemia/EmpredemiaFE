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
    align-items: stretch;
    height: 100dvh;
    padding: 0;
  }
`;



export const PanelWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1920px;
  height: 100vh;
  border-radius: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 100%;
  }
`;



export const LeftPanel = styled.div`
  width: 30%;
  background-color: #002b3f;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 30px;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
    padding-bottom: 0;
  }
`;

export const RightPanel = styled.div`
  width: 70%;
  background-color: #FCFEFC;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 20px;
    align-items: flex-start;
    overflow-y: auto;
  }
`;



export const BoyImage = styled.img`
  width: 120%;
  max-width: 500px;
  position: absolute;
  bottom: 25%;
  right: -45%;
  object-fit: contain;
  z-index: 2;

  @media (max-width: 768px) {
    position: relative;
    width: 70%;
    max-width: 260px;
    left: 0;
    bottom: 0;
    margin: 0 auto;
  }
`;

export const Form = styled.form`
  width: 80%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  span {
    color: red;
    font-size: 13px;
    margin-top: -4px;
    margin-bottom: 4px;
  }

  @media (max-width: 768px) {
    max-height: 100%;
    overflow-y: auto;
  }
`;

export const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 10px;
  color: #000;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #111;
`;

export const Input = styled.input`
  padding: 10px 16px;
  border-radius: 20px;
  border: 2px solid #002b3f;
  background-color: white;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border: 3px solid #002235;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  padding: 10px;
  border-radius: 20px;
  background-color: ${theme.palette.primary.main};
  color:${theme.palette.secondary.contrastText};
  border: none;
  font-weight: 500;
  cursor: pointer;
`;

export const GoogleButton = styled(Button)`
  background-color: ${theme.palette.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color:${theme.palette.primary.contrastText};
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
    color: #002b3f;
    font-weight: 500;
  }
`;
