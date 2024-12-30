import React, { useState, useEffect } from 'react';
import { getUser, deleteUser } from '../../api/users';
import CreateUserForm from './createUser';
import UpdateUserForm from './updateUser';
import './usersCrud.css';

const UsersCRUD = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '', visible: false });

    const fetchUsers = async () => {
        const fetchedUsers = await getUser({credentials: 'include'});
        console.log("Fetched Users:", fetchedUsers);
        setUsers(fetchedUsers);
    };

    const handleDelete = async (userId) => {
        const response = await deleteUser(userId);
        setNotification({ message: response.message || 'User deleted successfully', type: 'success', visible: true });
        fetchUsers();
    };

    const handleEdit = (userId) => {
        setSelectedUserId(userId);
        setIsUpdateFormVisible(true);
        setIsCreateFormVisible(false); 
    };

    const closeForms = () => {
        setIsCreateFormVisible(false);
        setIsUpdateFormVisible(false);
        setSelectedUserId(null);
    };

    const closeNotification = () => {
        setNotification({ ...notification, visible: false });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="orders-container">
            <h2>Users Management</h2>
            <button
                className="create-button"
                onClick={() => {
                    setIsCreateFormVisible(true);
                    setIsUpdateFormVisible(false);
                }}
            >
                Create New User
            </button>

            {isCreateFormVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <CreateUserForm
                            onUserCreated={fetchUsers}  
                            closeForm={closeForms}
                            setNotification={setNotification} 
                        />
                    </div>
                </div>
            )}

            {isUpdateFormVisible && selectedUserId && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <UpdateUserForm
                            userId={selectedUserId} 
                            onUserUpdated={fetchUsers} 
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
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(user._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UsersCRUD;
