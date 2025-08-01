import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  CoursesWrapper,
  CourseCard,
  CardTop,
  CardContent,
  MenuButton,
  DropdownMenu,
  ViewButton,
  CreateButton,
  LeftContent,
  RightContent,
  StatusPill,
  Hours,
  ClockIcon
} from './style';
import { FaClock } from 'react-icons/fa';
import CourseFormModal from '../../components/CourseFormModal/CourseFormModal';
import { useNavigate } from 'react-router-dom';

interface Course {
  _id: string;
  title: string;
  description: string;
  hours: number;
  videoUrl: string;
  category: string;
  state: string;
  modules: {
    title: string;
    time: string;
  }[];
}


const HomeTeacher = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Course | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/mine`, {
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

  const handleUpdateState = async (courseId: string, newState: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}/state`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ state: newState })
      });
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Title>Tus Cursos</Title>

      <CoursesWrapper>
        {courses.map(course => (
          <CourseCard key={course._id}>
            <CardTop>
              <MenuButton onClick={() =>
                setOpenDropdown(openDropdown === course._id ? null : course._id)
              }>
                <div></div>
              </MenuButton>

              {openDropdown === course._id && (
                <DropdownMenu>
                  <button onClick={() => {
                    setEditData(course);
                    setShowModal(true);
                    setOpenDropdown(null);
                  }}>
                    Modificar
                  </button>

                  {course.state === 'published' || course.state === 'in_review' ? (
                    <button onClick={() => handleUpdateState(course._id, 'inactive')}>
                      Dar de baja
                    </button>
                  ) : (
                    <button onClick={() => handleUpdateState(course._id, 'in_review')}>
                      Poner en revisión
                    </button>
                  )}
                </DropdownMenu>
              )}
            </CardTop>

            <CardContent>
              <LeftContent>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <StatusPill state={course.state}>
                  {course.state === 'published'
                    ? 'Publicado'
                    : course.state === 'in_review'
                    ? 'En Revisión'
                    : 'De Baja'}
                </StatusPill>
              </LeftContent>

              <RightContent>
                <Hours>
                  <ClockIcon><FaClock /></ClockIcon>
                  {course.hours} hs
                </Hours>
                <ViewButton onClick={() => navigate(`/course/${course._id}`)}>
                  Ver
                </ViewButton>
              </RightContent>
            </CardContent>
          </CourseCard>
        ))}
      </CoursesWrapper>

      <CreateButton onClick={() => {
        setEditData(null);
        setShowModal(true);
      }}>
        Crear nuevo curso
      </CreateButton>

      {showModal && (
        <CourseFormModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchCourses}
          defaultValues={editData || undefined}
        />
      )}
    </Container>
  );
};

export default HomeTeacher;
