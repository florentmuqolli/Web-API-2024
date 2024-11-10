import React from 'react';

const Header = ({ onAuthToggle, isAuthenticating }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent d-flex justify-content-between px-5 py-3">
            <a className="navbar-brand text-light" href="MainPage.js">Ueb</a>
            
            <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link text-light" href="MainPage.js">Home <span className="sr-only">(current)</span></a>
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
                className="btn btn-outline-success my-2 my-sm-0 ml-3"
            >
                {isAuthenticating ? 'Back to Home' : 'Login / Register'}
            </button>
        </nav>
    );
};

export default Header;
