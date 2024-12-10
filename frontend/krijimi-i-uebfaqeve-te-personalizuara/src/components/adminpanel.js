import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrdersCRUD from "./orders/ordersCrud"; 
import ProductsCRUD from "./products/prodCrud"; 
import UsersCRUD from "./users/usersCrud"; 
import EmployeesCRUD from "./employees/empCrud"; 
import "./adminpanel.css";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeComponent, setActiveComponent] = useState("orders");

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token in localStorage:', token); // Debug log

    if (!token) {
        navigate('/Login');
        return;
    }

    try {
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) throw new Error('Invalid token format');

        const decodedPayload = JSON.parse(atob(tokenParts[1]));
        console.log('Decoded Payload:', decodedPayload);

        setUserRole(decodedPayload.role);
        setIsAuthenticated(true);
    } catch (error) {
        console.error('Error decoding token:', error.message);
        navigate('/Login');
    }
}, [navigate]);


  const handleSignOut = () => {
    console.log("User is signing out...");
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/Login");
  };

  // If the user is not authenticated, avoid rendering until authentication is complete
  if (!isAuthenticated) {
    return null;
  }

  // Restrict access for unauthorized roles
  if (userRole !== "admin" && userRole !== "employee") {
    return <p>Unauthorized access</p>;
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h3>Admin Panel</h3>
        <ul>
          <li onClick={() => setActiveComponent("orders")}>Orders Management</li>
          <li onClick={() => setActiveComponent("products")}>Products Management</li>
          <li onClick={() => setActiveComponent("users")}>Users Management</li>
          <li onClick={() => setActiveComponent("employees")}>Employees Management</li>
          <li>
            <button onClick={handleSignOut} className="btn btn-danger">
              Sign Out
            </button>
          </li>
        </ul>
      </aside>
      <main className="posts-view">
        {activeComponent === "orders" && <OrdersCRUD />}
        {activeComponent === "products" && <ProductsCRUD />}
        {activeComponent === "users" && <UsersCRUD />}
        {activeComponent === "employees" && <EmployeesCRUD />}
      </main>
    </div>
  );
};

export default AdminPanel;
