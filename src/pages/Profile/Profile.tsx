import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Form,
  Label,
  Input,
  Button,
  FieldGroup,
  ErrorText
} from './style';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const Profile = () => {
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setValue('fullname', data.fullname);
      setValue('email', data.email);
      setIsGoogleUser(data.password === 'google_oauth');
    };
    fetchProfile();
  }, [setValue]);

  const validateFullName = (value: string) => {
    const parts = value.trim().split(' ');
    return (
      parts.every(part => /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/.test(part)) ||
      'Debe comenzar con mayúscula y no contener números'
    );
  };

  const onSubmit = async (formData: any) => {
    const token = localStorage.getItem('token');
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (!isGoogleUser) {
        // Requiere contraseña actual para actualizar cualquier cosa
        if (!formData.currentPassword) {
          setErrorMsg('Debes ingresar tu contraseña actual');
          return;
        }

        // Valida la contraseña actual (obligatoria siempre)
        const resPass = await fetch(`${import.meta.env.VITE_API_URL}/auth/change-password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword || formData.currentPassword // si no hay nueva, deja la actual
          })
        });

        if (!resPass.ok) {
          const data = await resPass.json();
          throw new Error(data.message || 'Contraseña actual incorrecta');
        }
      }

      // Actualiza nombre/email (para Google o normal)
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email
        })
      });

      if (!res.ok) throw new Error('Error al actualizar perfil');

      setSuccessMsg('Perfil actualizado correctamente');
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  return (
    <Container as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Title>Mi Perfil</Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Label>Nombre completo</Label>
          <Input {...register('fullname', { required: true, validate: validateFullName })} />
          {errors.fullname && <ErrorText>{String(errors.fullname.message || 'Campo requerido')}</ErrorText>}
        </FieldGroup>

        <FieldGroup>
          <Label>Email</Label>
          <Input
            type="email"
            disabled={isGoogleUser}
            {...register('email', {
              required: 'Campo requerido',
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: 'Email inválido'
              }
            })}
          />
          {errors.email && <ErrorText>{String(errors.email.message)}</ErrorText>}
        </FieldGroup>

        {!isGoogleUser && (
          <>
            <FieldGroup>
              <Label>Contraseña actual</Label>
              <Input type="password" {...register('currentPassword', { required: true })} />
              {errors.currentPassword && <ErrorText>Campo requerido</ErrorText>}
            </FieldGroup>

            <FieldGroup>
              <Label>Nueva contraseña (opcional)</Label>
              <Input type="password" {...register('newPassword', { minLength: 6 })} />
              {errors.newPassword && <ErrorText>Mínimo 6 caracteres</ErrorText>}
            </FieldGroup>
          </>
        )}

        <Button type="submit">Guardar cambios</Button>
      </Form>

      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </Container>
  );
};

export default Profile;
