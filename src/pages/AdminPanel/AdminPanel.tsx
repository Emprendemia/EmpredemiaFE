import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Table,
  Th,
  Td,
  Tr,
  Select,
  Button,
  ModalContent,
  ModalOverlay
} from './style';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [filteredRole, setFilteredRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const filteredUsers = filteredRole === 'all' ? users : users.filter(u => u.role === filteredRole);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const confirmChange = confirm('¿Estás seguro de cambiar el rol de este usuario?');
    if (!confirmChange) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ newRole })
      });

      if (!res.ok) throw new Error('Error al cambiar el rol');

      setUsers(prev => prev.map(u => (u._id === userId ? { ...u, role: newRole } : u)));
      setSnackbar({ open: true, message: 'Rol actualizado correctamente', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al cambiar rol', severity: 'error' });
    }
  };

  const handleUserClick = async (user: any) => {
    setSelectedUser(user);
    if (user.role === 'teacher') {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/teacher/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCourses(data);
    }
    setShowModal(true);
  };

  const handleCourseStateChange = async (courseId: string, newState: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}/state`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ state: newState })
    });
    setCourses(prev => prev.map(c => (c._id === courseId ? { ...c, state: newState } : c)));
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
          {filteredUsers.map((user: any) => (
            <Tr key={user._id}>
              <Td>{user.fullname}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="user">Usuario</option>
                  <option value="teacher">Profesor</option>
                </Select>
              </Td>
              <Td>
                <Button onClick={() => handleUserClick(user)}>Ver</Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      {showModal && selectedUser && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>{selectedUser.fullname}</h3>
            <p>{selectedUser.email}</p>
            {selectedUser.role === 'teacher' && (
              <Table>
                <thead>
                  <Tr>
                    <Th>Título</Th>
                    <Th>Estado</Th>
                    <Th>Acción</Th>
                    <Th>Detalle</Th>
                  </Tr>
                </thead>
                <tbody>
                  {courses.map((c: any) => (
                    <Tr key={c._id}>
                      <Td>{c.title}</Td>
                      <Td>{c.state}</Td>
                      <Td>
                        <Select
                          value={c.state}
                          onChange={(e) => handleCourseStateChange(c._id, e.target.value)}
                        >
                          <option value="published">Publicado</option>
                          <option value="in_review">En Revisión</option>
                          <option value="inactive">Inactivo</option>
                        </Select>
                      </Td>
                      <Td>
                        <Button onClick={() => navigate(`/course/${c._id}`)}>Ver</Button>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            )}
          </ModalContent>
        </ModalOverlay>
      )}

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
