import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  Container,
  VideoWrapper,
  Title,
  Description,
  ModuleList,
  ModuleItem,
  ModuleButton,
  RestartButton,
  Iframe
} from './style';

interface Module {
  title: string;
  time: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  modules: Module[];
}

interface RecentCourse {
  course: string;
  progress: number;
  lastTimestamp: string;
}

const CourseDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const timeParam = searchParams.get('t');

  const [course, setCourse] = useState<Course | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const timeToSeconds = (time: string): number => {
    const [h, m, s] = time.split(':').map(Number);
    return h * 3600 + m * 60 + s;
  };

  const secondsToTimestamp = (secs: number): string => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const updateRecentCourse = async (progress: number, timestamp: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/users/recent-course`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          courseId: id,
          progress,
          lastTimestamp: timestamp
        })
      });
    } catch (err) {
      console.error('❌ Error al guardar progreso:', err);
    }
  };

  const jumpToTime = (time: string) => {
    const seconds = timeToSeconds(time);
    setCurrentSeconds(seconds);
    const videoIdMatch = course?.videoUrl.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
    const videoId = videoIdMatch?.[1] ?? '';
    const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${seconds}&autoplay=1&key=${Date.now()}&enablejsapi=1&origin=${window.location.origin}`;
    setVideoUrl(embedUrl);
    updateRecentCourse(0, time);
  };

  const restartCourse = () => {
    jumpToTime('00:00:00');
  };

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('token');

      const courseRes = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const courseData = await courseRes.json();
      setCourse(courseData);

      const recentRes = await fetch(`${import.meta.env.VITE_API_URL}/users/recent-courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const recentCourses: RecentCourse[] = await recentRes.json();
      const currentCourse = recentCourses.find(c => c.course === id);
      const lastTime = timeParam || currentCourse?.lastTimestamp || '00:00:00';
      const seconds = timeToSeconds(lastTime);
      setCurrentSeconds(seconds);

      const videoIdMatch = courseData.videoUrl.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
      const videoId = videoIdMatch?.[1] ?? '';
      const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${seconds}&autoplay=1&enablejsapi=1&origin=${window.location.origin}`;
      setVideoUrl(embedUrl);
    } catch (err) {
      console.error('❌ Error al cargar curso:', err);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSeconds(prev => {
        const next = prev + 5;
        const timestamp = secondsToTimestamp(next);
        const progress = course ? Math.floor((next / (60 * course.modules.length)) * 100) : 0;
        updateRecentCourse(progress, timestamp);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [course]);

  if (!course) return <p>Cargando...</p>;

  return (
    <Container>
      <Title>{course.title}</Title>
      <Description>{course.description}</Description>

      <VideoWrapper>
        {videoUrl && (
          <Iframe
            ref={iframeRef}
            src={videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </VideoWrapper>

      <RestartButton onClick={restartCourse}>
        Reiniciar curso desde el inicio
      </RestartButton>

      <ModuleList>
        {course.modules.map((mod, i) => (
          <ModuleItem key={i}>
            <strong>{mod.title}</strong>
            <ModuleButton onClick={() => jumpToTime(mod.time)}>
              Ir a {mod.time}
            </ModuleButton>
          </ModuleItem>
        ))}
      </ModuleList>
    </Container>
  );
};

export default CourseDetail;
