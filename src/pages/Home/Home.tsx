import {
    Container,
    ContentWrapper,
    Title,
    Subtitle,
    Description,
    HeroImage,
    LastCourseTitle,
    LastCourseWrapper,
    ProgressBarFill,
    ProgressBarBackground,
    ContinueButton
} from './style';


import heroImg from '../../assets/boy.png'; // reemplazar por tu imagen real

const Home = () => {
    return (
        <Container>
            <ContentWrapper>
                <div>
                    <Title>Aprendé sin límites</Title>
                    <Subtitle>Cursos online certificados</Subtitle>
                    <Description>
                        Explorá nuestra plataforma de formación y encontrá cursos diseñados
                        para impulsar tu carrera profesional.
                    </Description>
                </div>
                <HeroImage src={heroImg} alt="Hero banner" />
            </ContentWrapper>
            <LastCourseWrapper>
                <LastCourseTitle>Tu último curso visto : Fundamentos de la Programacion</LastCourseTitle>
                <ProgressBarBackground>
                    <ProgressBarFill style={{ width: '45%' }} />
                </ProgressBarBackground>
                <ContinueButton to="/course/ejemplo">Continuar curso</ContinueButton>
            </LastCourseWrapper>
        </Container>
    );
};

export default Home;
