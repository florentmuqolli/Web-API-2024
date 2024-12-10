import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import logo from './Designerm.png';
import logoAlt from './Designer.png';

const Header = ({ isAuthenticated, handleSignOut }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get current location

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const buttonStyle = {
        color: 'white',
        border: isHovered ? '2px solid #238636' : '2px solid #ccc',
        backgroundColor: isHovered ? '#238636' : 'transparent',
    };

    // Logo change logic based on authentication state
    const logoToShow = isAuthenticated ? logoAlt : logo;

    // Back button visibility logic
    const isAuthPage = location.pathname === '/Login' || location.pathname === '/Register';

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent d-flex justify-content-between px-5 py-3">
            <a
                className="navbar-brand text-light"
                href="#"
                onClick={() => navigate('/MainPage')}
            >
                <img src={logoToShow} alt="Logo" style={{ height: '80px' }} />
            </a>
            {isAuthPage && (
                <button
                    onClick={() => navigate('/MainPage')}
                    className="btn my-2 my-sm-0 ml-3"
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Back
                </button>
            )}
            {!isAuthPage && (
                <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a
                                className="nav-link text-light"
                                href="#"
                                onClick={() => navigate('/MainPage')}
                            >
                                Home <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#">
                                Features
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#">
                                Pricing
                            </a>
                        </li>
                    </ul>
                </div>
            )}
            {!isAuthPage && (
                <button
                    onClick={handleSignOut}
                    className="btn my-2 my-sm-0 ml-3"
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {isAuthenticated ? 'Sign Out' : 'Login / Register'}
                </button>
            )}
        </nav>
    );
};

export default Header;
