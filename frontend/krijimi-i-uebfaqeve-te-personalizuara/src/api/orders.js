import axios from 'axios';
import Cookies from 'js-cookie';


export const getOrders = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.get('http://localhost:5000/api/orders',{
            withCredentials: true,
        });
        console.log('Fetched Orders from API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};


export const createOrder = async (orderData) => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.post('http://localhost:5000/api/orders', orderData, {
            withCredentials: true,
        });
        console.log('Order created successfully:', response.data);
        return response.data;  
    } catch (error) {
        console.error('Error creating order:', error);
        return { message: 'Failed to create order' };
    }
};



export const updateOrder = async (id, orderData) => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.put(`http://localhost:5000/api/orders/${id}`, orderData,{
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating order:', error);
        return { message: 'Failed to update order' };
    }
};


export const deleteOrder = async (id) => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.delete(`http://localhost:5000/api/orders/${id}`, {
            withCredentials: true,
        });
        return response.data; 
    } catch (error) {
        console.error('Error deleting order:', error);
        return { message: 'Failed to delete order' };
    }
};