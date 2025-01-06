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
            withCredentials: true,
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
            withCredentials: true,
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
            withCredentials: true,
        });
        console.log('User updated:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        return { message: 'Failed to update user' };
    }
};

export const getCurrentUser = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return { message: 'Authentication required' };
    }
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw new Error('Failed to fetch current user');
    }
  };
  
  export const changePassword = async (currentPassword, newPassword) => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return { message: 'Authentication required' };
    }
    try {
        const response = await axios.post(
            'http://localhost:5000/api/auth/change-password',
            { currentPassword, newPassword },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw new Error(error.response?.data?.message || 'Failed to change password');
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
            withCredentials: true,
        });
        console.log('User deleted:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        return { message: 'Failed to delete user' };
    }
};


