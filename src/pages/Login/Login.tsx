import {
  Container,
  LeftPanel,
  RightPanel,
  PanelWrapper,
  Form,
  Title,
  Label,
  Input,
  Button,
  GoogleButton,
  GoogleIcon,
  GirlImage,
  /*   ButtonBox */
} from './style';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

import girlImage from '../../assets/girl.png';
import googleIcon from '../../assets/google.svg';
import NavbarDummy from '../../components/NavbarDummy/NavbarDummy';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const navigate = useNavigate();

  const handleRedirectByRole = (role: string) => {
    if (role === 'teacher') {
      navigate('/teacher');
    } else {
      navigate('/home');
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setServerError('Por favor completá el reCAPTCHA');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const { token: authToken, role } = await res.json();
      if (!authToken || !role) throw new Error('Token o rol inválido');

      localStorage.setItem('token', authToken);
      localStorage.setItem('role', role);
      handleRedirectByRole(role);
      recaptchaRef.current?.reset();
    } catch (error: any) {
      setServerError(error.message);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      try {
        const resToken = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`
          }
        });

        const googleUser = await resToken.json();

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
      } catch (err) {
        console.error('Error al iniciar sesión con Google:', err);
        setServerError('Error al iniciar sesión con Google');
        setSnackbarOpen(true);
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      setServerError('El login con Google falló');
      setSnackbarOpen(true);
    },
    flow: 'implicit'
  });



  return (
    <Container>
      <NavbarDummy />
      <PanelWrapper>
        <LeftPanel
          as={motion.div}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>¡Hola de nuevo!</Title>

            <Label>Email:</Label>
            <Input
              placeholder='Correo electronico'
              {...register('email', { required: true })} />
            {errors.email && <span>Campo requerido</span>}

            <Label>Contraseña:</Label>
            <Input
              placeholder='Introduce tu contraseña'
              type="password" {...register('password', { required: true })} />
            {errors.password && <span>Campo requerido</span>}
            {/*   <ButtonBox> */}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              style={{ margin: '12px 0', width: '19em' }}
            />

            {serverError && <span style={{ color: 'red' }}>{serverError}</span>}

            <Button type="submit" disabled={loading}>
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Acceder'}
            </Button>




            <Button
              type="button"
              onClick={() => navigate('/register')}

            >
              Registrate
            </Button>

            <GoogleButton type="button" onClick={() => googleLogin()}>
              <GoogleIcon src={googleIcon} alt="Google" />
              Iniciar sesión con Google
            </GoogleButton>
            {/* </ButtonBox> */}
          </Form>
        </LeftPanel>

        <RightPanel>
          <GirlImage src={girlImage} alt="Chica usando celular" />
        </RightPanel>
      </PanelWrapper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          variant="filled"
        >
          {serverError}
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default Login;
