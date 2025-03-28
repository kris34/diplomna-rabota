import React, { useEffect } from 'react';
import '../style/home_page/homePage.css'
import RegisterForm from '../components/auth/RegisterForm';
import LoginForm from '../components/auth/LoginForm';

const HomePage = () => {

  
  useEffect(() => { 
      console.log('here');
      
    console.log(document.cookie);
  }, [])

  return (
    <div className="home_page_wrap">
      <LoginForm />
    </div>
  );
};

export default HomePage;
