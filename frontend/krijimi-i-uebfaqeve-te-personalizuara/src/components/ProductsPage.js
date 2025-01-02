import React, { useState, useEffect } from 'react';
import './ProductsPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState(Cookies.get('userRole') || '');
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

  useEffect(() => {
    checkAuthentication();
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate('/adminpanel');
  };

  const handleProductClick = (productId) => {
    const token = Cookies.get('authToken');
      if (!token) {
        setErrorMessage('Please log in to continue.');
        return;
      }
    navigate(`/details/${productId}`);
  };

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
        {products.map((product) => (
          <div
            key={product.productID}
            className="product-card"
            onClick={() => handleProductClick(product.productID)}
          >
            <img
              src={`http://localhost:5000${product.imageURL}?t=${new Date().getTime()}`}
              alt={product.name}
            />
            <h4>{product.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
