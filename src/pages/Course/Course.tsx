import {
  Container,
  Banner,
  BannerTitle,
  CoursesGrid,
  CourseCard,
  CourseImage,
  CourseTitle,
  CourseDescription,
  CourseButton,
  WebinarSection,
  WebinarTitle,
  WebinarGrid,
  WebinarCard,
  WebinarImage
} from './style';

import redes from '../../assets/social-media_10404224.png';
import finanzas from '../../assets/statistics_4279885.png';
import ecommerce from '../../assets/ecommerce_10578285.png';
import pack from '../../assets/fast-delivery_12395144.png';
import envios from '../../assets/truck_7032242.png';
import mentalidad from '../../assets/light-bulb_4898382.png';
import atencion from '../../assets/information_2707074.png';

 import webinar1 from '../../assets/agencia-joven-adulto-profesion-destaco-negro.jpg';
import webinar2 from '../../assets/mujer-asiatica-trabajando-traves-del-papeleo.jpg';
import webinar3 from '../../assets/dos-repartidoras-cooperando-mientras-revisan-los-datos-de-los-paquetes-en-la-oficina.jpg'; 

const Courses = () => {
  return (
    <Container>
      <Banner>
        <BannerTitle>CURSOS</BannerTitle>
      </Banner>     

      <CoursesGrid>
        <CourseCard>
          <CourseImage src={redes} alt="Redes sociales" />
          <CourseTitle>Redes sociales y publicidad</CourseTitle>
          <CourseDescription>
            Desde crear contenido atractivo hasta usar herramientas de publicidad.
          </CourseDescription>
          <CourseButton>Empezar ahora</CourseButton>
        </CourseCard>

        <CourseCard>
          <CourseImage src={finanzas} alt="Educación financiera" />
          <CourseTitle>Educación financiera</CourseTitle>
          <CourseDescription>
            Aprendé a manejar tus finanzas e impulsar tu negocio.
          </CourseDescription>
          <CourseButton>Empezar ahora</CourseButton>
        </CourseCard>

        <CourseCard>
          <CourseImage src={ecommerce} alt="E-commerce" />
          <CourseTitle>Gestión y E-commerce</CourseTitle>
          <CourseDescription>
            Plataformas de venta, stock y gestión de clientes.
          </CourseDescription>
          <CourseButton>Empezar ahora</CourseButton>
        </CourseCard>

        <CourseCard>
          <CourseImage src={pack} alt="Packaging" />
          <CourseTitle>Packaging</CourseTitle>
          <CourseDescription>
            Cómo destacar tu marca al enviar tus productos.
          </CourseDescription>
          <CourseButton>Empezar ahora</CourseButton>
        </CourseCard>

        <CourseCard>
          <CourseImage src={envios} alt="Envios" />
          <CourseTitle>Envios y logística</CourseTitle>
          <CourseDescription>
            Seguimiento, devoluciones y claves para vender online.
          </CourseDescription>
          <CourseButton>Empezar ahora</CourseButton>
        </CourseCard>

        <CourseCard>
          <CourseImage src={mentalidad} alt="Mentalidad" />
          <CourseTitle>Mentalidad emprendedora</CourseTitle>
          <CourseDescription>
            Propuesta de valor y diferenciación para tu negocio.
          </CourseDescription>
          <CourseButton>Empezar ahora</CourseButton>
        </CourseCard>

        <CourseCard>
          <CourseImage src={atencion} alt="Atención al cliente" />
          <CourseTitle>Atención al Cliente y Post-Venta</CourseTitle>
          <CourseDescription>
            Relaciones duraderas, manejo de quejas y feedback.
          </CourseDescription>
          <CourseButton>Empezar ahora</CourseButton>
        </CourseCard>
      </CoursesGrid>

      <WebinarSection>
        <WebinarTitle>Consejos para tu emprendimiento</WebinarTitle>
        <WebinarGrid>
           <WebinarCard>
            <WebinarImage src={webinar1} alt="Errores financieros" />
            <h2>"5 errores financieros comunes en tu emprendimiento"</h2>
          </WebinarCard>

          <WebinarCard>
            <WebinarImage src={webinar2} alt="Impuestos" />
            <h2>"Formalizá tu emprendimiento sin morir en el intento"</h2>
          </WebinarCard>

          <WebinarCard>
            <WebinarImage src={webinar3} alt="Packaging errores" />
            <h2>"Errores de packaging que arruinan la experiencia"</h2> 
          </WebinarCard>
        </WebinarGrid>
      </WebinarSection>
    </Container>
  );
};

export default Courses;
