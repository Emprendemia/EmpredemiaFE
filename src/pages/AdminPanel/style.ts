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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  text-align: left;

  h3 {
    margin-bottom: 12px;
    color: #002B3F;
  }

  p {
    margin-bottom: 20px;
    color: #333;
  }

  ${Table} {
    margin-top: 10px;
  }
`
