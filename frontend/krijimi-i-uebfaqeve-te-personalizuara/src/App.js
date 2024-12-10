import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import MainPage from './components/MainPage';
import AdminTools from './components/adminpanel';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = () => {
        console.log("User is signing out...");
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('userRole');
        setIsAuthenticated(false); 
        setUserRole(null);
        navigate('/Login');
    };

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const role = localStorage.getItem('userRole');

        if (authToken && role) {
            console.log("Signing in....")
            setIsAuthenticated(true);
            setUserRole(role);
        } else {
            setIsAuthenticated(false);
            setUserRole(null);
        }

        if (isAuthenticated && userRole) {
            if (userRole === 'admin' || userRole === 'employee') {
                navigate('/adminpanel'); 
            } else {
                navigate('/MainPage'); 
            }
        }
    }, [isAuthenticated, userRole, navigate]);

    console.log("Current location:", location.pathname);

    const getBackgroundClass = () => {
        if (location.pathname === '/Login' || location.pathname === '/Register') {
            return 'auth-background';
        }
        return 'app-background';
    };

    return (
        <div className={getBackgroundClass()}>
            {location.pathname !== '/adminpanel' && (
                <Header
                    isAuthenticated={isAuthenticated}
                    handleSignOut={handleSignOut}
                />
            )}
            <Routes>
                <Route path="/MainPage" element={<MainPage isAuthenticated={isAuthenticated} />} />
                <Route path="/adminpanel" element={<AdminTools />} />
                <Route
                    path="/Login"
                    element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />}
                />
                <Route
                    path="/Register"
                    element={<Register />}
                />
                <Route
                    path="/"
                    element={isAuthenticated ? (
                        userRole === 'admin' || userRole === 'employee' ? <AdminTools /> : <MainPage />
                    ) : (
                        <Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />
                    )}
                />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
