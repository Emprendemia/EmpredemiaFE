import styled from 'styled-components';
import theme from '../../theme';

export const Container = styled.div`
  width: 100%;
  margin: 24px auto;
  padding: 32px 20px;
  background-color: ${theme.palette.background.paper};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
  @media (max-width: 768px) {
    padding: 24px 16px;
    /* margin: 16px 12px; */
  }
`;

export const Title = styled.h2`
  color: ${theme.palette.text.primary};
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${theme.palette.background.default}; 
  }
`;

export const Th = styled.th`
  padding: 12px;
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.primary.contrastText};
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px;
  }
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  text-align: left;
  color: ${theme.palette.text.primary};

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px;
  }
`;

export const Select = styled.select`
  padding: 6px 36px 6px 12px;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0,0.2);
  background: ${theme.palette.background.paper};
  color: ${theme.palette.text.primary};
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 150px
  }
`;

export const Button = styled.button`
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.primary.main};
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.palette.secondary.dark};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
`;

export const ExpandButton = styled(Button)`
  font-size: 0.875rem;
  padding: 6px 12px;
`;

export const Pill = styled.span<{ state: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 0.85rem;
  color: ${theme.palette.primary.contrastText};
  background-color: ${({ state }) =>
    state === 'published' ? '#4CAF50' :
    state === 'in_review' ? '#FFC107' :
    state === 'inactive' ? '#F44336' : '#999'};

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 3px 10px;
  }
`;
