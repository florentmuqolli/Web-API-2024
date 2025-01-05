import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logo from './Designer.png';
import { FaUserCircle } from "react-icons/fa";

const Header = ({ isAuthenticated, handleSignOut }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLoginClick = () => {
    navigate('/Login');
  };

  const handleRegisterClick = () => {
    navigate('/Register');
  };

  const handleLogoutClick = () => {
    handleSignOut();
    navigate('/MainPage');
  };

  const handleBackClick = () => {
    navigate('/MainPage');
  };

  const handleProfileClick = () => {
    navigate("/profile"); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const isAuthPage = location.pathname === '/Login' || location.pathname === '/Register';

  return (
    <header className="header">
      {isAuthPage ? (
        <div className="back-button-container">
          <button className="btn-green back-btn" onClick={handleBackClick}>Back</button>
        </div>
      ) : (
        <>
          <div className="logo">
            <a href="/MainPage">
              <img src={logo} alt="Logo" className="logo-img" height={'60px'} />
            </a>
          </div>
          <div className="nav-links">
            <a href="/MainPage" className="nav-link">Home</a>
            <a href="/templates" className="nav-link">Products</a>
            <a href="/pricing" className="nav-link">Pricing</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Get in touch</a>
          </div>
          <div className="auth-menu">
            {!isAuthenticated && location.pathname !== '/Login' && location.pathname !== '/Register' && (
              <>
                <button className="btn-green auth-btn" onClick={handleLoginClick}>Login</button>
                <button className="btn-green auth-btn" onClick={handleRegisterClick}>Register</button>
              </>
            )}
            {isAuthenticated && (
              <div className="user-menu">
              <FaUserCircle
                size={30}
                className="profile-icon"
                onClick={toggleDropdown}
              />
              <div className={`dropdown-menuu ${isDropdownOpen ? 'show' : ''}`}>
                <button
                  className="dropdown-item"
                  onClick={handleProfileClick}
                >
                  View Profile
                </button>
                <button
                  className="dropdown-item"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </>
      )}
    </header>
  );
};

export default Header;
