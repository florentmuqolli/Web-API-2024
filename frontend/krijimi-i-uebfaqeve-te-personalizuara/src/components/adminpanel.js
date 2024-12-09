import React, { Component } from 'react';
import { Link, Routes, Navigate, useNavigate } from 'react-router-dom'; 
import './adminpanel.css'; 

const AdminPanel = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = React.useState(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
            setUserRole(decodedToken.role);
            setIsAuthenticated(true);
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/'); // Use navigate to handle routing
    };

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (userRole !== 'admin' && userRole !== 'employee') {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="admin-panel">
            <aside className="side-panel">
                <h3>Admin Panel</h3>
                <ul>
                    <li>
                        <Link to="orders">Orders Management</Link>
                    </li>
                    <li>
                        <Link to="products">Products Management</Link>
                    </li>
                    <li>
                        <Link to="users">Users Management</Link>
                    </li>
                    <li>
                        <Link to="employees">Employees Management</Link>
                    </li>
                    <li>
                        <button
                            onClick={handleSignOut}
                            className="btn btn-danger w-50 mt-3"
                        >
                            Sign Out
                        </button>
                    </li>
                </ul>
            </aside>
            <main className="content">
                <Routes>
                    {/* Add routes for the admin panel's sub-pages */}
                </Routes>
            </main>
        </div>
    );
};

export default AdminPanel;
