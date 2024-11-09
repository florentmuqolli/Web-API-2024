import React from 'react';

const Header = ({ onAuthToggle, isAuthenticating }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
            <a className="navbar-brand text-danger" href="#">Ueb</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link text-danger" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-danger" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-danger" href="#">Pricing</a>
                    </li>
                </ul>
                <button 
                    onClick={onAuthToggle} 
                    className="btn btn-outline-danger my-2 my-sm-0"
                >
                    {isAuthenticating ? 'Back to Home' : 'Login / Register'}
                </button>
            </div>
        </nav>
    );
};

export default Header;
