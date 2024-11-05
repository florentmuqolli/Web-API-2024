import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setErrorMessage] = useState('');
    const [success, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
            });
            setSuccessMessage('Regjistrimi i suksesshëm!');
        } catch (error) {
            console.error('Gabim në regjistrim:', error.response);
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message); // Show specific error message from the server
            } else {
                setErrorMessage('Gabim në regjistrim!'); // Fallback error message
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 text-#F59710">Regjistrohu</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleRegister} className="border p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="btn btn-primary w-100">Regjistrohu</button>
            </form>
        </div>
    );
};

export default Register;
