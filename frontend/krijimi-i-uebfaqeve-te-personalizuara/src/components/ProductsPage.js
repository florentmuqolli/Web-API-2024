import React, { useState, useEffect } from 'react';
import './ProductsPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import Cookies from 'js-cookie';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userRole, setUserRole] = useState(Cookies.get('userRole') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Fetch products from the backend API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products'); // Adjust your API endpoint as needed
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const checkAuthentication = () => {
    const token = Cookies.get('authToken'); // Check if the auth token exists
    if (token) {
      const role = Cookies.get('userRole'); // Get the role from cookies
      setUserRole(role); 
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  };

  useEffect(() => {
    checkAuthentication();
    fetchProducts(); // Fetch products when the component mounts
  }, []); // Empty dependency array to run only once when the component is mounted

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = () => {
    navigate('/adminpanel'); // Redirect to the Admin Panel
  };

  return (
    <div className="products-page">
      <h2>Product List</h2>
      {isAuthenticated && (userRole === 'admin' || userRole === 'employee') && (
        <button onClick={handleAddProduct} className="btn-add-product">
          Add Product
        </button>
      )}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
            <img src={`http://localhost:5000${product.imageURL}?t=${new Date().getTime()}`} alt={product.name} />
            <h4>{product.name}</h4>
          </div>
        ))}
      </div>

      {/* Modal for detailed view */}
      {modalVisible && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>X</button>
            <h3>{selectedProduct.name}</h3>
            <img src={`http://localhost:5000/${selectedProduct.imageURL}`} alt={selectedProduct.name} />
            <p>{selectedProduct.description}</p>
            <button className="btn-order">Order Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
