import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Container,
  Banner,
  BannerTitle,
  MainContent,
  IntroSection,
  IntroText,
  FormRecuadro,
  FormTitle,
  ContactForm,
  InputGroup,
  InputField,
  TextAreaField,
  SubmitButton
} from './style';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const emailInput = form.current.user_email.value;

    if (!validateEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setOpenSnackbar(true);
      form.current?.reset();
    })
    .catch((err) => {
      console.error('Error al enviar:', err);
    });
  };

  return (
    <Container>
      <Banner>
        <BannerTitle>CONTACTO</BannerTitle>
      </Banner>

      <MainContent>
        <IntroSection>
          <IntroText>
            ¡Tu voz es muy importante para nosotros!
            <br />
            En Empredemia, valoramos tus ideas y comentarios. Ya sea que tengas una consulta sobre nuestros cursos, una sugerencia para hacer la plataforma más útil o si quieres conectar con el equipo detrás de este proyecto, estamos aquí para escucharte.
            <br />
            Completa el formulario de abajo y nos pondremos en contacto contigo lo antes posible.
          </IntroText>
        </IntroSection>

        <FormRecuadro>
          <FormTitle>Contactanos</FormTitle>
          <ContactForm ref={form} onSubmit={sendEmail}>
            <InputGroup>
              <InputField type="text" name="user_name" placeholder="Nombre completo" required />
            </InputGroup>
            <InputGroup>
              <InputField
                type="email"
                name="user_email"
                placeholder="Correo electrónico"
                required
                style={{ border: emailError ? '2px solid red' : undefined }}
                onChange={() => setEmailError(false)}
              />
            </InputGroup>
            <InputGroup>
              <TextAreaField name="message" placeholder="Mensaje" required />
            </InputGroup>
            <InputGroup>
              <SubmitButton type="submit">Enviar</SubmitButton>
            </InputGroup>
          </ContactForm>
        </FormRecuadro>
      </MainContent>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setOpenSnackbar(false)}>
          Mensaje enviado correctamente ✔
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
