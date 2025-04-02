import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import LoginForm from '../components/auth/LoginForm';
import PrivateRoute from '../components/general/PrivateRoute';
import RegisterForm from '../components/auth/RegisterForm';
import ProfilePage from '../components/auth/ProfilePage';
import BookingPage from '../components/booking_page/BookingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'register',
        element: <RegisterForm />,
      },
      {
        path: '/profile/:username',
        element: <ProfilePage />,
      },
      { 
        path: '/book',
        element: <BookingPage />
      }
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
