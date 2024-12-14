import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import OrdersCRUD from "./orders/ordersCrud"; 
import ProductsCRUD from "./products/prodCrud"; 
import UsersCRUD from "./users/usersCrud"; 
import EmployeesCRUD from "./employees/empCrud"; 
import "./adminpanel.css";
import Cookies from 'js-cookie'; 
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import "core-js/stable/atob";



const AdminPanel = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState((Cookies.get('userRole'))  || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeComponent, setActiveComponent] = useState("orders");

  useEffect(() => {
    const token = Cookies.get('authToken'); 
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/Login");
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      //console.log("Decoded Token:", decodedToken);
      const role = Cookies.get('userRole');
      setUserRole(role); 
      setIsAuthenticated(true);
  
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log("Token has expired");
        Cookies.remove("authToken");
        handleSignOut();
        return;
      }

    } catch (error) {
      console.log('Error decoding token:', error.message);
      Cookies.remove("authToken");
      Cookies.remove("userRole");
      console.log("No token found, redirecting to login");
      navigate("/Login");
    }
  },[navigate]);
  

  {/*const handleSignOut = () => {
    console.log("User is signing out...");
    Cookies.remove("authToken"); 
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/Login");
  };*/}

  const handleSignOut = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout'); 
      Cookies.remove('authToken');
      window.location.href = '/Login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (userRole !== "admin" && userRole !== "employee") {
    console.error('Unauthorized access');
    handleSignOut();
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
