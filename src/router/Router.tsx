import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Course from '../pages/Course/Course';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import CourseDetail from '../pages/CourseDetail/CourseDetail';
import ProtectedRoute from './ProtectedRoute';
import HomeTeacher from '../pages/HomeTeacher/HomeTeacher';
import PrivateLayout from '../components/PrivateLayout/PrivateLayout';
import Profile from '../pages/Profile/Profile';
import Administrar from '../pages/AdminPanel/AdminPanel';

const Router = () => (
  <Routes>
    {/* Sin navbar */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Con navbar */}
    <Route element={<PrivateLayout />}>
      <Route path="/" element={
        <ProtectedRoute><Home /></ProtectedRoute>
      } />
      <Route path="/home" element={
        <ProtectedRoute><Home /></ProtectedRoute>
      } />
      <Route path="/course" element={
        <ProtectedRoute><Course /></ProtectedRoute>
      } />
      <Route path="/about" element={
        <ProtectedRoute><About /></ProtectedRoute>
      } />
      <Route path="/contact" element={
        <ProtectedRoute><Contact/></ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute><Profile /></ProtectedRoute>
      } />
      <Route path="/course/:id" element={
        <ProtectedRoute><CourseDetail /></ProtectedRoute>
      } />
      <Route path="/administrar" element={
        <ProtectedRoute><Administrar /></ProtectedRoute>
      } />
      <Route path="/teacher" element={
        <ProtectedRoute><HomeTeacher /></ProtectedRoute>
      } />
    </Route>
  </Routes>
);

export default Router;
