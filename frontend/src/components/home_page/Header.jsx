import React from 'react';
import '../../style/home_page/header.css';

import usFlag from '../../assets/icons/usa-flag.png';
import { useAuth } from '../../providers/authProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowLoginForm } from '../../redux/slices/generalSlice';

const Header = () => {
  const dispatch = useDispatch();

  const isShowLoginForm = useSelector((state) => state.general.isShowLoginForm);
  const { email, firstName, isLoggedIn } = useAuth();

  const onSignInClick = () => {
    dispatch(setIsShowLoginForm(true));
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="hotel_name_header">Hotel Golden Palm</h1>
        <div className="header_right_container">
          {isLoggedIn ? (
            <p className="header_welcome_message">Welcome, {firstName}</p>
          ) : (
            <p className="sign_in_button" onClick={onSignInClick}>
              Sign in!
            </p>
          )}
          <img src={usFlag} className="lang_icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
