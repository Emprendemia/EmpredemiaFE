import styled from 'styled-components';
import contactBanner from '../../assets/mujer-contacto.jpg';
import theme from '../../theme';

export const Container = styled.div`
  background-color: ${theme.palette.background.default};
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-height: 0;
`;

export const Banner = styled.header`
  width: 100%;
  background-image: url(${contactBanner});
  background-size: cover;
  background-position: center;
  background-blend-mode: darken;
  background-color: rgba(0, 0, 0, 0.7);
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

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

export const MainContent = styled.main`
  width: 100%;
  max-width: 1200px;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 42px;
  align-items: start;
  gap:150px;
  

  @media (max-width: 1024px) {
    gap: 24px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr; 
    padding: 24px 16px;
  }
`;

export const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center

  margin: 0;
`;

export const IntroText = styled.p`
  color: ${theme.palette.text.primary};
  font-size: 20px;
  text-align: center;
  padding-top:50px;
  display:flex;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const FormRecuadro = styled.section`
  background-color: ${theme.palette.primary.main};
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

export const FormTitle = styled.h2`
  color: ${theme.palette.primary.contrastText};
  text-align: center;
  margin: 0 0 8px 0;
`;

export const ContactForm = styled.form`
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
`;

export const InputGroup = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const InputField = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 0 12px;
  font-size: 1rem;
  background: ${theme.palette.background.paper};
  color: ${theme.palette.text.primary};

  &:focus {
    outline: none;
    border-color: ${theme.palette.primary.dark};
  }
`;

export const TextAreaField = styled.textarea`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 12px;
  resize: vertical;
  font-size: 1rem;
  background: ${theme.palette.background.paper};
  color: ${theme.palette.text.primary};

  &:focus {
    outline: none;
    border-color: ${theme.palette.primary.dark};
  }
`;

export const SubmitButton = styled.button`
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.primary.main};
  width: 100%;
  height: 44px;
  padding: 0 12px;
  font-weight: bold;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.palette.secondary.dark};
  }
`;
