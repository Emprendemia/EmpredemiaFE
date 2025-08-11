import { useState } from 'react';
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

import CourseCategoryModal from '../../components/CourseCategoryModal/CourseCategoryModal';

import redes from '../../assets/social-media_10404224.png';
import finanzas from '../../assets/statistics_4279885.png';
import ecommerce from '../../assets/ecommerce_10578285.png';
import pack from '../../assets/fast-delivery_12395144.png';
import envios from '../../assets/truck_7032242.png';
import mentalidad from '../../assets/light-bulb_4898382.png';
import atencion from '../../assets/information_2707074.png';
import webinar1 from '../../assets/hombre-frustrado.jpg';
import webinar2 from '../../assets/mujer-calculadora.webp';
import webinar3 from '../../assets/repartidores-paquete.jpg';

const categories = [
  { name: 'Redes sociales y publicidad', img: redes, desc: 'Desde crear contenido atractivo hasta usar herramientas de publicidad.' },
  { name: 'Educación financiera', img: finanzas, desc: 'Aprendé a manejar tus finanzas e impulsar tu negocio.' },
  { name: 'Gestión y E-commerce', img: ecommerce, desc: 'Plataformas de venta, stock y gestión de clientes.' },
  { name: 'Packaging', img: pack, desc: 'Cómo destacar tu marca al enviar tus productos.' },
  { name: 'Envios y logística', img: envios, desc: 'Seguimiento, devoluciones y claves para vender online.' },
  { name: 'Mentalidad emprendedora', img: mentalidad, desc: 'Propuesta de valor y diferenciación para tu negocio.' },
  { name: 'Atención al Cliente y Post-Venta', img: atencion, desc: 'Relaciones duraderas, manejo de quejas y feedback.' }
];

const Courses = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <Container>
      <Banner>
        <BannerTitle>CURSOS</BannerTitle>
      </Banner>

      <CoursesGrid>
        {categories.map((cat) => (
          <CourseCard key={cat.name}>
            <CourseImage src={cat.img} alt={cat.name} />
            <CourseTitle>{cat.name}</CourseTitle>
            <CourseDescription>{cat.desc}</CourseDescription>
            <CourseButton onClick={() => setOpenCategory(cat.name)}>Empezar ahora</CourseButton>
          </CourseCard>
        ))}
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

      {openCategory && (
        <CourseCategoryModal
          category={openCategory}
          onClose={() => setOpenCategory(null)}
        />
      )}
    </Container>
  );
};

export default Courses;
