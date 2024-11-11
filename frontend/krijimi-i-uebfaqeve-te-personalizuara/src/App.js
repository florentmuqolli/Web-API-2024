// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import MainPage from './components/MainPage';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [isRegistering, setIsRegistering] = useState(true);

    const handleAuthToggle = () => {
        setIsAuthenticating(!isAuthenticating);
    };

    return (
        <div className={isAuthenticating ? 'auth-background' : 'app-background'}>
            <Header onAuthToggle={handleAuthToggle} isAuthenticating={isAuthenticating} />
            {isAuthenticating ? (
                isRegistering ? <Register /> : <Login />
            ) : (
                <MainPage />
            )}
            {isAuthenticating && (
                <div className="d-flex justify-content-center align-items-center">
                    <button onClick={() => setIsRegistering(!isRegistering)} className="btn btn-link mt-2 text-light">
                        Switch to {isRegistering ? 'Login' : 'Register'}
                    </button>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default App;
