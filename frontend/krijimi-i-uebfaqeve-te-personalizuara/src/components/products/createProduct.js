import React, { useState } from 'react';
import { createProduct } from '../../api/products';

const CreateProductForm = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = { productName, price, quantity, description };
        const response = await createProduct(productData);
        alert(response.message || 'Product created successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Product Name:
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProductForm;
