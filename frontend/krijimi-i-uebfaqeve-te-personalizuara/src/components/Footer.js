import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'; 
import logo from './Designerm.png';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Logo" className="footer-logo-img" height={'60px'}/>
          <p>&copy; {new Date().getFullYear()} Crimsons. All Rights Reserved.</p>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="#home" onClick={() => handleNavigation('/MainPage')}>Home</a></li>
            <li><a href="#products" onClick={() => handleNavigation('/templates')}>Products</a></li>
            <li><a href="#pricing" onClick={() => handleNavigation('/pricing')}>Pricing</a></li>
            <li><a href="#about" onClick={() => handleNavigation('/about')}>About</a></li>
            <li><a href="#contact" onClick={() => handleNavigation('/contact')}>Contact</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
