import React, { useState, useEffect } from 'react';
import './ProductsPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getCurrentUser } from '../api/users';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState(Cookies.get('userRole') || '');
  const [userPlan, setUserPlan] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const checkAuthentication = () => {
    const token = Cookies.get('authToken');
    if (token) {
      const role = Cookies.get('userRole');
      setUserRole(role);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await getCurrentUser (); 
      if (userData && userData.plan) {
        setUserPlan(userData.plan); 
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
    fetchUserData();
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate('/adminpanel');
  };

  const handleProductClick = (productId) => {
    const token = Cookies.get('authToken');
    if (!token) {
      setErrorMessage('Please log in to continue.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
    navigate(`/details/${productId}`);
  };

  const filteredProducts = products.filter((product) => {
    if (userPlan === 'basic') {
      return product.type === 'basic'; 
    } else if (userPlan === 'standard') {
      return product.type === 'basic' || product.type === 'standard'; 
    } else if (userPlan === 'premium') {
      return true; 
    }
    return false;
  });

  return (
    <div className="products-page">
      <h2>Templates</h2>
      {isAuthenticated && (userRole === 'admin' || userRole === 'employee') && (
        <button onClick={handleAddProduct} className="btn-add-product">
          Add Product
        </button>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div
            key={product.productID}
            className="product-card"
            onClick={() => handleProductClick(product.productID)}
          >
            <img
              src={`http://localhost:5000${product.imageURL}?t=${new Date().getTime()}`}
              alt={product.productName}
            />
            <h4>{product.productName}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;