// OrdersCRUD.js
import React, { useState, useEffect } from 'react';
import { getOrders, deleteOrder } from '../../api/orders';
import CreateOrderForm from './createOrder';
import UpdateOrderForm from './updateOrder';
import './ordersCrud.css';

const OrdersCRUD = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '', visible: false });

    const fetchOrders = async () => {
        const fetchedOrders = await getOrders({credentials: 'include'});
        setOrders(fetchedOrders);
    };

    const handleDelete = async (orderId) => {
        const response = await deleteOrder(orderId);
        setNotification({ message: response.message || 'Order deleted successfully', type: 'success', visible: true });
        fetchOrders();
    };

    const handleEdit = (orderId) => {
        setSelectedOrderId(orderId);
        setIsUpdateFormVisible(true);
        setIsCreateFormVisible(false); 
    };

    const closeForms = () => {
        setIsCreateFormVisible(false);
        setIsUpdateFormVisible(false);
        setSelectedOrderId(null);
    };

    const closeNotification = () => {
        setNotification({ ...notification, visible: false });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="orders-container">
            <h2>Orders Management</h2>
            <button
                className="create-button"
                onClick={() => {
                    setIsCreateFormVisible(true);
                    setIsUpdateFormVisible(false);
                }}
            >
                Create New Order
            </button>

            {isCreateFormVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {/*<button className="close-button" onClick={closeForms}>
                            &times;
                        </button>*/}
                        <CreateOrderForm 
                            onOrderCreated={fetchOrders}  
                            closeForm={closeForms}
                            setNotification={setNotification} 
                        />
                    </div>
                </div>
            )}

            {isUpdateFormVisible && selectedOrderId && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {/*<button className="close-button" onClick={closeForms}>
                            &times;
                        </button>*/}
                        <UpdateOrderForm
                            orderId={selectedOrderId} 
                            onOrderUpdated={fetchOrders} 
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
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="5">No orders found</td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.user_id}</td>
                                <td>{order.product_id}</td>
                                <td>{order.quantity}</td>
                                <td>{order.total_price}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(order.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(order.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersCRUD;