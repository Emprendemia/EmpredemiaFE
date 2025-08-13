import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  Header,
  Title,
  Description,
  VideoCard,
  VideoWrapper,
  Iframe,
  ActionsRow,
  PrimaryButton,
  GhostButton,
  SectionTitle,
  ModuleList,
  ModuleItem,
  ModuleButton,
  RestartButton,
} from './style';

interface Module {
  title: string;
  time: string; // HH:MM:SS
}

interface Course {
  _id: string;
  title: string;
  description: string;
  videoUrl: string; // admite youtu.be o v=ID
  modules: Module[];
}

interface RecentCourse {
  course: string;
  progress: number;
  lastTimestamp: string; // HH:MM:SS
}

const YT_ID_REGEX = /(?:youtu\.be\/|v=)([\w-]{11})/;

const CourseDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [course, setCourse] = useState<Course | null>(null);
  const [videoUrl, setVideoUrl] = useState('');         // embed URL actual
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);  // evita autoplay inicial y tracking
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const timeParam = searchParams.get('t');

  const token = useMemo(() => localStorage.getItem('token'), []);

  const timeToSeconds = (time: string): number => {
    const [h, m, s] = time.split(':').map(Number);
    return (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
  };

  const secondsToTimestamp = (secs: number): string => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const buildEmbedUrl = (rawUrl: string, startSeconds: number, autoplay: boolean) => {
    const match = rawUrl.match(YT_ID_REGEX);
    const videoId = match?.[1] ?? '';
    const params = new URLSearchParams({
      start: String(startSeconds || 0),
      enablejsapi: '1',
      origin: window.location.origin,
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
    });
    if (autoplay) params.set('autoplay', '1');
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  const updateRecentCourse = async (progress: number, timestamp: string) => {
    try {
      if (!token) return;
      await fetch(`${import.meta.env.VITE_API_URL}/users/recent-course`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: id,
          progress,
          lastTimestamp: timestamp,
        }),
      });
    } catch (err) {
      console.error('❌ Error al guardar progreso:', err);
    }
  };

  const jumpToTime = (time: string, opts?: { autoplay?: boolean; register?: boolean }) => {
    const seconds = timeToSeconds(time);
    setCurrentSeconds(seconds);
    const url = buildEmbedUrl(course?.videoUrl || '', seconds, !!opts?.autoplay);
    setVideoUrl(url);

    if (opts?.register) {
      // registra “actividad” al saltar/iniciar
      updateRecentCourse(0, time);
    }
  };

  const restartCourse = () => {
    setHasStarted(true);
    jumpToTime('00:00:00', { autoplay: true, register: true });
  };

  const startCourse = () => {
    setHasStarted(true);
    // si venías con un t param o último timestamp, arrancamos desde ahí
    const startTs = secondsToTimestamp(currentSeconds);
    jumpToTime(startTs, { autoplay: true, register: true });
  };

  const fetchCourse = async () => {
    try {
      const courseRes = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const courseData: Course = await courseRes.json();
      setCourse(courseData);

      // obtener último timestamp del usuario
      let lastTime = '00:00:00';
      if (token) {
        const recentRes = await fetch(`${import.meta.env.VITE_API_URL}/users/recent-courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const recentCourses: RecentCourse[] = await recentRes.json();
        const currentCourse = recentCourses.find((c) => c.course === id);
        lastTime = currentCourse?.lastTimestamp ?? lastTime;
      }
      // override por query param ?t=HH:MM:SS
      if (timeParam) lastTime = timeParam;

      const secs = timeToSeconds(lastTime);
      setCurrentSeconds(secs);

      // ⚠️ inicial: embebemos SIN autoplay
      const pausedUrl = buildEmbedUrl(courseData.videoUrl, secs, false);
      setVideoUrl(pausedUrl);
      setHasStarted(false);
    } catch (err) {
      console.error('❌ Error al cargar curso:', err);
    }
  };

  // carga del curso
  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // tracking cada 5s SOLO cuando el curso está "started"
  useEffect(() => {
    if (!hasStarted || !course) return;
    const interval = setInterval(() => {
      setCurrentSeconds((prev) => {
        const next = prev + 5;
        const ts = secondsToTimestamp(next);
        // tu lógica de progreso (mantengo criterio original basado en módulos)
        const progress = Math.max(
          0,
          Math.min(100, Math.floor((next / (60 * (course.modules?.length || 1))) * 100))
        );
        updateRecentCourse(progress, ts);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [hasStarted, course]); // eslint-disable-line

  if (!course) return <Container>Cargando...</Container>;

  return (
    <Container>
      <Header>
        <Title>{course.title}</Title>
        <Description>{course.description}</Description>
      </Header>

      <VideoCard>
        <VideoWrapper>
          {videoUrl && (
            <Iframe
              ref={iframeRef}
              src={videoUrl}
              title={course.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </VideoWrapper>

        <ActionsRow>
          {!hasStarted ? (
            <PrimaryButton onClick={startCourse}>Iniciar curso</PrimaryButton>
          ) : (
            <GhostButton onClick={() => jumpToTime(secondsToTimestamp(currentSeconds), { autoplay: true, register: true })}>
              Reanudar
            </GhostButton>
          )}
          <RestartButton onClick={restartCourse}>Reiniciar desde el inicio</RestartButton>
        </ActionsRow>
      </VideoCard>

      <SectionTitle>Módulos</SectionTitle>
      <ModuleList>
        {course.modules.map((mod, i) => (
          <ModuleItem key={`${mod.title}-${i}`}>
            <strong>{mod.title}</strong>
            <ModuleButton onClick={() => { setHasStarted(true); jumpToTime(mod.time, { autoplay: true, register: true }); }}>
              Ir a {mod.time}
            </ModuleButton>
          </ModuleItem>
        ))}
      </ModuleList>
    </Container>
  );
};

export default CourseDetail;
