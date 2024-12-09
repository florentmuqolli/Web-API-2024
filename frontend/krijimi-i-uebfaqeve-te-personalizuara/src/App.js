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
        localStorage.removeItem('authToken'); // Remove the auth token
        localStorage.removeItem('userRole'); // Remove user role
        setIsAuthenticated(false); // Update state to reflect the user is logged out
        setUserRole(null);
        navigate('/Login'); // Redirect to the login page
    };

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const role = localStorage.getItem('userRole');

        if (authToken && role) {
            setIsAuthenticated(true);
            setUserRole(role);
        } else {
            setIsAuthenticated(false);
            setUserRole(null);
        }

        if (isAuthenticated && userRole) {
            if (userRole === 'admin' || userRole === 'employee') {
                navigate('/adminpanel'); // Redirect to admin panel
            } else {
                navigate('/MainPage'); // Redirect to main page for regular users
            }
        } else if (!isAuthenticated && location.pathname !== '/Login' && location.pathname !== '/Register') {
            navigate('/Login'); // Ensure unauthenticated users are redirected to login
        }
    }, [isAuthenticated, userRole, navigate, location.pathname]);

    console.log("Current location:", location.pathname);

    return (
        <div className="app-background">
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
