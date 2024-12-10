import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Create a new user
export const createUser = async (userData) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.post(API_URL, userData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        return { message: 'Failed to create user' };
    }
};

// Fetch all users
export const getUsers = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return [];
    }
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

// Update a user
export const updateUser = async (id, userData) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.put(`${API_URL}/${id}`, userData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        return { message: 'Failed to update user' };
    }
};

// Delete a user
export const deleteUser = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        return { message: 'Failed to delete user' };
    }
};

