import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1100px;
  margin: 60px auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Title = styled.h2`
  color: theme.palette.text.primary;
  margin-bottom: 24px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const Th = styled.th`
  padding: 12px;
  background-color: theme.palette.primary.main;
  color: white;
  text-align: left;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

export const Select = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-family: 'Inter', sans-serif;
`;

export const Button = styled.button`
  background-color: theme.palette.secondary.main;
  color: #0D4863;
  padding: 8px 16px;
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

export const ExpandButton = styled(Button)`
  font-size: 0.875rem;
  padding: 6px 12px;
`;

export const Pill = styled.span<{ state: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.85rem;
  color: white;
  background-color: ${({ state }) =>
    state === 'published' ? '#4CAF50' :
    state === 'in_review' ? '#FFC107' :
    state === 'inactive' ? '#F44336' : '#999'};
`;
