import { useEffect, useState, useRef } from 'react';
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
  Greeting
} from './style';

import { Course } from '../../interface/Interface';
import CourseCard from '../../components/CourseCard/CourseCard';
import heroImg from '../../assets/hombre-home.png';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface RecentCourse {
  course: Course;
  progress: number;
  lastTimestamp: string;
}

const Home = () => {
  const [recentCourses, setRecentCourses] = useState<RecentCourse[]>([]);
  const [userName, setUserName] = useState('');
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'warning' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


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

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const firstName = data.fullname?.split(' ')[0];
      setUserName(firstName);
    } catch (err) {
      console.error('Error al obtener datos del usuario:', err);
    }
  };

  const handleDelete = async (courseId: string) => {
    // Primer clic: mostrar confirmación
    if (pendingDelete !== courseId) {
      setPendingDelete(courseId);
      setSnackbar({
        open: true,
        message: '¿Seguro que querés eliminar este curso? Presioná nuevamente para confirmar.',
        severity: 'warning'
      });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setPendingDelete(null), 3000);
      return;
    }

    // Segundo clic: eliminar curso
    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/users/recent-course/${courseId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      setRecentCourses(prev => prev.filter(rc => rc.course._id !== courseId));
      setSnackbar({
        open: true,
        message: 'Curso eliminado del historial correctamente.',
        severity: 'success'
      });
      setPendingDelete(null);
    } catch (err) {
      console.error('Error al eliminar curso:', err);
      setSnackbar({
        open: true,
        message: 'Ocurrió un error al intentar eliminar el curso.',
        severity: 'error'
      });
      setPendingDelete(null);
    }
  };

  useEffect(() => {
    fetchRecentCourses();
    fetchUserInfo();
  }, []);

  const last = recentCourses[0];

  return (
    <Container>
      {userName && <Greeting>Hola {userName}, ¡bienvenido/a a Empredemia!</Greeting>}

      <ContentWrapper>
        <div>
          <Title>Aprendé sin límites</Title>
          <Subtitle>Cursos online</Subtitle>
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
          {recentCourses.slice(1).map(({ course }) => (
            <CourseCard
              key={course._id}
              course={course}
              showState
              onDelete={() => handleDelete(course._id)}
            />
          ))}
        </RecentCoursesGrid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
