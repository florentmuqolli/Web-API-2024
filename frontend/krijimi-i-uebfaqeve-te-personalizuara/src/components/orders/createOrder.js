import React, { useState } from 'react';
import { createOrder } from '../../api/orders';
import './formStyles.css';

const CreateOrderForm = ({ closeForm, onOrderCreated, setNotification }) => {
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {userId, productId, quantity, totalPrice };
        const response = await createOrder(orderData);
        if (response.message) {
            setNotification({ message: response.message, type: 'success', visible: true });
            onOrderCreated();
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
                <h2>Create Order</h2>
                <form className="order-form" onSubmit={handleSubmit}>
                    <label>
                        User ID:
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </label>
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
                    <button type="submit" className="submit-button">Create Order</button>
                </form>
            </div>
        </div>
    );
};

export default CreateOrderForm;