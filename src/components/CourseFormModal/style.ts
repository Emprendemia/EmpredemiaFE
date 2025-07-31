import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.form`
  background: #fcfefc;
  padding: 32px;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;

  span {
    color: red;
    font-size: 12px;
    margin-top: -8px;
  }
`;

export const Title = styled.h3`
  font-size: 1.6rem;
  color: #002b3f;
  margin-bottom: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #111;
`;

export const Input = styled.input`
  padding: 10px;
  border: 2px solid #002b3f;
  border-radius: 12px;
  outline: none;
  background: white;

  &:focus {
    border: 3px solid #001e2c;
  }
`;

export const Textarea = styled.textarea`
  padding: 10px;
  border: 2px solid #002b3f;
  border-radius: 12px;
  outline: none;
  background: white;

  &:focus {
    border: 3px solid #001e2c;
  }
`;

export const Button = styled.button`
  background: #002b3f;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  position: absolute;
  top: 12px;
  right: 16px;
  cursor: pointer;
  color: #002b3f;
`;
