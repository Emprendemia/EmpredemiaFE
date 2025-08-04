import styled from 'styled-components';
import { Theme } from '@mui/material/styles';
import theme from '../../theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme { }
}

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 43, 63, 0.5); // primary.main con opacidad
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.form`
  background: ${theme.palette.background.paper};
  padding: 32px;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalTitle = styled.h3`
  font-size: 1.6rem;
  color: ${theme.palette.text.primary};
  margin-bottom: 8px;
`;

export const ModalLabel = styled.label`
  font-size: 14px;
  color: ${theme.palette.text.secondary};
`;

export const ModalInput = styled.input`
  padding: 10px;
  border: 2px solid ${theme.palette.primary.main};
  border-radius: 12px;
  outline: none;
  background: white;
  transition: border 0.2s;

  &:focus {
    border: 3px solid ${theme.palette.info.main};
  }
`;

export const ModalTextarea = styled.textarea`
  padding: 10px;
  border: 2px solid ${theme.palette.primary.main};
  border-radius: 12px;
  max-width: 50vh;
  min-height: 10vh;
  outline: none;
  background: white;
  transition: border 0.2s;

  &:focus {
    border: 3px solid ${theme.palette.info.main};
  }
`;

export const StyledSelect = styled.select`
  padding: 10px 16px;
  border-radius: 20px;
  border: 2px solid ${theme.palette.primary.main};
  background-color: white;
  color: ${theme.palette.text.secondary};
  font-family: inherit;
  font-size: 14px;
  outline: none;
  appearance: none;

  &:focus {
    border: 3px solid ${theme.palette.info.main};
  }

  option {
    background-color: white;
    color: ${theme.palette.text.primary};
  }
`;

export const TimeInput = styled(ModalInput)`
  max-width: 120px;
`;

export const ModuleRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;

  input {
    flex: 1;
  }
`;

export const AddModuleButton = styled.button`
  background-color: transparent;
  border: 2px dashed ${theme.palette.primary.main};
  color: ${theme.palette.primary.main};
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 16px;
`;

export const DeleteModuleButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: ${theme.palette.error.main || 'red'};
  cursor: pointer;
  padding: 0 8px;
  align-self: center;
`;

export const ModalButton = styled.button`
  display: flex;
  justify-content: center;
  background: ${theme.palette.primary.main};
  color: ${theme.palette.primary.contrastText};
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
  color: ${theme.palette.primary.main};
`;

export const ErrorText = styled.span`
  color: ${theme.palette.error.main || 'red'};
  font-size: 12px;
  margin-top: -8px;
`;
