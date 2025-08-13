import styled from 'styled-components';
import theme from '../../theme';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-color: ${theme.palette.primary.main};
  width: 100%;
  min-height: calc(100vh - 80px); 

`;

export const PanelWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 100em;
  flex: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    overflow: visible;
    min-height: calc(100vh - 80px);
  }
`;

export const LeftPanel = styled.div`
  width: 65%;
  background-color: ${theme.palette.background.default};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 32px 16px;
    align-items: flex-start;
    box-sizing: border-box;
  }
`;

export const RightPanel = styled.div`
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

export const GirlImage = styled.img`
  width: 100%;
  max-width: 420px;
  position: absolute;
  bottom: 40%;
  left: -40%;
  object-fit: contain;
  z-index: 2;

  @media (max-width: 768px) {
    position: relative;
    width: 70%;
    max-width: 240px;
    bottom: 0;
    left: auto;
    margin: 0 auto;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: ${theme.palette.primary.main};

  span {
    color: red;
    font-size: 13px;
    margin-top: -4px;
    margin-bottom: 4px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 10px;
  color: ${theme.palette.primary.main};
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
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
  color: ${theme.palette.primary.contrastText};
  gap: 8px;

  &:hover {
    background-color: ${theme.palette.secondary.contrastText};
  }
`;

export const GoogleIcon = styled.img`
  width: 18px;
  height: 18px;
`;
