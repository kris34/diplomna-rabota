import React, { useEffect } from 'react';
import '../style/home_page/homePage.css';
import { useAuth } from '../providers/authProvider';
import LoginForm from '../components/auth/LoginForm';
import { useSelector } from 'react-redux';
import RegisterForm from '../components/auth/RegisterForm';

const HomePage = () => {
  const isShowLoginForm = useSelector((state) => state.general.isShowLoginForm);
  const isShowRegisterForm = useSelector(
    (state) => state.general.isShowRegisterForm
  );

  const renderLoginForm = () => {
    return <LoginForm />;
  };

  const renderRegisterForm = () => {
    return <RegisterForm />;
  };

  useEffect(() => { 
    console.log(isShowLoginForm);
    
  }, [isShowLoginForm])

  const renderHomeContent = () => {
    return (
      <div>
        <h1>Welcome Back!</h1>
        <p>This is your home page content</p>
      </div>
    );
  };

  return (
    <div className="home_page_wrap">
      {isShowRegisterForm
        ? renderRegisterForm()
        : isShowLoginForm
        ? renderLoginForm()
        : renderHomeContent()}
    </div>
  );
};
export default HomePage;
