import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Title,
  Table,
  Th,
  Td,
  Tr,
  Pill,
  ExpandButton,
  HeaderCellContent,
  FilterSelect,
  InnerTableWrapper,
  CoursesInnerTable,
  PanelHeader,
  HeaderLeft,
  Badge,
  ClosePanelBtn
} from './style';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

type Role = 'user' | 'teacher' | 'admin' | 'owner';

interface User {
  _id: string;
  fullname: string;
  email: string;
  role: Role;
}

interface Course {
  _id: string;
  title: string;
  hours: number;
  state: 'draft' | 'in_review' | 'published' | 'inactive';
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredRole, setFilteredRole] = useState<'all' | 'user' | 'teacher' | 'admin'>('all');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [loadingCoursesId, setLoadingCoursesId] = useState<string | null>(null);
  const [coursesMap, setCoursesMap] = useState<Record<string, Course[]>>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false, message: '', severity: 'success'
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const currentRole = (localStorage.getItem('role') || 'user') as Role;
  const isOwner = currentRole === 'owner';

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/admin/users?includeAdmin=${isOwner ? 'true' : 'false'}`;
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setSnackbar({ open: true, message: 'Error al cargar usuarios', severity: 'error' }));
  }, [token, isOwner]);

  useEffect(() => {
    if (!isOwner && filteredRole === 'admin') setFilteredRole('all');
  }, [isOwner, filteredRole]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('[data-expanded-panel]') || t.closest('[data-expander]')) return;
      setExpandedUserId(null);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setExpandedUserId(null); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  useEffect(() => { setExpandedUserId(null); }, [filteredRole]);

  const filteredUsers = useMemo(() => {
    if (filteredRole === 'all') return users;
    return users.filter(u => u.role === filteredRole);
  }, [users, filteredRole]);

  const handleRoleChange = async (userId: string, newRole: Exclude<Role, 'owner'>) => {
    try {
      const target = users.find(u => u._id === userId);
      if (!target) throw new Error('Usuario no encontrado');
      if (target.role === 'owner') {
        setSnackbar({ open: true, message: 'No se puede modificar un Owner', severity: 'error' });
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ newRole })
      });
      if (!res.ok) throw new Error();

      setUsers(prev => prev.map(u => (u._id === userId ? { ...u, role: newRole } : u)));
      setExpandedUserId(null);

      if ((target.role === 'teacher' || target.role === 'admin') && newRole === 'user') {
        try {
          const bulk = await fetch(`${import.meta.env.VITE_API_URL}/admin/courses/teacher/${userId}/bulk-state`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ state: 'inactive' })
          });
          if (!bulk.ok) throw new Error();

          setCoursesMap(prev => ({
            ...prev,
            [userId]: (prev[userId] || []).map(c => ({ ...c, state: 'inactive' }))
          }));
          setSnackbar({ open: true, message: 'Cursos del usuario dados de baja', severity: 'success' });
        } catch {
          setSnackbar({ open: true, message: 'No se pudieron dar de baja algunos cursos', severity: 'error' });
        }
      } else {
        setSnackbar({ open: true, message: 'Rol actualizado', severity: 'success' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Error al cambiar rol', severity: 'error' });
    }
  };

  const toggleExpand = async (user: User, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const already = expandedUserId === user._id;
    setExpandedUserId(already ? null : user._id);

    if (!already && (user.role === 'teacher' || user.role === 'admin') && !coursesMap[user._id]) {
      setLoadingCoursesId(user._id);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/teacher/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setCoursesMap(prev => ({ ...prev, [user._id]: Array.isArray(data) ? data : [] }));
      } catch {
        setSnackbar({ open: true, message: 'Error al cargar cursos', severity: 'error' });
      } finally {
        setLoadingCoursesId(null);
      }
    }
  };

  const handleCourseStateChange = async (
    courseId: string,
    newState: 'in_review' | 'published' | 'inactive',
    teacherId: string
  ) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}/state`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ state: newState })
      });
      if (!res.ok) throw new Error();

      setCoursesMap(prev => ({
        ...prev,
        [teacherId]: prev[teacherId].map(c => (c._id === courseId ? { ...c, state: newState } : c))
      }));

      setSnackbar({ open: true, message: 'Estado actualizado', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Error al cambiar estado', severity: 'error' });
    }
  };

  const closePanel = () => setExpandedUserId(null);

  return (
    <Container>
      <Title>Panel de Administración</Title>

      <Table>
        <colgroup>
          <col style={{ width: '32%' }} />
          <col style={{ width: '32%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
        </colgroup>
        <thead>
          <Tr>
            <Th><HeaderCellContent><span>Nombre</span></HeaderCellContent></Th>
            <Th><HeaderCellContent><span>Email</span></HeaderCellContent></Th>
            <Th>
              <HeaderCellContent>
                <span>Rol</span>
                <FilterSelect
                  aria-label="Filtrar por rol"
                  value={filteredRole}
                  onChange={(e) => setFilteredRole(e.target.value as any)}
                >
                  <option value="all">Todos</option>
                  <option value="user">Usuarios</option>
                  <option value="teacher">Profesores</option>
                  {isOwner && <option value="admin">Administradores</option>}
                </FilterSelect>
              </HeaderCellContent>
            </Th>
            <Th>
              <HeaderCellContent $justify="flex-end">
                <span>Acciones</span>
              </HeaderCellContent>
            </Th>
          </Tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <FragmentUser key={user._id}>
              <Tr>
                <Td data-label="Nombre" title={user.fullname}>{user.fullname}</Td>
                <Td data-label="Email" title={user.email}>{user.email}</Td>
                <Td data-label="Rol">
                  <FilterSelect
                    aria-label={`Rol de ${user.fullname}`}
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value as 'user' | 'teacher' | 'admin')}
                    disabled={user.role === 'owner' || (!isOwner && user.role === 'admin')}
                  >
                    <option value="user">Usuario</option>
                    <option value="teacher">Profesor</option>
                    {isOwner && <option value="admin">Administrador</option>}
                  </FilterSelect>
                </Td>
                <Td data-label="Acciones" style={{ textAlign: 'right' }}>
                  {(user.role === 'teacher' || user.role === 'admin') && (
                    <ExpandButton
                      data-expander
                      onClick={(e) => toggleExpand(user, e)}
                    >
                      {expandedUserId === user._id ? 'Ocultar cursos' : 'Ver cursos'}
                    </ExpandButton>
                  )}
                </Td>
              </Tr>

              {expandedUserId === user._id && (
                <Tr>
                  <Td colSpan={4} style={{ padding: 0 }}>
                    <InnerTableWrapper data-expanded-panel>
                      <PanelHeader>
                        <HeaderLeft>
                          <strong>{user.fullname}</strong>
                          <Badge>
                            {loadingCoursesId === user._id
                              ? 'Cargando...'
                              : `${coursesMap[user._id]?.length ?? 0} cursos`}
                          </Badge>
                        </HeaderLeft>
                        <ClosePanelBtn type="button" onClick={closePanel}>Cerrar ×</ClosePanelBtn>
                      </PanelHeader>

                      {loadingCoursesId === user._id ? null : (
                        <CoursesInnerTable>
                          <thead>
                            <Tr>
                              <Th>Título</Th>
                              <Th>Horas</Th>
                              <Th>Estado</Th>
                              <Th>Acción</Th>
                            </Tr>
                          </thead>

                          {/* Mínimo 1 fila si no hay cursos */}
                          <tbody>
                            {(coursesMap[user._id] || []).length === 0 ? (
                              <Tr>
                                <Td colSpan={4} style={{ textAlign: 'center' }}>
                                  No hay cursos publicados
                                </Td>
                              </Tr>
                            ) : (
                              (coursesMap[user._id] || []).map((course) => (
                                <Tr key={course._id}>
                                  <Td
                                    data-label="Título"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/course/${course._id}`)}
                                    title={course.title}
                                  >
                                    {course.title}
                                  </Td>
                                  <Td data-label="Horas">{course.hours}</Td>
                                  <Td data-label="Estado">
                                    <Pill $state={course.state}>
                                      {course.state === 'published'
                                        ? 'Publicado'
                                        : course.state === 'in_review'
                                        ? 'En Revisión'
                                        : course.state === 'inactive'
                                        ? 'De Baja'
                                        : 'Borrador'}
                                    </Pill>
                                  </Td>
                                  <Td data-label="Acción">
                                    <FilterSelect
                                      aria-label={`Cambiar estado de ${course.title}`}
                                      value={course.state}
                                      onChange={(e) =>
                                        handleCourseStateChange(
                                          course._id,
                                          e.target.value as 'in_review' | 'published' | 'inactive',
                                          user._id
                                        )
                                      }
                                    >
                                      <option value="in_review">En Revisión</option>
                                      <option value="published">Publicado</option>
                                      <option value="inactive">De Baja</option>
                                    </FilterSelect>
                                  </Td>
                                </Tr>
                              ))
                            )}
                          </tbody>
                        </CoursesInnerTable>
                      )}
                    </InnerTableWrapper>
                  </Td>
                </Tr>
              )}
            </FragmentUser>
          ))}
        </tbody>
      </Table>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" severity={snackbar.severity}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

const FragmentUser = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export default AdminPanel;
