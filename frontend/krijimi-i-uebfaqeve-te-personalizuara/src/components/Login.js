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
        <div className="container mt-4">
            <h2 className="text-center mb-4 text-#63F6FF">Identifikohu</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin} className="border p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {success && <div className="alert alert-success">{success}</div>}
                <button type="submit" className="btn btn-primary w-100">Identifikohu</button>
            </form>
        </div>
    );
};

export default Login;