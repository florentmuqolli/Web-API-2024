import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './formStyles.css';

const UpdateProductForm = ({ productID, closeForm, onProductUpdated, setNotification }) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageGallery, setImageGallery] = useState([]);
    const [tags, setTags] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${productID}`, {
                    withCredentials: true,
                });
                if (response.data) {
                    setProductName(response.data.productName || '');
                    setDescription(response.data.description || '');
                    setPrice(response.data.price || '');
                    setCategory(response.data.category || '');
                    setImageFile(response.data.imageFile || '');
                    setImageGallery(response.data.imageGallery || '');
                    setTags(response.data.tags || '');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        if (productID) {
            fetchProduct();
        }
    }, [productID]);

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files); 
        setImageGallery(files);;  
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        if (imageFile) {
            formData.append('image', imageFile);
        }
        imageGallery.forEach((file) => {
            formData.append('imageGallery', file);
        });
        formData.append('tags', tags.split(',').map(tag => tag.trim()));
    
        try {
            const response = await fetch(`http://localhost:5000/api/products/${productID}`, {
                method: 'PUT',
                body: formData,
                credentials: 'include',
            });
    
            const result = await response.json();
            if (result.message) {
                setNotification({ message: result.message, type: 'success', visible: true });
                onProductUpdated();
                closeForm();
            } else {
                setNotification({ message: 'Error updating product', type: 'error', visible: true });
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setNotification({ message: 'Error updating product', type: 'error', visible: true });
        }
    };
    

    return (
        <div className="form-overlay">
            <div className="form-modal">
                <button className="close-button" onClick={closeForm} type="button">
                    ×
                </button>
                <h2>Update Product</h2>
                <form className="order-form" onSubmit={handleSubmit}>
                    <label>
                        Product Name:
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Category:
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            required
                        />
                    </label>
                    <label>
                        Image Gallery (choose multiple images):
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryChange} 
                            required
                        />
                    </label>
                    <label>
                        Tags (comma separated):
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="submit-button">Update Product</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductForm;
