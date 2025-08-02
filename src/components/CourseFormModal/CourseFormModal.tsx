import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
  ModalWrapper,
  ModalContent,
  Title,
  Label,
  Input,
  Textarea,
  Button,
  CloseButton,
  Select,
  ModuleRow,
  AddModuleButton,
  TimeInput
} from './style';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  defaultValues?: {
    _id: string;
    title: string;
    description: string;
    hours: number;
    videoUrl: string;
    category: string;
    modules: {
      title: string;
      time: string;
    }[];
  };
}

interface Module {
  title: string;
  time: string;
}

interface FormData {
  title: string;
  description: string;
  hours: number;
  videoUrl: string;
  category: string;
}

const categories = [
  'Redes sociales y publicidad',
  'Educación financiera',
  'Gestión y E-commerce',
  'Packaging',
  'Envios y logística',
  'Mentalidad emprendedora',
  'Atención al Cliente y Post-Venta'
];

const CourseFormModal = ({ onClose, onSuccess, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormData>({
    defaultValues: defaultValues || {}
  });

  const [success, setSuccess] = useState(false);
  const [modules, setModules] = useState<Module[]>([{ title: '', time: '' }]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      setModules(defaultValues.modules || [{ title: '', time: '' }]);
    }
  }, [defaultValues, reset]);

  const handleModuleChange = (index: number, field: keyof Module, value: string) => {
    const updated = [...modules];
    updated[index][field] = value;
    setModules(updated);
  };

  const addModule = () => {
    setModules(prev => [...prev, { title: '', time: '' }]);
  };

  const formatTimeInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    let formatted = '';
    if (digits.length > 0) formatted = digits.slice(0, 2);
    if (digits.length >= 3) formatted += ':' + digits.slice(2, 4);
    if (digits.length >= 5) formatted += ':' + digits.slice(4, 6);
    return formatted;
  };

  const onSubmit = async (data: FormData) => {
    try {
      const token = localStorage.getItem('token');
      const method = defaultValues ? 'PUT' : 'POST';
      const url = defaultValues
        ? `${import.meta.env.VITE_API_URL}/courses/${defaultValues._id}`
        : `${import.meta.env.VITE_API_URL}/courses`;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          modules,
          ...(defaultValues && { state: 'in_review' }) // solo en edición
        })
      });

      if (!res.ok) throw new Error('Error al guardar curso');

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
        <Title>{defaultValues ? 'Editar Curso' : 'Nuevo Curso'}</Title>

        <Label>Título</Label>
        <Input {...register('title', { required: true })} />
        {errors.title && <span>Campo requerido</span>}

        <Label>Descripción</Label>
        <Textarea {...register('description', { required: true })} rows={3} />
        {errors.description && <span>Campo requerido</span>}

        <Label>Categoría</Label>
        <Select {...register('category', { required: true })}>
          <option value="">Seleccioná una categoría</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </Select>
        {errors.category && <span>Campo requerido</span>}

        <Label>Cantidad de horas</Label>
        <Input type="number" {...register('hours', { required: true })} />
        {errors.hours && <span>Campo requerido</span>}

        <Label>Video URL</Label>
        <Input {...register('videoUrl', { required: true })} />
        {errors.videoUrl && <span>Campo requerido</span>}

        <Label>Módulos</Label>
        {modules.map((mod, idx) => (
          <ModuleRow key={idx}>
            <Input
              placeholder="Título"
              value={mod.title}
              onChange={e => handleModuleChange(idx, 'title', e.target.value)}
              required
            />
            <TimeInput
              type="text"
              placeholder="HH:MM:SS"
              inputMode="numeric"
              maxLength={8}
              value={mod.time}
              onChange={(e) => {
                const formatted = formatTimeInput(e.target.value);
                handleModuleChange(idx, 'time', formatted);
              }}
              required
              title="Formato HH:MM:SS"
            />
          </ModuleRow>
        ))}

        <AddModuleButton type="button" onClick={addModule}>+ Agregar módulo</AddModuleButton>

        <Button type="submit">{defaultValues ? 'Guardar cambios' : 'Crear curso'}</Button>

        <Snackbar
          open={success}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert elevation={6} variant="filled" severity="success">
            Curso {defaultValues ? 'actualizado' : 'creado'} exitosamente
          </MuiAlert>
        </Snackbar>
      </ModalContent>
    </ModalWrapper>
  );
};

export default CourseFormModal;
