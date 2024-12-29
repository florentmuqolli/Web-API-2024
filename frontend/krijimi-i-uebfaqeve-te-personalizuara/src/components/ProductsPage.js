import React, { useState, useEffect } from 'react';
import './ProductsPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; 
import "core-js/stable/atob";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userRole, setUserRole] = useState(Cookies.get('userRole') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products'); 
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const checkAuthentication = () => {
    const token = Cookies.get('authToken');
    if (token) {
      const role = Cookies.get('userRole'); 
      setUserRole(role);
      setIsAuthenticated(true); 

      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId); 
      } catch (error) {
        console.error('Invalid token:', error);
        setIsAuthenticated(false); 
      }
    } else {
      setIsAuthenticated(false); 
    }
  };

  useEffect(() => {
    checkAuthentication();
    fetchProducts(); 
  }, []); 

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleOrder = (productId) => {
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    const product = selectedProduct;
    const quantity = 1; 
    const totalPrice = product.price * quantity; 

    const orderData = {
      userId: userId, 
      productId: productId,
      quantity: quantity,
      totalPrice: totalPrice,
    };

    setOrderStatus('loading');

    fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Order Created:', data);
        setOrderStatus('success');
    })
    .catch(error => {
        console.error('Error creating order:', error);
        setOrderStatus('error');
    });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = () => {
    navigate('/adminpanel'); 
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

      {modalVisible && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>X</button>
            <h3>{selectedProduct.name}</h3>
            <img src={`http://localhost:5000/${selectedProduct.imageURL}`} alt={selectedProduct.name} />
            <p>{selectedProduct.description}</p>
            <p>{selectedProduct.price}$</p>
            <button className="btn-order" onClick={() => handleOrder(selectedProduct.id)}>
              Order Now
            </button>
          </div>
        </div>
      )}
      {orderStatus === 'loading' && <div className="order-status">Placing your order...</div>}
      {orderStatus === 'success' && <div className="order-status success">Order placed successfully!</div>}
      {orderStatus === 'error' && <div className="order-status error">Error placing your order. Please try again.</div>}
    </div>
  );
};

export default ProductsPage;
