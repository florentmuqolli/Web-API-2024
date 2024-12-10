import React, { useState, useEffect } from 'react';
import { updateUser } from '../../api/users';

const UpdateUserForm = ({ userId }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('employee');

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
            setUsername(response.data.username);
            setEmail(response.data.email);
            setRole(response.data.role);
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, email, role };
        const response = await updateUser(userId, userData);
        alert(response.message || 'User updated successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Role:
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>
            </label>
            <br />
            <button type="submit">Update User</button>
        </form>
    );
};

export default UpdateUserForm;
