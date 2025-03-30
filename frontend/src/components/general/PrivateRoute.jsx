import { useAuth } from '../../providers/authProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsShowLoginForm } from '../../redux/slices/generalSlice';

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();

  const { isLoggedIn, checkIfUserIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  async function relocateUserIfAuthenticated() {
    try {
      const isLogged = await checkIfUserIsLoggedIn();

      if (!isLogged) {
        navigate('/login');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  }

  useEffect(() => {
    relocateUserIfAuthenticated();
  }, []);

  return (
    <>
      {/* {isExpired && <ExpirationWarning isExpired={isExpired} />} */}
      {children}
    </>
  );
};

export default PrivateRoute;
