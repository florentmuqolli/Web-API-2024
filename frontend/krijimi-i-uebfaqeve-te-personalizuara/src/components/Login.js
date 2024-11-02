import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            alert('Autentifikimi i suksesshëm! Token: ' + response.data.token);
        } catch (error) {
            console.error('Gabim në autentifikim:', error);
            alert('Gabim në autentifikim!');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Identifikohu</h2>
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
                <button type="submit" className="btn btn-primary w-100">Identifikohu</button>
            </form>
        </div>
    );
};

export default Login;