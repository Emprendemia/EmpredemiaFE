import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  ModalWrapper,
  ModalContent,
  Title,
  Label,
  Input,
  Textarea,
  Button,
  CloseButton
} from './style';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  title: string;
  description: string;
  hours: number;
  videoUrl: string;
  modules: string;
}

const CourseFormModal = ({ onClose, onSuccess }: Props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          modules: data.modules.split(',').map(m => m.trim())
        })
      });

      if (!res.ok) throw new Error('Error al crear curso');

      setSuccess(true);
      reset();
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalWrapper>
      <ModalContent onSubmit={handleSubmit(onSubmit)}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Nuevo Curso</Title>

        <Label>Título</Label>
        <Input {...register('title', { required: true })} />
        {errors.title && <span>Campo requerido</span>}

        <Label>Descripción</Label>
        <Textarea {...register('description', { required: true })} rows={3} />
        {errors.description && <span>Campo requerido</span>}

        <Label>Cantidad de horas</Label>
        <Input type="number" {...register('hours', { required: true })} />
        {errors.hours && <span>Campo requerido</span>}

        <Label>Video URL</Label>
        <Input {...register('videoUrl', { required: true })} />
        {errors.videoUrl && <span>Campo requerido</span>}

        <Label>Módulos (separados por coma)</Label>
        <Input {...register('modules', { required: true })} />
        {errors.modules && <span>Campo requerido</span>}

        <Button type="submit">Crear curso</Button>

        <Snackbar
          open={success}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert elevation={6} variant="filled" severity="success">
            Curso creado exitosamente
          </MuiAlert>
        </Snackbar>
      </ModalContent>
    </ModalWrapper>
  );
};

export default CourseFormModal;
