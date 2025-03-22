import React from 'react';
import '../../style/home_page/header.css';

import usFlag from '../../assets/icons/usa-flag.png';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="hotel_name_header">Hotel Golden Palm</h1>
        <div className="lang_container">
          <img src={usFlag} className="lang_icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
