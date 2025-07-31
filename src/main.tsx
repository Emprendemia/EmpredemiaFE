import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'

import Router from './router/Router.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </GoogleOAuthProvider>
  </StrictMode>,
)
