import React, { useState } from 'react';
import './formStyles.css';

const CreateProductForm = ({ closeForm, onProductCreated, setNotification }) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const[category, setCategory] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageGallery, setImageGallery] = useState([]);
    const [tags, setTags] = useState('');

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
        formData.append('image', imageFile);
        imageGallery.forEach((file) => {
            formData.append('imageGallery[]', file);  
        });
        formData.append('tags', tags.split(',').map(tag => tag.trim()));
    
        const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });
    
        const result = await response.json();
        if (result.message) {
            setNotification({ message: result.message, type: 'success', visible: true });
            onProductCreated();
            closeForm();
        } else {
            setNotification({ message: 'Error creating product', type: 'error', visible: true });
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
                            required
                        />
                    </label>
                    <button type="submit" className="submit-button">Create Product</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProductForm;
