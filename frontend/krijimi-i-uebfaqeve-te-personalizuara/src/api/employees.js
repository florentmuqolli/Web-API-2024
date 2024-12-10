import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

// Create a new employee
export const createEmployee = async (employeeData) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.post(API_URL, employeeData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating employee:', error);
        return { message: 'Failed to create employee' };
    }
};

// Fetch all employees
export const getEmployees = async () => {
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
        console.error('Error fetching employees:', error);
        return [];
    }
};

// Update an employee
export const updateEmployee = async (id, employeeData) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.put(`${API_URL}/${id}`, employeeData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        return { message: 'Failed to update employee' };
    }
};

// Delete an employee
export const deleteEmployee = async (id) => {
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
        console.error('Error deleting employee:', error);
        return { message: 'Failed to delete employee' };
    }
};
