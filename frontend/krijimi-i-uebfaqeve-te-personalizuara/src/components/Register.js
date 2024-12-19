import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setErrorMessage] = useState('');
    const [success, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            setSuccessMessage('Registration successful! Please login.');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error during registration!');
        }
    };

    return (
        <div className="container mt-4 w-50">
            <h2 className="text-center mb-4 text-light">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleRegister} className="border p-4 rounded border-dark" style={{ background: '#151B23', maxWidth: '400px', margin: '0 auto' }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label text-light">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control border-dark text-light"
                        style={{ background: '#0D1117' }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                >
                    Register
                </button>
                <button
                    type="button"
                    className="btn btn-link mt-2 text-light w-100"
                    onClick={() => navigate('/Login')}
                >
                    Already have an account? Login
                </button>
            </form>
        </div>
    );
};

export default Register;
