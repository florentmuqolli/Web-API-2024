import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setErrorMessage] = useState('');
    const [success, setSuccessMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            setSuccessMessage('Identifikimi i suksesshëm!');
        } catch (error) {
            console.error('Gabim në autentifikim:', error.message);
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message); // Show specific error message from the server
            } else {
                setErrorMessage('Gabim në identifikim!'); // Fallback error message
            }
        }
    };

    return (
        <div className="container mt-4 w-50">
            <h2 className="text-center mb-4 text-light">Identifikohu</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin} className="border p-4 rounded" style={{background:'#151B23'}}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-light">Email</label>
                    <input style={{background:'#0D1117'}}
                        type="email"
                        id="email"
                        className="form-control border-dark text-light"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label text-light">Password</label>
                    <input style={{background:'#0D1117'}}
                        type="password"
                        id="password"
                        className="form-control border-dark text-light"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {success && <div className="alert alert-success">{success}</div>}
                <button type="submit" className="btn text-light w-100" style={{background:'#238636'}}>Identifikohu</button>
            </form>
        </div>
    );
};

export default Login;