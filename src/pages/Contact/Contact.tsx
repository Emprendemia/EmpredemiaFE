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

const Contact = () => {
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
          <ContactForm>
            <InputGroup>
              <InputField type="text" id="nombre" name="nombre" placeholder="Nombre completo" />
            </InputGroup>
            <InputGroup>
              <InputField type="email" id="email" name="email" placeholder="Correo electrónico" />
            </InputGroup>
            <InputGroup>
              <TextAreaField id="mensaje" name="mensaje" placeholder="Mensaje" />
            </InputGroup>
            <InputGroup>
              <SubmitButton type="submit">Enviar</SubmitButton>
            </InputGroup>
          </ContactForm>
        </FormRecuadro>
      </MainContent>
    </Container>
  );
};
export default Contact;