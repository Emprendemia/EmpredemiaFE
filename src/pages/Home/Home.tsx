import { useEffect, useState } from 'react';
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
  ContinueButton,
  RecentCoursesGrid,
  DeleteButton
} from './style';
import heroImg from '../../assets/boy.png';
import { Course } from '../../interface/Interface';
import CourseCard from '../../components/CourseCard/CourseCard';

interface RecentCourse {
  course: Course;
  progress: number;
  lastTimestamp: string;
}

const Home = () => {
  const [recentCourses, setRecentCourses] = useState<RecentCourse[]>([]);

  const fetchRecentCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/recent-courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setRecentCourses(data);
    } catch (err) {
      console.error('Error al obtener cursos recientes:', err);
    }
  };

  const handleDelete = async (courseId: string) => {
    const confirm = window.confirm('¿Eliminar este curso del historial?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/users/recent-course/${courseId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecentCourses(prev => prev.filter(rc => rc.course._id !== courseId));
    } catch (err) {
      console.error('Error al eliminar curso:', err);
    }
  };

  useEffect(() => {
    fetchRecentCourses();
  }, []);

  const last = recentCourses[0];

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

      {last && (
        <LastCourseWrapper>
          <LastCourseTitle>
            Tu último curso visto: {last.course.title}
          </LastCourseTitle>
          <ProgressBarBackground>
            <ProgressBarFill style={{ width: `${last.progress}%` }} />
          </ProgressBarBackground>
          <ContinueButton to={`/course/${last.course._id}?t=${last.lastTimestamp}`}>
            Continuar curso
          </ContinueButton>
        </LastCourseWrapper>
      )}

      {recentCourses.length > 1 && (
        <RecentCoursesGrid>
          {recentCourses.slice(1).map(({ course, progress, lastTimestamp }) => (
            <div key={course._id} style={{ position: 'relative' }}>
              <CourseCard course={course} showState />
              <DeleteButton onClick={() => handleDelete(course._id)}>✕</DeleteButton>
            </div>
          ))}
        </RecentCoursesGrid>
      )}
    </Container>
  );
};

export default Home;
