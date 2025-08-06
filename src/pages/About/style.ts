import styled from 'styled-components';
import theme from '../../theme';


export const Container = styled.div`
  max-width: 1100px;
  margin: 60px auto;
  padding: 20px;
`;

export const AboutSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 40px;
  margin-bottom: 60px;
`;

export const AboutText = styled.div`
  flex: 1;

  h2 {
    font-size: 2.5rem;
    color: ${theme.palette.primary.main};  // Color primario del tema
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 16px;
    line-height: 1.6;
    color: ${theme.palette.text.primary}; // Color del texto
  }
`;

export const AboutImage = styled.div`
  flex: 1;

  img {
    max-width: 100%;
    border-radius: 12px;
  }
`;

export const PlatformSection = styled.section`
  margin-bottom: 60px;
  color: ${theme.palette.primary.main}; // Color primario del tema

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  ul {
    margin-left: 20px;
    margin-bottom: 30px;
    line-height: 1.6;
    
    li {
      margin-bottom: 10px;
    }
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: ${theme.palette.text.primary}; // Color del texto
  }
`;

export const TeamSection = styled.section`
  padding: 40px 0;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 40px;
    color: ${theme.palette.primary.main}; // Color primario del tema
  }
`;

export const TeamCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

export const TeamCard = styled.div`
  background-color: ${theme.palette.primary.main}; // Color primario del tema
  border-radius: 20px;
  padding: 20px;
  width: 280px;
  color: ${theme.palette.primary.contrastText}; // Color de texto en contraste
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
  }
`;

export const TeamInfo = styled.div`
  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    white-space: pre-line;
    color: ${theme.palette.primary.contrastText}; // Color del texto
  }

  p {
    font-size: 0.95rem;
    font-weight: 500;
    color: ${theme.palette.primary.contrastText}; // Color del texto
  }
`;

export const TeamImg = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  cursor: pointer;
`;
