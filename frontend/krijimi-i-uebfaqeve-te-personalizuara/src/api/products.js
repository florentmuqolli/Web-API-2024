import axios from 'axios';
import Cookies from 'js-cookie';

export const createProduct = async (productData) => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.post('http://localhost:5000/api/products', productData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Product created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        return { message: 'Failed to create product' };
    }
};

export const getProducts = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.get('http://localhost:5000/api/products', {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched Products from API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const updateProduct = async (id, productData) => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.put(`http://localhost:5000/api/products/${id}`, productData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        return { message: 'Failed to update product' };
    }
};

export const deleteProduct = async (id) => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.delete(`http://localhost:5000/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        return { message: 'Failed to delete product' };
    }
};
