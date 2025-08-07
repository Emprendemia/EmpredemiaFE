import styled from 'styled-components';
import contactBanner from '../../assets/mujer-contacto.jpg';
import theme from '../../theme';

export const Container = styled.div`
  background-color: ${theme.palette.primary.contrastText};
`;

export const Banner = styled.header`
  background-image: url(${contactBanner});
  height: 700px;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
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

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IntroSection = styled.div`
  width: 50%;
  margin: 40px;
`;

export const IntroText = styled.p`
  color: black;
  font-size: 20px;
  text-align: center;
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
`;

export const FormTitle = styled.h2`
  color: ${theme.palette.primary.contrastText};
  padding: 10px;
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
  background-color: #e0a728;
 }
`;