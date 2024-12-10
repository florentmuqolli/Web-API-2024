import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

// Create a new product
export const createProduct = async (productData) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.post(API_URL, productData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        return { message: 'Failed to create product' };
    }
};

// Fetch all products
export const getProducts = async () => {
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
        console.error('Error fetching products:', error);
        return [];
    }
};

// Update a product
export const updateProduct = async (id, productData) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.put(`${API_URL}/${id}`, productData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        return { message: 'Failed to update product' };
    }
};

// Delete a product
export const deleteProduct = async (id) => {
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
        console.error('Error deleting product:', error);
        return { message: 'Failed to delete product' };
    }
};
