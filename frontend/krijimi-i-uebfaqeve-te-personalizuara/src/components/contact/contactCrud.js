import React, { useState, useEffect } from 'react';
import { getMessages, deleteMessage, markAsDone } from '../../api/messages';
import CreateMessageForm from './createContact';
import UpdateMessageForm from './updateContact';
import './ConCrud.css';

const ContactCRUD = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState('');
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  const fetchMessages = async () => {
    const fetchedMessages = await getMessages({credentials: 'include'});
    console.log('Fetched Messages:', fetchedMessages); 
    setMessages(fetchedMessages);
  };

  const handleDelete = async (messageID) => {
    const response = await deleteMessage(messageID);
    setNotification({ message: response.message || 'Message deleted successfully', type: 'success', visible: true });
    fetchMessages();
  };

  const handleMarkAsDone = async (messageID) => {
    const response = await markAsDone(messageID);
    setNotification({ message: response.message || 'Message marked as done', type: 'success', visible: true });
    fetchMessages();
  };

  const handleEdit = (messageID) => {
    setSelectedMessageId(messageID);
    setIsUpdateFormVisible(true);
    setIsCreateFormVisible(false);
  };

  const closeForms = () => {
    setIsCreateFormVisible(false);
    setIsUpdateFormVisible(false);
    setSelectedMessageId(null);
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="orders-container">
      <h2>Messages Management</h2>
      <button
        className="create-button"
        onClick={() => {
          setIsCreateFormVisible(true);
          setIsUpdateFormVisible(false);
        }}
      >
        Create New Message
      </button>

      {isCreateFormVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateMessageForm
              onMessageCreated={fetchMessages}
              closeForm={closeForms}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}

      {isUpdateFormVisible && selectedMessageId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UpdateMessageForm
              productID={selectedMessageId}
              onProductUpdated={fetchMessages}
              closeForm={closeForms}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}

      {notification.visible && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button className="not-button" onClick={closeNotification}>×</button>
        </div>
      )}

      <table className="orders-table">
        <thead>
          <tr>
            <th>Message ID</th>
            <th>Message Subject</th>
            <th>Message</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(messages) && messages.length === 0 ? (
            <tr>
              <td colSpan="7">No messages found</td>
            </tr>
          ) : (
            Array.isArray(messages) &&
            messages.map((message) => (
              <tr key={message.id}>
                <td>{message.id}</td>
                <td>
                  {message.status === 'pending' && <span className="blue-dot">•</span>}
                  {message.subject}
                </td>
                <td>{message.message}</td>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.created_at}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(message.id)}>
                    Reply
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(message.id)}>
                    Delete
                  </button>
                  {message.status === 'pending' ? (
                    <button className="mark-done-button" onClick={() => handleMarkAsDone(message.id)}>
                      Mark as Done
                    </button>
                  ) : (
                    <button className="done-button" disabled>
                      ✅ Done
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactCRUD;
