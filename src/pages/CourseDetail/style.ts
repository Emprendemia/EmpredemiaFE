import styled from 'styled-components';
import theme from '../../theme';

export const Container = styled.div`
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  background-color: ${theme.palette.primary.contrastText};
`;

export const Title = styled.h1`
  color: ${theme.palette.primary.main};
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
`;

export const ModuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModuleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e8f1f4;
  padding: 12px 16px;
  border-radius: 8px;
`;

export const ModuleButton = styled.button`
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.info.main};
  font-weight: bold;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
`;

export const RestartButton = styled.button`
  margin: 16px auto;
  padding: 10px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;
