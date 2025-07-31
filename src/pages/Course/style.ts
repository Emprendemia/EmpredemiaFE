import styled from 'styled-components';
import cursosImg from '../../assets/comprador-personal-en-la-oficina-con-el-cliente.jpg';

export const Container = styled.div`
/*   background-color: #002B3F;  theme.primary theme.danger */ 
background-color: #fcfefc;
padding-bottom: 60px;
  font-family: 'Inter', sans-serif;
`;

export const Banner = styled.div`
  height: 500px;
  background-image: url(${cursosImg});
  background-size: cover;
  background-position: center;
  background-blend-mode: darken;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BannerTitle = styled.h1`
  color: white;
  font-size: 5rem;
  font-weight: bold;
  margin: 0;
`;

export const CoursesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
`;

export const CourseCard = styled.section`
  background-color: #002B3F;
  color: #E0E0E0;
  width: 280px;
  height: 360px;
  padding: 24px;
  text-align: center;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CourseImage = styled.img`
  width: 80px;
  margin: 0 auto 10px;
  filter: brightness(0) invert(0.8);
`;

export const CourseTitle = styled.h3`
  font-size: 20px;
  height: 50px;
  margin: 0;
`;

export const CourseDescription = styled.h4`
  font-size: 14px;
  font-weight: 300;
  height: 70px;
  margin: 0;
`;

export const CourseButton = styled.button`
  background-color: #F4B535;
  color: #0D4863;
  border: none;
  border-radius: 6px;
  padding: 10px 0;
  font-weight: bold;
  cursor: pointer;
`;

export const WebinarSection = styled.div`
  margin-top: 60px;
  text-align: center;
`;

export const WebinarTitle = styled.h1`
  color: #E0E0E0;
  font-size: 2.5rem;
  margin-bottom: 40px;
`;

export const WebinarGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
`;

export const WebinarCard = styled.section`
  width: 380px;
  border: 2px solid white;
  padding: 16px;
  color: #E0E0E0;

  h2 {
    font-size: 18px;
    margin-top: 16px;
  }
`;

export const WebinarImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;
