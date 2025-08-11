import styled from 'styled-components';
import theme from '../../theme';



export const Container = styled.div`
  width: 100%;
  min-height: 100dvh;
  padding-top:60px;
  background-color: ${theme.palette.background.default};
  display: flex;
  justify-content: center;

  & > .inner {
    width: 100%;
    max-width: 1100px;
    padding: 40px 24px;
    box-sizing: border-box;

    @media (max-width: 1024px) {
      padding: 32px 20px;
    }

    @media (max-width: 768px) {
      padding: 24px 16px;
    }

    @media (max-width: 480px) {
      padding: 20px 12px;
    }
  }
`;


export const AboutSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 40px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }
`;

export const AboutText = styled.div`
  flex: 1;

  h2 {
    font-size: 2.5rem;
    color: ${theme.palette.primary.main};
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    margin-bottom: 16px;
    line-height: 1.6;
    color: ${theme.palette.text.primary};
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  }
`;

export const AboutImage = styled.div`
  flex: 1;
  
  

  img {
    max-width: 45vh;
    border-radius: 12px;
  }
`;

export const PlatformSection = styled.section`
  margin-bottom: 60px;
  color: ${theme.palette.primary.main};

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }

  ul {
    margin-left: 20px;
    margin-bottom: 30px;
    line-height: 1.6;

    li {
      margin-bottom: 10px;
      color: ${theme.palette.text.primary};
      font-size: 1rem;

      @media (max-width: 768px) {
        font-size: 0.95rem;
      }
    }
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: ${theme.palette.text.primary};

    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  }
`;

export const TeamSection = styled.section`
  padding: 40px 0;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 40px;
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
  height: 400px;
  color: ${theme.palette.primary.contrastText};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    padding: 16px;
  }
`;


export const TeamInfo = styled.div`
  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    white-space: pre-line;
    color: ${theme.palette.primary.contrastText};

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  p {
    font-size: 0.95rem;
    font-weight: 500;
    color: ${theme.palette.primary.contrastText};

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
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