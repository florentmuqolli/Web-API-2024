import React, { useState } from 'react';
import { updateOrder } from '../api/api';  // Import the API function

const UpdateOrderForm = () => {
    const [orderId, setOrderId] = useState('');
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = { productId, quantity, totalPrice };
        const response = await updateOrder(orderId, orderData);
        alert(response.message);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Order ID:
                <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Product ID:
                <input
                    type="number"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Quantity:
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Total Price:
                <input
                    type="number"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Update Order</button>
        </form>
    );
};

export default UpdateOrderForm;
