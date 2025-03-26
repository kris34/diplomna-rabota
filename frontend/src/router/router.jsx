import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LoginForm from '../components/auth/LoginForm';

let router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  { 
    path: '/login',
    Component: LoginForm
  }
]);

export default router;
