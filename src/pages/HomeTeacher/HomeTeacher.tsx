import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  CoursesWrapper,
  CourseCard,
  CardTop,
  CardContent,
  MenuButton,
  ViewButton,
  CreateButton
} from './style';
import CourseFormModal from '../../components/CourseFormModal/CourseFormModal';

interface Course {
  _id: string;
  title: string;
  description: string;
  hours: number;
  state: string;
}

const HomeTeacher = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Container>
      <Title>Tus Cursos</Title>

      <CoursesWrapper>
        {courses.map(course => (
          <CourseCard key={course._id}>
            <CardTop>
              <MenuButton>
                <div></div>
              </MenuButton>
            </CardTop>

            <CardContent>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <small>{course.hours} hs - Estado: {course.state}</small>
            </CardContent>

            <ViewButton>Ver</ViewButton>
          </CourseCard>
        ))}
      </CoursesWrapper>

      <CreateButton onClick={() => setShowModal(true)}>Crear nuevo curso</CreateButton>

      {showModal && (
        <CourseFormModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchCourses}
        />
      )}
    </Container>
  );
};

export default HomeTeacher;
