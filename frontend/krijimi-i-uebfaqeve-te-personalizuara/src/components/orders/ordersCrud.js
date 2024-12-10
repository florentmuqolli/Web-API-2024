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

    const fetchOrders = async () => {
        const fetchedOrders = await getOrders();
        console.log('Fetched Orders:', fetchedOrders);
        setOrders(fetchedOrders);
    };

    const handleDelete = async (orderId) => {
        const response = await deleteOrder(orderId);
        alert(response.message || 'Order deleted successfully');
        fetchOrders();
    };

    const handleEdit = (orderId) => {
        console.log("Editing order ID:", orderId);
        setSelectedOrderId(orderId);
        setIsUpdateFormVisible(true);
    };

    useEffect(() => {
        console.log("isCreateFormVisible:", isCreateFormVisible);
        console.log("isUpdateFormVisible:", isUpdateFormVisible);
    }, [isCreateFormVisible, isUpdateFormVisible]); 

    const closeForms = () => {
        setIsCreateFormVisible(false);
        setIsUpdateFormVisible(false);
        setSelectedOrderId(null);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="orders-container">
            <h2>Orders Management</h2>
            <button
                className="create-button"
                onClick={() => setIsCreateFormVisible(true)}
            >
                Create New Order
            </button>

            {isCreateFormVisible && (
                <div className="orders-modal">
                    <div className="orders-modal-content">
                        <button className="orders-close-button" onClick={closeForms}>
                            &times;
                        </button>
                        <CreateOrderForm 
                            onOrderCreated={fetchOrders}  
                            closeForm={closeForms}
                        />
                    </div>
                </div>
            )}

            {isUpdateFormVisible && selectedOrderId && (
                <div className="orders-modal">
                    <div className="orders-modal-content">
                        <button className="orders-close-button" onClick={closeForms}>
                            &times;
                        </button>
                        <UpdateOrderForm
                            orderId={selectedOrderId} 
                            onOrderUpdated={fetchOrders} 
                            closeForm={closeForms} 
                        />
                    </div>
                </div>
            )}

            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
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
