import axios from 'axios';

// API to fetch all orders
export const getOrders = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.get('http://localhost:5000/api/orders',{
            headers: {
                Authorization: `Bearer ${token}`,
            },}
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};

// API to update an order
export const updateOrder = async (id, orderData) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.put(`http://localhost:5000/api/orders/${id}`, orderData,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating order:', error);
        return { message: 'Failed to update order' };
    }
};
