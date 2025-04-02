import React from 'react';
import '../../style/home_page/header.css';

import usFlag from '../../assets/icons/usa-flag.png';
import { useAuth } from '../../providers/authProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowLoginForm } from '../../redux/slices/generalSlice';
import { useNavigate } from 'react-router';

const Header = () => {
  const dispatch = useDispatch();

  const isShowLoginForm = useSelector((state) => state.general.isShowLoginForm);
  const { email, firstName, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const onSignInClick = () => {
    navigate('/login');
  };

  const onTitlleClick = () => {
    navigate('/');
  };

  const onUsenameClick = () => {
    navigate(`/profile/${firstName}`);
  };

  const onBookingClick = () => {
    navigate('/book');
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="hotel_name_header" onClick={onTitlleClick}>
          Hotel Golden Palm
        </h1>
        <div className="middle_heder_container">
          <p className="book_room_button">About us</p>
          <p className="book_room_button">Gallery</p>
          <p className="book_room_button" onClick={onBookingClick}>
            Book a room
          </p>
        </div>
        <div className="header_right_container">
          {isLoggedIn ? (
            <div className="header_welcome_message">
              Welcome,{' '}
              <p className="profile_button" onClick={onUsenameClick}>
                {firstName}
              </p>
            </div>
          ) : (
            <p className="sign_in_button" onClick={onSignInClick}>
              Sign in!
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
