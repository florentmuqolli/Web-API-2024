import React, { useState } from 'react';
import { createUser } from '../../api/users';

const CreateUserForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee'); // Default role can be 'employee'

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, email, password, role };
        const response = await createUser(userData);
        alert(response.message || 'User created successfully');
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
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            <button type="submit">Create User</button>
        </form>
    );
};

export default CreateUserForm;
