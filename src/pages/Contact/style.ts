import styled from 'styled-components';
import contactBanner from '../../assets/mujer-contacto.jpg';
import theme from '../../theme';

export const Container = styled.div`
  background-color: ${theme.palette.background.default};
`;

/* export const Container = styled.div`
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  background-color: ${theme.palette.primary.contrastText};

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`; */

export const Banner = styled.header`
  background-image: url(${contactBanner});
  height: 600px;
  background-size: cover;
  background-position: center;
  background-blend-mode: darken;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  background-attachment: scroll;
  
  
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

export const IntroSection = styled.div`
  width: 50%;
  margin: 40px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 24px 0;
  }
`;

export const IntroText = styled.p`
  color: ${theme.palette.text.primary};
  font-size: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const FormRecuadro = styled.div`
  background-color: ${theme.palette.primary.main};
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 30px;
  padding: 24px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FormTitle = styled.h2`
  color: ${theme.palette.primary.contrastText};
  padding: 10px;
  text-align: center;
`;

export const ContactForm = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin: 10px;
  box-sizing: border-box;
`;

export const InputGroup = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const InputField = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 1rem;
  font-family: inherit;
`;

export const TextAreaField = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  border: none;
  padding: 10px;
  resize: none;
  box-sizing: border-box;
  font-size: 1rem;
  font-family: inherit;
`;

export const SubmitButton = styled.button`
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.primary.main};
  width: 100%;
  height: 40px;
  padding: 0 10px;
  font-weight: bold;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  text-align: center;
  transition: background-color 0.3s;
  box-sizing: border-box;
  font-family: inherit;

  &:hover {
    background-color: ${theme.palette.secondary.dark};
  }
`;
