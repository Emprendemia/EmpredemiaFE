import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Table,
  Th,
  Td,
  Tr,
  Select,
  Pill,
  ExpandButton
} from './style';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface User {
  _id: string;
  fullname: string;
  email: string;
  role: 'user' | 'teacher';
}

interface Course {
  _id: string;
  title: string;
  hours: number;
  state: 'draft' | 'in_review' | 'published' | 'inactive';
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredRole, setFilteredRole] = useState('all');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [coursesMap, setCoursesMap] = useState<Record<string, Course[]>>({});
  /* const [loadingCourses, setLoadingCourses] = useState(false); <--- en caso de implementar una muestra de carga*/
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => {
        setSnackbar({ open: true, message: 'Error al cargar usuarios', severity: 'error' });
      });
  }, []);

  const filteredUsers = filteredRole === 'all' ? users : users.filter(u => u.role === filteredRole);

  const handleRoleChange = async (userId: string, newRole: 'user' | 'teacher') => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ newRole })
      });

      if (!res.ok) throw new Error();

      setUsers(prev => prev.map(u => (u._id === userId ? { ...u, role: newRole } : u)));
      setSnackbar({ open: true, message: 'Rol actualizado', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Error al cambiar rol', severity: 'error' });
    }
  };

  const toggleExpand = async (user: User) => {
    const alreadyExpanded = expandedUserId === user._id;
    setExpandedUserId(alreadyExpanded ? null : user._id);

    if (!alreadyExpanded && user.role === 'teacher' && !coursesMap[user._id]) {
      /* setLoadingCourses(true) */;
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/teacher/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setCoursesMap(prev => ({ ...prev, [user._id]: data }));
      } catch {
        setSnackbar({ open: true, message: 'Error al cargar cursos', severity: 'error' });
      } finally {
        /* setLoadingCourses(false) */;
      }
    }
  };

  const handleCourseStateChange = async (
    courseId: string,
    newState: 'in_review' | 'published' | 'inactive',
    teacherId: string
  ) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}/state`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ state: newState })
      });

      setCoursesMap(prev => ({
        ...prev,
        [teacherId]: prev[teacherId].map(c => (c._id === courseId ? { ...c, state: newState } : c))
      }));

      setSnackbar({ open: true, message: 'Estado actualizado', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Error al cambiar estado', severity: 'error' });
    }
  };

  return (
    <Container>
      <Title>Panel de Administración</Title>

      <Select onChange={(e) => setFilteredRole(e.target.value)}>
        <option value="all">Todos</option>
        <option value="user">Usuarios</option>
        <option value="teacher">Profesores</option>
      </Select>

      <Table>
        <thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Email</Th>
            <Th>Rol</Th>
            <Th>Acciones</Th>
          </Tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <>
              <Tr key={user._id}>
                <Td>{user.fullname}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value as 'user' | 'teacher')}
                  >
                    <option value="user">Usuario</option>
                    <option value="teacher">Profesor</option>
                  </Select>
                </Td>
                <Td>
                  {user.role === 'teacher' && (
                    <ExpandButton onClick={() => toggleExpand(user)}>
                      {expandedUserId === user._id ? 'Ocultar cursos' : 'Ver cursos'}
                    </ExpandButton>
                  )}
                </Td>
              </Tr>

              {expandedUserId === user._id && coursesMap[user._id] && (
                <Tr>
                  <Td colSpan={4}>
                    <Table>
                      <thead>
                        <Tr>
                          <Th>Título</Th>
                          <Th>Horas</Th>
                          <Th>Estado</Th>
                          <Th>Acción</Th>
                        </Tr>
                      </thead>
                      <tbody>
                        {coursesMap[user._id].map((course) => (
                          <Tr key={course._id}>
                            <Td style={{ cursor: 'pointer', color: '#0077cc' }}
                              onClick={() => navigate(`/course/${course._id}`)}>
                              {course.title}
                            </Td>
                            <Td>{course.hours}</Td>
                            <Td>
                              <Pill state={course.state}>{course.state === 'published' ? 'Publicado' : course.state === 'in_review' ? 'En Revisión' : 'De Baja'}</Pill>
                            </Td>
                            <Td>
                              <Select
                                value={course.state}
                                onChange={(e) =>
                                  handleCourseStateChange(course._id, e.target.value as 'in_review' | 'published' | 'inactive', user._id)
                                }
                              >
                                <option value="in_review">En Revisión</option>
                                <option value="published">Publicado</option>
                                <option value="inactive">De Baja</option>
                              </Select>
                            </Td>
                          </Tr>
                        ))}
                      </tbody>
                    </Table>
                  </Td>
                </Tr>
              )}
            </>
          ))}
        </tbody>
      </Table>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" severity={snackbar.severity as any}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default AdminPanel;
