import React, { useState, useEffect } from 'react';
import { getOrdersByUser } from '../api/orders';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import './Packages.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = Cookies.get('authToken');
        if (!token) {
          console.error('No token found, please log in.');
          return;
        }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const fetchOrders = async () => {
      try {
        const response = await getOrdersByUser(userId);
        setOrders(response.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="loading">Loading your orders...</div>;

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      <div className="orders-grid">
        {orders && orders.length > 0 ? ( 
          orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>Product ID: {order.product_id}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total Price: {order.total_price}</p>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
