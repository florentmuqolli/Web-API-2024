import axios from 'axios';
import Cookies from 'js-cookie';

export const createUser = async (userData) => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return { message: 'Authentication required' };
    }
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', userData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        return { message: 'Failed to create user' };
    }
};

export const getUser = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return [];
    }
    try {
        const response = await axios.get('http://localhost:5000/api/auth', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Fetched users from API:', response.data); 
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

export const updateUser = async (id, userData) => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return { message: 'Authentication required' };
    }
    try {
        const response = await axios.put(`http://localhost:5000/api/auth/${id}`, userData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User updated:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        return { message: 'Failed to update user' };
    }
};

export const deleteUser = async (id) => {
    console.log('Deleting user with ID:', id);
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return { message: 'Authentication required' };
    }
    try {
        const response = await axios.delete(`http://localhost:5000/api/auth/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User deleted:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        return { message: 'Failed to delete user' };
    }
};


