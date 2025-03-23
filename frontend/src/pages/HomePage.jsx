import React from 'react';
import '../style/home_page/homePage.css'
import RegisterForm from '../components/auth/RegisterForm';
import LoginForm from '../components/auth/LoginForm';

const HomePage = () => {
  return (
    <div className="home_page_wrap">
      <LoginForm />
    </div>
  );
};

export default HomePage;
