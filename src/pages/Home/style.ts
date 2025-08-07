import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../theme';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.palette.background.default};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 20px 40px;

  @media (max-width: 768px) {
    padding: 120px 20px 20px;
  }
`;


export const ContentWrapper = styled.div`
  display: flex;
  max-width: 1400px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 40px;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: ${theme.palette.primary.main};
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.8rem;
  color: #003e5f;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: #333;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
`;

export const HeroImage = styled.img`
  width: 40%;
  max-width: 500px;
  height: auto;
  object-fit: contain;

  @media (max-width: 1024px) {
    width: 80%;
  }
`;


export const LastCourseWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 800px;
  background-color: ${theme.palette.primary.main};
  color: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    margin-top: 30px;
  }
`;

export const LastCourseTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 12px;
  font-weight: 500;
`;

export const ProgressBarBackground = styled.div`
  width: 100%;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px 0 0 8px;
  transition: width 0.3s ease;
`;



export const ContinueButton = styled(Link)`
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.primary.main};
  margin-top: 16px;
  display: inline-block;
  padding: 8px 20px;
  font-weight: bold;
  border-radius: 10px;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0a728;
  }
`;


