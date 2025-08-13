import styled from 'styled-components';
import theme from '../../theme';

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 24px auto; 
  background-color: ${theme.palette.background.paper};
  padding: 5em ;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  font-family: 'Inter', sans-serif;
  text-align: center;

  @media (max-width: 768px) {
    padding: 24px 16px;
    margin: 16px;
    max-width: 350px;
  }
`;

export const Title = styled.h2`
  color: ${theme.palette.primary.main};
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const Label = styled.label`
  font-weight: 600;
  color: ${theme.palette.text.primary};
  margin-bottom: 6px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${theme.palette.background.default};
  color: ${theme.palette.text.primary};

  &:focus {
    border-color: ${theme.palette.primary.main};
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.primary.main};
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;

  &:hover {
    background-color: ${theme.palette.secondary.dark};
  }
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 0.875rem;
`;

export const Row = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;
