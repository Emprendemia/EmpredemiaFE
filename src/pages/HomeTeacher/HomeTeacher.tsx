import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  CoursesWrapper,
  CardTop,
  MenuButton,
  DropdownMenu,
  CreateButton
} from './style';
import CourseFormModal from '../../components/CourseFormModal/CourseFormModal';
import CourseCard from '../../components/CourseCard/CourseCard';
import { Course } from '../../interface/Interface';

const HomeTeacher = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Course | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
          <div key={course._id} style={{ position: 'relative' }}>
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

            <CourseCard
              course={course}
              showState
              onEdit={(c) => {
                setEditData(c);
                setShowModal(true);
              }}
              onUpdateState={handleUpdateState}
            />



          </div>
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
