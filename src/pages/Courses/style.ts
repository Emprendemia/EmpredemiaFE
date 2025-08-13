import styled from 'styled-components';
import cursosImg from '../../assets/dos-mujeres-PC.jpg';
import theme from '../../theme';

export const Container = styled.div`
  background-color: ${theme.palette.background.default};
  flex: 1;
  min-height: 0;
  padding-bottom: 2em;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Banner = styled.div`
  background-image: url(${cursosImg});
  background-size: cover;
  background-position: center;
  background-blend-mode: darken;
  background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;

  @media (max-width: 768px) {
    height: 300px;
    padding: 0 16px;
    text-align: center;
  }
`;

export const BannerTitle = styled.h1`
  color: ${theme.palette.info.contrastText};
  font-size: 5rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const CoursesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
  padding: 0 16px;
  width: 100%;
  max-width: 1400px;
`;

export const CourseCard = styled.section`
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.primary.contrastText};
  width: 280px;
  height: 360px;
  padding: 24px;
  text-align: center;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    padding: 20px;
  }
`;

export const CourseImage = styled.img`
  width: 80px;
  margin: 0 auto 10px;
  filter: brightness(0) invert(0.8);

  @media (max-width: 480px) {
    width: 60px;
  }
`;

export const CourseTitle = styled.h3`
  font-size: 20px;
  height: 50px;
  margin: 0;
  color: ${theme.palette.primary.contrastText};

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const CourseDescription = styled.h4`
  font-size: 14px;
  font-weight: 300;
  height: 70px;
  margin: 0;
  color: ${theme.palette.primary.contrastText};

  @media (max-width: 480px) {
    font-size: 13px;
    height: auto;
  }
`;

export const CourseButton = styled.button`
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.primary.main};
  border: none;
  border-radius: 10px;
  padding: 10px 0;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.palette.secondary.dark};
  }

  @media (max-width: 480px) {
    padding: 8px 0;
    font-size: 0.9rem;
  }
`;

export const WebinarSection = styled.div`
  margin-top: 60px;
  text-align: center;
  padding: 0 16px;
  width: 100%;
  max-width: 1400px;
`;

export const WebinarTitle = styled.h1`
  color: ${theme.palette.primary.main};
  font-size: 2.5rem;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const WebinarGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
`;

export const WebinarCard = styled.section`
  width: 380px;
  border: 2px solid ${theme.palette.info.main};
  padding: 16px;
  color: ${theme.palette.primary.main};
  border-radius: 10px;
  background-color: ${theme.palette.background.paper};

  h2 {
    font-size: 18px;
    margin-top: 16px;
    color: ${theme.palette.primary.main};

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const WebinarImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
`;
