import React, { useState, useEffect } from 'react';
import { updateProduct } from '../../api/products'; 

const UpdateProductForm = ({ productId }) => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
            setProductName(response.data.productName);
            setPrice(response.data.price);
            setQuantity(response.data.quantity);
            setDescription(response.data.description);
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = { productName, price, quantity, description };
        const response = await updateProduct(productId, productData);
        alert(response.message || 'Product updated successfully');
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
            <button type="submit">Update Product</button>
        </form>
    );
};

export default UpdateProductForm;
