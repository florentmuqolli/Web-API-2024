import React, { useState } from 'react';
import { createUser } from '../../api/users';
import './formStyles.css';

const CreateUserForm = ({ closeForm, onUserCreated, setNotification }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, password, email, role, credentials: 'include' };
        const response = await createUser(userData);
        if (response.message) {
            setNotification({ message: response.message, type: 'success', visible: true });
            onUserCreated();
            closeForm();
        } else {
            setNotification({ message: 'Error creating user', type: 'error', visible: true });
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-modal">
                <button className="close-button" onClick={closeForm} type="button">
                    ×
                </button>
                <h2>Create User</h2>
                <form className="order-form" onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Role:
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="employee">Employee</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </label>
                    <button type="submit" className="submit-button">Create User</button>
                </form>
            </div>
        </div>
    );
};

export default CreateUserForm;
