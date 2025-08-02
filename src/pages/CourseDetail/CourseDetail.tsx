import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Container,
  VideoWrapper,
  Title,
  Description,
  ModuleList,
  ModuleItem,
  ModuleButton,
  Iframe
} from './style';

interface Module {
  title: string;
  time: string;
}

interface Course {
  title: string;
  description: string;
  videoUrl: string;
  modules: Module[];
}

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        setCourse(data);

        const embedUrl = data.videoUrl.includes('embed')
          ? data.videoUrl
          : convertToEmbedUrl(data.videoUrl);
        setVideoUrl(embedUrl);
      } catch (err) {
        console.error('Error al cargar curso:', err);
      }
    };

    fetchCourse();
  }, [id]);

  const convertToEmbedUrl = (url: string): string => {
    const videoIdMatch = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
    const videoId = videoIdMatch?.[1] ?? '';
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const jumpToTime = (time: string) => {
  const [h, m, s] = time.split(':').map(Number);
  const totalSeconds = h * 3600 + m * 60 + s;
  const videoIdMatch = course?.videoUrl.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  const videoId = videoIdMatch?.[1] ?? '';
  setVideoUrl(`https://www.youtube.com/embed/${videoId}?start=${totalSeconds}&autoplay=1&key=${Date.now()}`);
};


  if (!course) return <p>Cargando...</p>;

  return (
    <Container>
      <Title>{course.title}</Title>
      <Description>{course.description}</Description>

      <VideoWrapper>
        <Iframe
          src={videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoWrapper>

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
