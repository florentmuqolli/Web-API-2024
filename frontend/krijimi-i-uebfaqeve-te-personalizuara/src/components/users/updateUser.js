import React, { useState, useEffect } from 'react';
import { updateUser, getUser } from '../../api/users';
import './formStyles.css';

const UpdateUserForm = ({ userId, closeForm, onUserUpdated, setNotification }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
            const fetchUserDetails = async () => {
                const userDetails = await getUser(userId);
                if (userDetails) {
                    setName(userDetails.name || '');
                    setEmail(userDetails.email || '');
                    setRole(userDetails.role || '');
                }
            };
            fetchUserDetails();
        }, [userId]);

    const handleSubmit = async (e) => {
            e.preventDefault();
            const userData = { name, email, role, credentials: 'include' };
            const response = await updateUser(userId, userData);
            if (response.message) {
                setNotification({ message: response.message, type: 'success', visible: true });
                onUserUpdated();
                closeForm();
            } else {
                setNotification({ message: 'Error updating user', type: 'error', visible: true });
            }
        };

    return (
        <div className="form-overlay">
            <div className="form-modal">
                <button className="close-button" onClick={closeForm} type="button">
                    ×
                </button>
                <h2>Update User</h2>
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
                    <button type="submit" className="submit-button">Update User</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserForm;
