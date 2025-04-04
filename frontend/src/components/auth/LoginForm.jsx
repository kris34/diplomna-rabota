import React, { useEffect, useState } from 'react';
import '../../style/login_page/loginForm.css';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { SPINNER_COLOR, SPINNER_SIZE } from '../../util/constants';
import { useNavigate } from 'react-router';
import { useAuth } from '../../providers/authProvider';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsShowLoginForm,
  setIsShowRegisterForm,
} from '../../redux/slices/generalSlice';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const { setIsLoggedIn, setFirstName } = useAuth();

  const isShowRegisterForm = useSelector(
    (state) => state.general.isShowRegisterForm
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoginLoading(true);

      const response = await axios.post(
        'http://localhost:3003/auth/login',
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (!response) {
        setMessage('Invalid login response!');
        throw new Error('Invalid login response!');
      }

      setFormData({
        email: '',
        password: '',
      });

      setFirstName(response?.data?.name);
      dispatch(setIsShowLoginForm(false));
      setIsLoggedIn(true);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Login failed');
      } else if (error.request) {
        setMessage('No response from server. Please try again.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
      console.error('Error:', error);
    } finally {
      setIsLoginLoading(false);
      navigate('/');
    }
  };

  const showRegisterForm = () => {
    navigate('/register');
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <div className="centered_content_page">
      <div className="login_form_wrap">
        {isLoginLoading ? (
          <>
            <div className="login_form_header">
              <ClipLoader size={SPINNER_SIZE} color={SPINNER_COLOR} />
            </div>
          </>
        ) : (
          <>
            <div className="login_form_header">
              <p className="login_header_title">Sign in</p>
            </div>

            <div className="login_form_body">
              <form onSubmit={handleSubmit}>
                <div className="login_input_wrap">
                  <p className="login_input_title">Email address</p>
                  <input
                    className="login_input"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email address here..."
                    required
                  />
                </div>

                <div className="login_input_wrap">
                  <p className="login_input_title">Password</p>
                  <input
                    className="login_input"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Your Password here..."
                    required
                  />
                </div>

                <button type="submit" className="register_button">
                  Sign in
                </button>
              </form>

              <p className="existing_account_msg">
                Don't have an account? Sign up{' '}
                <a className="sign_up_button" onClick={showRegisterForm}>
                  here
                </a>
                !
              </p>
              {message && <p className="form-message">{message}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
