import React from 'react';
import '../../style/general/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Hotel Golden Palm. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
