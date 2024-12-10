import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/Login');
    };

    return (
        <div className="text-center text-light" style={{ paddingTop: '20%', fontSize: '1.5rem'}}>
            <h1>Welcome to Web Templates</h1>
            <p>Explore our selection of templates for your projects.</p>
            {!isAuthenticated && (
                <button onClick={handleLoginClick} className="btn btn-primary mt-4">
                    Login
                </button>
            )}
        </div>
    );
};

export default MainPage;
