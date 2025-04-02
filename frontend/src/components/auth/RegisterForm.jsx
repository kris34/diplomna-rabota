import React, { useEffect, useState } from 'react';
import '../../style/login_page/loginForm.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useAuth } from '../../providers/authProvider';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3003/auth/register', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirm_password: formData?.confirmPassword,
        role: isAdmin ? 'admin' : 'user',
      });

      if (!response) {
        setMessage('Invalid login response!');
        throw new Error('Invalid login response!');
      }

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
      });
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Registration failed');
      } else if (error.request) {
        setMessage('No response from server. Please try again.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
      console.error('Error:', error);
    }
  };

  const showLoginForm = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <div className="centered_content_page">
      <div className="login_form_wrap">
        <div className="login_form_header">
          <p className="login_header_title">Sign up</p>
        </div>

        <div className="login_form_body">
          <form onSubmit={handleSubmit}>
            <div className="login_input_wrap">
              <p className="login_input_title">First Name</p>
              <input
                className="login_input"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your First name here..."
                required
              />
            </div>

            <div className="login_input_wrap">
              <p className="login_input_title">Last Name</p>
              <input
                className="login_input"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your Last name here..."
                required
              />
            </div>

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

            <div className="login_input_wrap">
              <p className="login_input_title">Repeat password</p>
              <input
                className="login_input"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password here..."
                required
              />
            </div>

            <button type="submit" className="register_button">
              Sign up
            </button>
          </form>

          <p className="existing_account_msg">
            Already have an account? Log in{' '}
            <a className="sign_up_button" onClick={showLoginForm}>
              here
            </a>
            !
          </p>
          {message && <p className="form-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
