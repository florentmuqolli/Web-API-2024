import React, { useState } from 'react';
import { createMessage } from '../../api/messages';
import './formStyles.css';

const CreateMessageForm = ({ closeForm, onMessageCreated, setNotification }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const messageData = {name, email, subject, message };
        const response = await createMessage(messageData);
        if (response.message) {
            setNotification({ message: response.message, type: 'success', visible: true });
            onMessageCreated();
            closeForm();
        } else {
            setNotification({ message: 'Error creating order', type: 'error', visible: true });
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-modal">
                <button className="close-button" onClick={closeForm} type="button">
                    ×
                </button>
                <h2>Create Message</h2>
                <form className="order-form" onSubmit={handleSubmit}>
                    <label>
                        User Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Subject:
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Message:
                        <textarea
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" className="submit-button">Create Message</button>
                </form>
            </div>
        </div>
    );
};

export default CreateMessageForm;