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

export const CourseCard = styled.div`
  background-color: #002b3f;
  color: #e0e0e0;
  width: 250px;
  height: 260px;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CourseTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0;
`;

export const CourseDescription = styled.p`
  font-size: 0.9rem;
  margin: 10px 0;
  height: 60px;
  overflow: hidden;
`;

export const CourseButton = styled.button`
  background-color: #f4b535;
  color: #0d4863;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  padding: 8px 0;
  cursor: pointer;
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
