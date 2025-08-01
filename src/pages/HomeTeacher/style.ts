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
  height: 360px;
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
  position: relative;
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

export const DropdownMenu = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  background: white;
  color: #002b3f;
  border-radius: 8px;
  padding: 10px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    font-weight: bold;
  }
`;

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  gap: 12px;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  h3 {
    font-size: 1.1rem;
    margin: 0;
  }

  p {
    font-size: 0.9rem;
    margin: auto 0;
    text-align: center;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const StatusPill = styled.div<{ state: string }>`
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  background-color: ${({ state }) =>
    state === 'published'
      ? '#4CAF50'
      : state === 'in_review'
      ? '#FFC107'
      : '#F44336'};
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const Hours = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #fff;
  margin-bottom: 8px;
`;

export const ClockIcon = styled.span`
  font-size: 1rem;
`;

export const ViewButton = styled.button`
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
