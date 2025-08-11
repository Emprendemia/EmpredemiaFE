import { useEffect, useRef, useState } from 'react';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  Title,
  CoursesGrid,
  PaginationWrapper,
  PageButton
} from './style';
import CourseCard from '../CourseCard/CourseCard';
import { Course } from '../../interface/Interface';
import theme from '../../theme';
import { motion } from 'framer-motion';

interface Props {
  category: string;
  onClose: () => void;
}

const CourseCategoryModal = ({ category, onClose }: Props) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState('.');
  const [currentPage, setCurrentPage] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const coursesPerPage = 8;

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/courses?category=${encodeURIComponent(category)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('No autorizado o error al obtener cursos');

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Respuesta inesperada del servidor');

      const publishedCourses = data.filter((course: Course) => course.state === 'published');
      setCourses(publishedCourses);
    } catch (err) {
      console.error('Error al obtener cursos por categoría:', err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Animación de puntos "Cargando..."
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setDots(prev => (prev === '...' ? '.' : prev + '.'));
    }, 400);

    return () => clearInterval(interval);
  }, [loading]);

  // Cierre con ESC y clic fuera
  useEffect(() => {
    fetchCourses();
    document.body.style.overflow = 'hidden';

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [category]);

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <ModalOverlay>
      <ModalContent
        ref={modalRef}
        as={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>{category}</Title>

        {loading ? (
          <p style={{ textAlign: 'center', margin: '40px 0', color: theme.palette.primary.main }}>
            Cargando{dots}
          </p>
        ) : courses.length === 0 ? (
          <p style={{ textAlign: 'center', margin: '40px 0', color: theme.palette.primary.main }}>
            Esta categoría aún no dispone de cursos.
          </p>
        ) : (
          <>
            <CoursesGrid>
              {currentCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </CoursesGrid>

            <PaginationWrapper>
              {Array.from({ length: totalPages }, (_, i) => (
                <PageButton
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  disabled={currentPage === i + 1}
                >
                  {i + 1}
                </PageButton>
              ))}
            </PaginationWrapper>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default CourseCategoryModal;
