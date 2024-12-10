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
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserRole(decodedToken.role);
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);
      navigate("/Login");
    }
  }, [navigate]);

  const handleSignOut = () => {
    console.log("User is signing out...");
    localStorage.removeItem("authToken");
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/Login");
  };

  if (!isAuthenticated) {
    return null;
  }

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
