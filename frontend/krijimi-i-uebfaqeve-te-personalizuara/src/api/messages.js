import axios from 'axios';
import Cookies from 'js-cookie';

export const createMessage = async (messageData) => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.post('http://localhost:5000/api/messages', messageData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating message:', error);
        return { message: 'Failed to create message' };
    }
};

export const getMessages = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return [];
    }
    try {
        const response = await axios.get('http://localhost:5000/api/messages', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
            return response.data.data;
        } else {
            console.error('Failed to fetch messages:', response.data.error);
            return [];
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        return []; 
    }
};

export const markAsDone = async (id) => {
    const token = Cookies.get('authToken');
    if (!token) {
      console.error('No token found, please log in.');
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/messages/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error marking message as done:', error);
      return { success: false, message: 'Failed to mark as done' };
    }
  };
  
export const updateMessage = async (id, messageData) => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.put(`http://localhost:5000/api/messages/${id}`, messageData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating message:', error);
        return { message: 'Failed to update message' };
    }
};

export const deleteMessage = async (id) => {
    const token = Cookies.get('authToken');
    if (!token) {
        console.error('No token found, please log in.');
        return;
    }
    try {
        const response = await axios.delete(`http://localhost:5000/api/messages/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting message:', error);
        return { message: 'Failed to delete message' };
    }
};
