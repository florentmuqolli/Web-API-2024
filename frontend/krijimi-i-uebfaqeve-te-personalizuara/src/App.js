import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import MainPage from './components/MainPage';
import AdminTools from './components/adminpanel';
import ProductsPage from './components/ProductsPage';
import ContactPage from './components/ContactPage';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cookies from 'js-cookie'; 
import axios from 'axios'; 

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState((Cookies.get('userRole'))  || ''); 
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout');
            Cookies.remove('authToken');
            Cookies.remove('userRole');
            window.location.href = '/Login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/status', { withCredentials: true });
                if (response.data.authenticated) {
                    setIsAuthenticated(true);
                    const role = Cookies.get('userRole');
                    setUserRole(role); 
                    //console.log('userRole from cookies:', role);
                } else {
                    setIsAuthenticated(false);
                    setUserRole('');
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                setIsAuthenticated(false);
                setUserRole('');
            }
        };

        checkAuthStatus();
    }, []); 

    console.log("Current location:", location.pathname);

    const getBackgroundClass = () => {
        switch (location.pathname) {
            case '/Login':
            case '/Register':
                return 'auth-background';
            default:
                return 'app-background';
        }
    };

    useEffect(() => {
        const handleRedirection = () => {
            if (isAuthenticated && userRole) {
                console.log(`Authenticated: ${isAuthenticated}, Role: ${userRole}`);
                if (location.pathname === '/' || location.pathname === '/Login' || location.pathname === '/Register') {
                    // Redirect only if on the initial or auth pages
                    if (userRole === 'admin' || userRole === 'employee') {
                        navigate('/adminpanel');
                    } else {
                        navigate('/MainPage');
                    }
                }
            }
        };
    
        handleRedirection();
    }, [isAuthenticated, userRole, navigate, location.pathname]);
    

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
                <Route path="/templates" element={<ProductsPage />}/>
                <Route path="/contact" element={<ContactPage />}/>
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
