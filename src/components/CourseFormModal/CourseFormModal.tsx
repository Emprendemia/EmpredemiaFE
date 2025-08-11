import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
  ModalWrapper,
  ModalContent,
  ModalTitle,
  ModalLabel,
  ModalInput,
  ModalTextarea,
  ModalButton,
  CloseButton,
  StyledSelect,
  ModuleRow,
  AddModuleButton,
  TimeInput,
  ErrorText,
  DeleteModuleButton
} from './style';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Course } from '../../interface/Interface';

interface FormData {
  title: string;
  description: string;
  hours: string;
  videoUrl: string;
  category: string;
  image?: string;
}

interface Module {
  title: string;
  time: string;
}

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  defaultValues?: Course;
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
    reset
  } = useForm<FormData>({
    defaultValues: defaultValues
      ? {
          title: defaultValues.title,
          description: defaultValues.description,
          hours: String(defaultValues.hours),
          videoUrl: defaultValues.videoUrl,
          category: defaultValues.category
        }
      : {}
  });

  const [success, setSuccess] = useState(false);
  const [modules, setModules] = useState<Module[]>([{ title: '', time: '' }]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(defaultValues?.image || '');
  const [imageError, setImageError] = useState<string>('');
  const [moduleError, setModuleError] = useState('');

  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title,
        description: defaultValues.description,
        hours: String(defaultValues.hours),
        videoUrl: defaultValues.videoUrl,
        category: defaultValues.category
      });
      setModules(defaultValues.modules || [{ title: '', time: '' }]);
      setImageUrl(defaultValues.image || '');
    }
  }, [defaultValues, reset]);

  const handleModuleChange = (index: number, field: keyof Module, value: string) => {
    const updated = [...modules];
    updated[index][field] = value;
    setModules(updated);
  };

  const addModule = () => setModules(prev => [...prev, { title: '', time: '' }]);
  const removeModule = (index: number) => setModules(prev => prev.filter((_, i) => i !== index));

  const formatTimeInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    let formatted = '';
    if (digits.length > 0) formatted = digits.slice(0, 2);
    if (digits.length >= 3) formatted += ':' + digits.slice(2, 4);
    if (digits.length >= 5) formatted += ':' + digits.slice(4, 6);
    return formatted;
  };

  const isValidTimeFormat = (time: string): boolean => {
    const parts = time.split(':');
    if (parts.length !== 3) return false;

    const [hh, mm, ss] = parts.map(Number);
    if (isNaN(hh) || isNaN(mm) || isNaN(ss)) return false;
    if (mm > 59 || ss > 59 || hh < 0 || mm < 0 || ss < 0) return false;

    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('El archivo debe ser una imagen');
      return;
    }

    if (file.size > 1024 * 1024) {
      setImageError('La imagen debe pesar menos de 1MB');
      return;
    }

    setImageFile(file);
    setImageError('');
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) {
      console.warn('⚠ No se seleccionó imagen, se usará imageUrl existente o null');
      return imageUrl || null;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_UPLOAD_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const resultText = await res.text();
      console.log('⏬ Respuesta de /upload:', resultText);

      if (!res.ok) throw new Error('Error al subir imagen');

      const data = JSON.parse(resultText);
      return data.imageUrl;
    } catch (err) {
      console.error('🛑 uploadImage error:', err);
      setImageError('Error al subir la imagen');
      return null;
    }
  };

  const onSubmit = async (data: FormData) => {
    for (let i = 0; i < modules.length; i++) {
      if (!modules[i].title.trim() || !isValidTimeFormat(modules[i].time)) {
        setModuleError(`El módulo ${i + 1} es erroneo, formato de tiempo INVALIDO o falta de datos`);
        return;
      }
    }
    setModuleError('');

    try {
      const uploadedImageUrl = await uploadImage();
      if (!uploadedImageUrl) return;

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
          hours: parseFloat(data.hours),
          modules,
          image: uploadedImageUrl,
          ...(defaultValues && { state: 'in_review' })
        })
      });

      if (!res.ok) throw new Error('Error al guardar curso');

      setSuccess(true);
      reset();
      setImageFile(null);
      setImageUrl('');
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
        <ModalTitle>{defaultValues ? 'Editar Curso' : 'Nuevo Curso'}</ModalTitle>

        <ModalLabel>Título</ModalLabel>
        <ModalInput {...register('title', { required: true })} />
        {errors.title && <ErrorText>Campo requerido</ErrorText>}

        <ModalLabel>Descripción</ModalLabel>
        <ModalTextarea {...register('description', { required: true })} rows={3} />
        {errors.description && <ErrorText>Campo requerido</ErrorText>}

        <ModalLabel>Categoría</ModalLabel>
        <StyledSelect {...register('category', { required: true })}>
          <option value="">Seleccioná una categoría</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </StyledSelect>
        {errors.category && <ErrorText>Campo requerido</ErrorText>}

        <ModalLabel>Cantidad de horas</ModalLabel>
        <StyledSelect {...register('hours', { required: true })}>
          <option value="">Seleccioná duración</option>
          {[...Array(20)].map((_, i) => {
            const val = 0.5 * (i + 1);
            return <option key={val} value={val}>{val}</option>;
          })}
        </StyledSelect>
        {errors.hours && <ErrorText>Campo requerido</ErrorText>}

        <ModalLabel>Video URL</ModalLabel>
        <ModalInput {...register('videoUrl', { required: true })} />
        {errors.videoUrl && <ErrorText>Campo requerido</ErrorText>}

        <ModalLabel>Imagen del curso</ModalLabel>
        <ModalInput type="file" accept="image/*" onChange={handleImageChange} />
        {imageError && <ErrorText>{imageError}</ErrorText>}

        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            style={{ width: '100%', marginTop: '10px', borderRadius: '8px' }}
          />
        )}
        {!imageFile && imageUrl && (
          <img
            src={imageUrl}
            alt="Miniatura actual"
            style={{ width: '100%', marginTop: '10px', borderRadius: '8px' }}
          />
        )}

        <ModalLabel>Módulos</ModalLabel>
        {modules.map((mod, idx) => (
          <ModuleRow key={idx}>
            <ModalInput
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
            <DeleteModuleButton
              type="button"
              onClick={() => removeModule(idx)}
              title="Eliminar módulo"
            >
              ×
            </DeleteModuleButton>
          </ModuleRow>
        ))}
        {moduleError && <ErrorText>{moduleError}</ErrorText>}

        <AddModuleButton type="button" onClick={addModule}>+ Agregar módulo</AddModuleButton>
        <ModalButton type="submit">{defaultValues ? 'Guardar cambios' : 'Crear curso'}</ModalButton>

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
