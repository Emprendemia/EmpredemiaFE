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

type FormValues = {
  fullname: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};

const Profile = () => {
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors }
  } = useForm<FormValues>();

  const newPassword = watch('newPassword');

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

  const onSubmit = async (formData: FormValues) => {
    const token = localStorage.getItem('token');
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (!isGoogleUser) {
        if (!formData.currentPassword) {
          setErrorMsg('Debes ingresar tu contraseña actual');
          return;
        }

        if (formData.newPassword) {
          if (formData.newPassword.length < 6) {
            setErrorMsg('La nueva contraseña debe tener mínimo 6 caracteres');
            return;
          }
          if (formData.newPassword !== formData.confirmNewPassword) {
            setErrorMsg('La confirmación no coincide con la nueva contraseña');
            return;
          }
        }

        const resPass = await fetch(`${import.meta.env.VITE_API_URL}/auth/change-password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword || formData.currentPassword
          })
        });

        if (!resPass.ok) {
          const data = await resPass.json();
          throw new Error(data.message || 'Contraseña actual incorrecta');
        }
      }

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
    <Container
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Mi Perfil</Title>

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Label>Nombre completo</Label>
          <Input
            autoComplete="name"
            {...register('fullname', { required: true, validate: validateFullName })}
          />
          {errors.fullname && (
            <ErrorText>{String(errors.fullname.message || 'Campo requerido')}</ErrorText>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label>Email</Label>
          <Input
            type="email"
            autoComplete="email"
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
              <Input
                type="password"
                autoComplete="current-password"
                {...register('currentPassword', { required: true })}
              />
              {errors.currentPassword && <ErrorText>Campo requerido</ErrorText>}
            </FieldGroup>

            <FieldGroup>
              <Label>Nueva contraseña (opcional)</Label>
              <Input
                type="password"
                autoComplete="new-password"
                {...register('newPassword', {
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
              />
              {errors.newPassword && <ErrorText>{errors.newPassword.message}</ErrorText>}
            </FieldGroup>

            <FieldGroup>
              <Label>Confirmar nueva contraseña</Label>
              <Input
                type="password"
                autoComplete="new-password"
                {...register('confirmNewPassword', {
                  validate: (value) =>
                    !getValues('newPassword') ||
                    value === getValues('newPassword') ||
                    'La confirmación no coincide'
                })}
              />
              {errors.confirmNewPassword && (
                <ErrorText>{errors.confirmNewPassword.message as string}</ErrorText>
              )}
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
