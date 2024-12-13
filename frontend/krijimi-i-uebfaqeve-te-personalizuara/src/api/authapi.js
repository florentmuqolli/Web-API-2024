import axios from 'axios';

export const loginUser = async (username, password) => {
    return axios.post('http://localhost:5000/api/auth/login', { username, password }, { withCredentials: true });
};

export const checkAuthStatus = async () => {
    return axios.get('http://localhost:5000/api/auth/status', { withCredentials: true });
};
