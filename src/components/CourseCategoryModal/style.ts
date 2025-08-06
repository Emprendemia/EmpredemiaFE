import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999; /* clave para que esté por encima de todo */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 16px;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #002b3f;
  cursor: pointer;
`;

export const Title = styled.h2`
  text-align: center;
  color: #002b3f;
  margin-bottom: 20px;
`;

export const CoursesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;



export const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const PageButton = styled.button`
  background-color: #0d4863;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
