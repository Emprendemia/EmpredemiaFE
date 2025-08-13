import { useEffect, useState, useRef, useMemo } from 'react';
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

const toSeconds = (ts: string): number => {
  if (!ts) return 0;
  const [h = 0, m = 0, s = 0] = ts.split(':').map(Number);
  return h * 3600 + m * 60 + s;
};

const getTotalSeconds = (course?: Course): number => {
  const mods: any[] = (course as any)?.modules || [];
  if (!Array.isArray(mods) || mods.length === 0) return 0;
  if (mods.length === 1) {
    const sec = toSeconds(mods[0]?.time || '00:00:00');
    return sec > 0 ? sec : 0;
  }
  let max = 0;
  for (const m of mods) {
    const sec = toSeconds(m?.time || '00:00:00');
    if (sec > max) max = sec;
  }
  return max > 0 ? max + 60 : 0;
};

const computeProgressPercent = (recent: RecentCourse): number => {
  const lastSec = toSeconds(recent.lastTimestamp);
  const totalSec = getTotalSeconds(recent.course);
  if (!totalSec || totalSec <= 0) {
    return Math.max(0, Math.min(100, Math.round(recent.progress)));
  }
  const pct = Math.round((lastSec / totalSec) * 100);
  return Math.max(0, Math.min(100, pct));
};

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
      setRecentCourses(Array.isArray(data) ? data : []);
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
      setUserName(firstName || '');
    } catch (err) {
      console.error('Error al obtener datos del usuario:', err);
    }
  };

  const handleDelete = async (courseId: string) => {
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

  const lastProgressPct = useMemo(() => {
    if (!last) return 0;
    const computed = computeProgressPercent(last);
    if (computed > 0) return computed;
    return Math.max(0, Math.min(100, Math.round(last.progress)));
  }, [last]);

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
          <ProgressBarBackground
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={lastProgressPct}
            aria-label="Progreso del curso"
            title={`${lastProgressPct}% completado`}
          >
            <ProgressBarFill style={{ width: `${lastProgressPct}%`, transition: 'width .35s ease' }} />
          </ProgressBarBackground>
          <div style={{ marginTop: 8, fontWeight: 600 }}>{lastProgressPct}% completado</div>
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
