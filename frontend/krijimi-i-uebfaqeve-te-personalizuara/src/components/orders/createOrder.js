import React, { useState } from 'react';
import { createOrder } from '../../api/orders';
import './formStyles.css';

const CreateOrderForm = ({ onOrderCreated, closeForm }) => {
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = { productId, quantity, totalPrice };
        const response = await createOrder(orderData);
        if (response.id) {
            alert('Order created successfully!');
            onOrderCreated();
            closeForm();
        } else {
            alert('Error creating order');
        }
    };

    return (
        <div className="modal">
            <form className="order-form" onSubmit={handleSubmit}>
                <button className="close-button" onClick={closeForm} type="button">
                    ×
                </button>
                <h2>Create Order</h2>
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
                <button type="submit" className="submit-button">
                    Create Order
                </button>
            </form>
        </div>
    );
};

export default CreateOrderForm;
