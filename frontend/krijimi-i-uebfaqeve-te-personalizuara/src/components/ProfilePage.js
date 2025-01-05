import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { getCurrentUser } from '../api/users';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        setUserData({
          username: user.name,
          email: user.email,
          plan: user.plan,
        });
      } catch (err) {
        console.error('Error fetching current user:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    alert('Edit profile functionality is not implemented yet');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="profile-page">
      <div className="sidepanel">
        <div className="greeting">
          <h2>Hello, {userData.username}</h2>
          <p>Thank you for being a part of Crimsons</p>
        </div>
        <hr/>
        <div className="sidebar-options">
          <a href="/packages" className="options">📦 Orders</a>
          <a href="/passwordchanger" className="options">🔒 Change Password</a>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-data">
          <h1>Your Personal Data</h1>
        </div>
        <div className="profile-details">
          <div className="detail">
            <strong>Name*</strong>
            <p>{userData.username}<hr/></p>
          </div>
          <div className="detail">
            <strong>Email*</strong>
            <p>{userData.email}<hr/></p>
          </div>
          <div className="detail">
            <strong>Plan*</strong>
            <p>{userData.plan}<hr/></p>
          </div>
          <div className="detail">
            <strong>Correct</strong>
            <p> <button className="btn-green">Yessirski✓</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
