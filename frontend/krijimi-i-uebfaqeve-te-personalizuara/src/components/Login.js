import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setErrorMessage] = useState('');
    const [success, setSuccessMessage] = useState('');
    const [userRole, setUserRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setIsLoading(true);
    
        console.log('Attempting login with:', { email, password });

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                { email, password },
                { withCredentials: true }
            );
    
            Cookies.set('authToken', response.data.accessToken, { expires: 1 });
            Cookies.set('userRole', response.data.userRole, { expires: 1 });
            console.log('Login response:', response.data);


            setUserRole(response.data.userRole);
    
            setSuccessMessage('Login successful!');
            setIsAuthenticated(true);
    
            const role = response.data.userRole;
            navigate(role === 'admin' || role === 'employee' ? '/adminpanel' : '/MainPage');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error during login!');
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="container mt-4 w-50">
            <h2 className="text-center mb-4 text-light">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleLogin} className="border p-4 rounded border-dark" style={{ background: '#151B23', maxWidth: '300px', margin: '0 auto' }}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-light">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control border-dark text-light"
                        style={{ background: '#0D1117' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label text-light">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control border-dark text-light"
                        style={{ background: '#0D1117' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn text-light w-100"
                    style={{ background: '#238636' }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <button
                    type="button"
                    className="btn btn-link mt-2 text-light w-100"
                    onClick={() => navigate('/Register')}
                >
                    Don't have an account? Register
                </button>
            </form>
        </div>
    );
};

export default Login;
