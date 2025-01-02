import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TemplateDetails.css';
const TemplateDetails = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplateDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
          withCredentials: true,
        });
        setTemplate(response.data);
      } catch (error) {
        console.error('Error fetching template details:', error);
        setError('Failed to load template details. Please try again later.');
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
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>

      <div className="template-header">
        <h1 className="template-name">{template.productName}</h1>
        <div className="main-image">
          <img src={`http://localhost:5000${template.imageURL}`} alt={template.productName} />
        </div>
      </div>
      <div className="slider">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/images/${image}`}  
              alt={`${template.productName} - ${index}`}
              className="template-image"
            />
          ))
        ) : null} 
      </div>

      <div className="template-info">
        <p className="template-description">{template.description}</p>
        <p className="template-price">Price: ${template.price}</p>
        <div className="template-tags">
          {(Array.isArray(template.tags) ? template.tags : []).map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <button className="btn-order" onClick={() => navigate('/order')}>Order Now</button>
      </div>
    </div>
  );
};

export default TemplateDetails;
