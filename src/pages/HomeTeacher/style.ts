import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #fcfefc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #002b3f;
  margin-bottom: 30px;
`;

export const CoursesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
`;

export const CourseCard = styled.div`
  width: 300px;
  background-color: #002b3f;
  border-radius: 16px;
  padding: 20px;
  color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardTop = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const MenuButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  position: relative;
  cursor: pointer;

  &::before,
  &::after,
  div {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #fff;
    border-radius: 2px;
  }

  &::before {
    top: 0;
  }

  div {
    top: 8px;
  }

  &::after {
    top: 16px;
  }
`;

export const CardContent = styled.div`
  margin-top: 12px;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 6px;
  }

  small {
    font-size: 0.8rem;
    color: #d3d3d3;
  }
`;

export const ViewButton = styled.button`
  margin-top: 12px;
  align-self: flex-end;
  background: #fff;
  color: #002b3f;
  border: none;
  padding: 6px 14px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
`;

export const CreateButton = styled.button`
  margin-top: 40px;
  background-color: #002b3f;
  color: #fff;
  padding: 14px 28px;
  border: none;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;
