import styled from 'styled-components';

export const Container = styled.div`
  max-width: 500px;
  margin: 60px auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.1);
  font-family: 'Inter', sans-serif;
  text-align: center;
`;

export const Title = styled.h2`
  color: #002B3F;
  margin-bottom: 24px;
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
  color: #002B3F;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const Button = styled.button`
  background-color: #F4B535;
  color: #0D4863;
  padding: 10px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;

  &:hover {
    background-color: #e0a728;
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
`;
