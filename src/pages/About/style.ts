import styled from 'styled-components';
import theme from '../../theme';

export const Container = styled.div`
  width: 100%;
  background-color: ${theme.palette.background.default};
  display: flex;
  justify-content: center;
  flex: 1;          
  min-height: 0;
  border-radius: 12px;

  & > .inner {
    width: 100%;
    max-width: 1200px;
    padding: 40px 24px;
    box-sizing: border-box;

    @media (max-width: 1024px) { padding: 32px 20px; }
    @media (max-width: 768px)  { padding: 24px 16px; }
    @media (max-width: 480px)  { padding: 20px 12px; }
  }
`;

export const AboutSection = styled.section`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;  
  align-items: center;
  column-gap: 48px;
  row-gap: 24px;

  @media (max-width: 1024px) {
    column-gap: 32px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;        
    text-align: center;
    margin-bottom: 40px;
  }
`;

export const AboutText = styled.div`
  h2 {
    font-size: 2.5rem;
    color: ${theme.palette.primary.main};
    margin: 0 0 20px;

    @media (max-width: 768px) { font-size: 2rem; }
  }

  p {
    margin: 0 0 16px;
    line-height: 1.6;
    color: ${theme.palette.text.primary};
    font-size: 1rem;

    @media (max-width: 768px) { font-size: 0.95rem; }
  }
`;

export const AboutImage = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 1025px) {
    border-left: 1px solid rgba(0,0,0,0.08);
    padding-left: 24px;
  }

  img {
    width: 100%;
    max-width: 380px;
    height: auto;
    border-radius: 12px;
    object-fit: contain;

    @media (max-width: 768px) { max-width: 260px; }
  }
`;

export const PlatformSection = styled.section`
  color: ${theme.palette.primary.main};

  h3 {
    font-size: 1.5rem;
    margin: 0 0 15px;

    @media (max-width: 768px) { font-size: 1.3rem; }
  }

  ul {
    margin: 0 0 30px 20px;
    line-height: 1.6;

    li {
      margin-bottom: 10px;
      color: ${theme.palette.text.primary};
      font-size: 1rem;

      @media (max-width: 768px) { font-size: 0.95rem; }
    }
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: ${theme.palette.text.primary};

    @media (max-width: 768px) { font-size: 0.95rem; }
  }
`;

export const TeamSection = styled.section`
  padding: 40px 0;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin: 0 0 40px;
    color: ${theme.palette.primary.main};

    @media (max-width: 768px) {
      font-size: 1.6rem;
      margin-bottom: 24px;
    }
  }
`;

export const TeamCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

export const TeamCard = styled.div`
  background-color: ${theme.palette.primary.main};
  border-radius: 20px;
  padding: 20px;
  width: 280px;
  min-height: 400px;
  color: ${theme.palette.primary.contrastText};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover { box-shadow: 0 6px 16px rgba(0,0,0,0.2); }

  @media (max-width: 480px) {
    width: 100%;
    padding: 16px;
    min-height: initial;
  }
`;

export const TeamInfo = styled.div`
  h3 {
    font-size: 1.3rem;
    margin: 10px 0;
    white-space: pre-line;
    color: ${theme.palette.primary.contrastText};

    @media (max-width: 768px) { font-size: 1.1rem; }
  }

  p {
    font-size: 0.95rem;
    font-weight: 500;
    color: ${theme.palette.primary.contrastText};

    @media (max-width: 768px) { font-size: 0.9rem; }
  }
`;

export const TeamImg = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 30px;
  display: block;

  @media (max-width: 480px) {
    width: 140px;
    height: 140px;
  }
`;
