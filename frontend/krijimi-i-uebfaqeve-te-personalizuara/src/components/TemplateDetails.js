import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import './TemplateDetails.css';
import { createOrder } from '../api/orders';

const TemplateDetails = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [error, setErrorMessage] = useState('');
  const [success, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const handleRequest = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      console.error('No token found, please log in.');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const orderData = {
      userId: userId,
      productId: template.productID,
      quantity: 1,
      totalPrice: template.price,
      credentials: 'include',
    };

    try {
      const response = await createOrder(orderData);
      if (response.message === 'Order created') {
        console.log('Order placed successfully');
        setSuccessMessage('Further instructions will be included in your email, thank you!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        console.error('Order creation failed:', response.message);
        setErrorMessage('Order creation failed!');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  useEffect(() => {
    const fetchTemplateDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
          withCredentials: true,
        });

        const templateData = {
          ...response.data,
          tags: JSON.parse(response.data.tags), 
      };

        setTemplate(templateData);
      } catch (error) {
        console.error('Error fetching template details:', error);
        setErrorMessage('Failed to load template details. Please try again later.');
      }
    };

    fetchTemplateDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!template) {
    return <div>Loading...</div>;
  }

  const images = Array.isArray(template.imageGallery) ? template.imageGallery : JSON.parse(template.imageGallery || '[]');
  const tags = Array.isArray(template.tags) ? template.tags : template.tags.split(',').map(tag => tag.trim());

  return (
    <div className="template-details">
       {error && <div className="alertt alertt-danger">{error}</div>}
       {success && <div className="alertt alertt-success">{success}</div>}
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>

      <div className="template-header">
        <h1 className="template-name">{template.productName}</h1>
      </div>

      <div className="template-content">
        <div className="slider">
          <button className="slider-button left" onClick={handlePrev}>❮</button>
          <div className='slider-container' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
  {images.length > 0 ? (
    images.map((image, index) => (
      <img
        key={index}
        src={`http://localhost:5000${image}`}  
        alt={`${template.productName} - ${index}`}
        className=" template-image"
      />
    ))
  ) : null}
</div>
          <button className="slider-button right" onClick={handleNext}>❯</button>
        </div>

        <div className="template-info">
          <p className="template-description">{template.description}</p>
          <p className="template-price">Price: ${template.price}</p>
          <div className="template-tags"> Item Tags
            {tags && Array.isArray(tags) ? (
              tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))
        ) : (
          <span>No tags available</span>
            )}
          </div>

          <button className="btn-order" onClick={handleRequest}>Request Now</button>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetails;