import React, { useState } from 'react';
import logo from './Designerm.png';
import logoAlt from './Designer.png'; 

const Header = ({ currentPage, onAuthToggle, isAuthenticating }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const buttonStyle = {
        color: 'white',
        border: isHovered ? '2px solid #238636' : '2px solid #ccc',
        backgroundColor: isHovered ? '#238636' : 'transparent',
    };

    
    const logoToShow = currentPage === 'auth' ? logoAlt : logo;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent d-flex justify-content-between px-5 py-3">
            <a className="navbar-brand text-light" href="/">
                <img src={logoToShow} alt="Logo" style={{ height: '80px' }} />
            </a>
            
            <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link text-light" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="#">Pricing</a>
                    </li>
                </ul>
            </div>
            
            <button 
                onClick={onAuthToggle} 
                className="btn my-2 my-sm-0 ml-3"
                style={buttonStyle}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
            >
                {isAuthenticating ? 'Back to Home' : 'Login / Register'}
            </button>
        </nav>
    );
};

export default Header;
