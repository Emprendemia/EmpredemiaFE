import {
  Container,
  PanelWrapper,
  LeftPanel,
  RightPanel,
  Form,
  Title,
  Label,
  Input,
  Button,
  GoogleButton,
  GoogleIcon,
  BoyImage
} from './style';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { useGoogleLogin } from '@react-oauth/google';

import boyImage from '../../assets/boy.png';
import googleIcon from '../../assets/google.svg';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<RegisterFormData>();

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [serverError, setServerError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const onSubmit = async (data: RegisterFormData) => {
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      alert('Por favor completá el reCAPTCHA');
      return;
    }

    const fullname = `${data.firstName} ${data.lastName}`;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname,
          email: data.email,
          password: data.password
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al registrar usuario');
      }

      setOpenSnackbar(true);
      reset();
      recaptchaRef.current?.reset();
    } catch (error: any) {
      setServerError(error.message);
    }
  };

  useEffect(() => {
    if (openSnackbar) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [openSnackbar, navigate]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`
          }
        });
        const user = await userInfo.json();

        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token })
        });

        const data = await res.json();
        if (!data.token || !data.role) throw new Error('Token o rol inválido');

        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        navigate(data.role === 'teacher' ? '/teacher' : '/home');
      } catch (error) {
        console.error('Error con Google login', error);
      }
    },
    onError: () => {
      console.log('Login con Google falló');
    },
    flow: 'implicit'
  });

  return (
    <Container>
      <PanelWrapper>
        <LeftPanel>
          <BoyImage src={boyImage} alt="Chico con laptop" />
        </LeftPanel>

        <RightPanel
          as={motion.div}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>¡Completa tus datos para registrarte!</Title>

            <Label>Nombre:</Label>
            <Input {...register('firstName', { required: true })} />
            {errors.firstName && <span>Campo requerido</span>}

            <Label>Apellido:</Label>
            <Input {...register('lastName', { required: true })} />
            {errors.lastName && <span>Campo requerido</span>}

            <Label>Email:</Label>
            <Input type="email" {...register('email', { required: true })} />
            {errors.email && <span>Campo requerido</span>}

            <Label>Contraseña:</Label>
            <Input type="password" {...register('password', { required: true })} />
            {errors.password && <span>Campo requerido</span>}

            <Label>Confirmar contraseña:</Label>
            <Input
              type="password"
              {...register('confirmPassword', {
                required: true,
                validate: (value) =>
                  value === watch('password') || 'Las contraseñas no coinciden'
              })}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message || 'Campo requerido'}</span>
            )}

            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              style={{ margin: '12px 0' }}
            />

            {serverError && <span style={{ color: 'red' }}>{serverError}</span>}

            <Button type="submit">Registrate</Button>

            <GoogleButton type="button" onClick={() => googleLogin()}>
              <GoogleIcon src={googleIcon} alt="Google" />
              Iniciar sesión con Google
            </GoogleButton>

            <Button
              type="button"
              onClick={() => navigate('/login')}
              style={{ backgroundColor: '#ccc', color: '#003049' }}
            >
              Iniciar sesión
            </Button>
          </Form>
        </RightPanel>
      </PanelWrapper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            backgroundColor: '#002b3f',
            color: 'white',
            fontWeight: 'bold',
            alignItems: 'center'
          }}
          icon={false}
        >
          <div>
            Te haz registrado correctamente
            <LinearProgress
              sx={{
                backgroundColor: 'white',
                marginTop: '8px',
                height: '4px',
                borderRadius: '4px'
              }}
            />
          </div>
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Register;
