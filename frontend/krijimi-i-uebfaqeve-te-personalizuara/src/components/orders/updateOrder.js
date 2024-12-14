import React, { useState, useEffect } from 'react';
import { updateOrder, getOrders } from '../../api/orders';
import './formStyles.css';

const UpdateOrderForm = ({ orderId, closeForm, onOrderUpdated, setNotification }) => {
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const orderDetails = await getOrders(orderId);
            if (orderDetails) {
                setProductId(orderDetails.product_id || '');
                setQuantity(orderDetails.quantity || '');
                setTotalPrice(orderDetails.total_price || '');
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = { productId, quantity, totalPrice };
        const response = await updateOrder(orderId, orderData);
        if (response.message) {
            setNotification({ message: response.message, type: 'success', visible: true });
            onOrderUpdated();
            closeForm();
        } else {
            setNotification({ message: 'Error updating order', type: 'error', visible: true });
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-modal">
                <button className="close-button" onClick={closeForm} type="button">
                    ×
                </button>
                <h2>Update Order</h2>
                <form className="order-form" onSubmit={handleSubmit}>
                    <label>
                        Product ID:
                        <input
                            type="number"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </label>
                    <label> 
                        Total Price:
                        <input
                            type="number"
                            value={totalPrice}
                            onChange={(e) => setTotalPrice(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" className="submit-button">Update Order</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateOrderForm;