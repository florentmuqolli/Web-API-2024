import axios from 'axios';


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
        console.log('Fetched Orders from API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};


export const createOrder = async (orderData) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.post('http://localhost:5000/api/orders', orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Order created successfully:', response.data);
        return response.data;  
    } catch (error) {
        console.error('Error creating order:', error);
        return { message: 'Failed to create order' };
    }
};



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


export const deleteOrder = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.delete(`http://localhost:5000/api/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error deleting order:', error);
        return { message: 'Failed to delete order' };
    }
};