import React, { useState, useEffect } from 'react';
import { updateMessage } from '../../api/messages'; 
import axios from 'axios';
import './formStyles.css';

const UpdateMessageForm = ({ id }) => {
    const [messageName, setMessageName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessage = async () => {
            const response = await axios.get(`http://localhost:5000/api/contact/${id}`);
            setMessageName(response.data.name);
            setEmail(response.data.email);
            setMessage(response.data.message);
        };

        if (id) {
            fetchMessage();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const messageData = { messageName, email, message };
        const response = await updateMessage(id, messageData);
        alert(response.message || 'Employee updated successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                User Name:
                <input
                    type="text"
                    value={messageName}
                    onChange={(e) => setMessageName(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Position:
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Update Message</button>
        </form>
    );
};

export default UpdateMessageForm;
