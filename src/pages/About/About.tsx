import {
  Container,
  AboutSection,
  AboutText,
  AboutImage,
  PlatformSection,
  TeamSection,
  TeamCards,
  TeamCard,
  TeamInfo,
  TeamImg,
} from './style';

import { motion } from 'framer-motion';

import Rodrigo from '../../assets/Rodrigo.jpeg';
import Nayla from '../../assets/Nayla.jpeg';
import Ivan from '../../assets/Ivan.jpg';
import Romina from '../../assets/Romina.jpeg';
import Florencia from '../../assets/Florencia.jpeg';
import GrupoEmpredemia from '../../assets/logo-oscuro.svg';

const teamMembers = [
  { name: 'Rodrigo Olivarez', email: 'rodrigovolivarez@gmail.com', img: Rodrigo, linkedin: 'https://www.linkedin.com/in/rodrigoolivarez/' },
  { name: 'Nayla Jimenez', email: 'jimenez.nayla1997@gmail.com', img: Nayla, linkedin: 'https://www.linkedin.com/in/nayla-jimenez/' },
  { name: 'Florencia Figueroa Pérez', email: 'florenciafigueroap@gmail.com', img: Florencia, linkedin: 'https://www.linkedin.com/in/florencia-figueroa-perez/' },
  { name: 'Romina Alvarez', email: 'rominarosaalvarez1213@gmail.com', img: Romina, linkedin: 'https://www.linkedin.com/in/romina-rosa-alvarez/' },
  { name: 'Ivan Ibazeta', email: 'ibazeta.ivan2001@gmail.com', img: Ivan, linkedin: 'https://www.linkedin.com/in/ivan-ibazeta/' }
];

const About = () => {
  return (
   
    <Container>
      <div className="inner">

      <AboutSection>
        <AboutText>
          <h2>Quienes somos</h2>
          <p>
            Somos un equipo apasionado por el crecimiento personal y profesional. Nuestra misión es acompañar a emprendedores como vos en cada paso del camino, brindando herramientas prácticas, conocimientos actualizados y estrategias reales que te permitan convertir tus ideas en proyectos sostenibles y exitosos.
          </p>
          <p>
            Creemos en el poder de la educación accesible, aplicada y transformadora. Creamos cursos diseñados para potenciar tus habilidades, ya sea que estés dando tus primeros pasos o quieras llevar tu emprendimiento al siguiente nivel.
          </p>
          <p>
            No vendemos promesas mágicas: compartimos experiencia, contenido valioso y una comunidad que te apoya. Porque emprender no tiene por qué ser un camino solitario.
          </p>
        </AboutText>
        <AboutImage>
          <img src={GrupoEmpredemia} alt="Grupo empredemia" />
        </AboutImage>
      </AboutSection>

      <PlatformSection>
        <h3>¿Qué vas a encontrar en nuestra plataforma?</h3>
        <ul>
          <li>Cursos creados por y para emprendedores reales.</li>
          <li>Herramientas concretas que podés aplicar desde el día uno.</li>
          <li>Un enfoque humano, flexible y cercano.</li>
          <li>Espacios de intercambio y aprendizaje colaborativo.</li>
        </ul>

        <h3>Nuestra visión</h3>
        <p>
          Queremos ser la primera opción de formación para quienes sueñan con emprender, en cualquier etapa del camino.
        </p>
      </PlatformSection>

      <TeamSection>
        <h2>Nuestro equipo</h2>
        <TeamCards>
          {teamMembers.map(({ name, email, img, linkedin }, index) => (
            <motion.div
              key={email}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <TeamCard>
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  <TeamImg src={img} alt={name} />
                </a>
                <TeamInfo>
                  <h3>{name.replace(' ', '\n')}</h3>
                  <p>{email}</p>
                </TeamInfo>
              </TeamCard>
            </motion.div>
          ))}
        </TeamCards>
      </TeamSection>
      </div>
    </Container>
    
  );
};

export default About;
