import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; 

const MainPage = () => {
  const navigate = useNavigate();

  const handleViewTemplates = () => {
    navigate('/templates');
  };

  const handleGetStarted = () => {
    navigate('/about');
  };

  return (
    <div className="main-page">
      <section className="hero">
        <h1>Welcome to Crimsons</h1>
        <p>Your go-to service for creating customized websites with ease.</p>
        <div className="hero-actions">
          <button className="btn-green" onClick={handleViewTemplates}>
            View Templates
          </button>
          <button className="btn-green" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>

      <section className="features-wrapper">
        <section className="features">
          <h2>Features</h2>
          <div className="feature-cards">
            <div className="card">
              <h3>Custom Designs</h3>
              <p>Create websites tailored to your specific needs and preferences.</p>
            </div>
            <div className="card">
              <h3>Responsive Layout</h3>
              <p>Ensure your website looks great on any device with responsive design.</p>
            </div>
            <div className="card">
              <h3>Easy-to-Use Tools</h3>
              <p>Enjoy an intuitive interface for effortless website management.</p>
            </div>
          </div>
        </section>

        <section className="security">
          <h2>Website Security</h2>
          <p>Your website’s safety is our priority. We offer the latest security features to protect your online presence.</p>
          <div className="security-features">
            <div className="card">
              <h3>SSL Encryption</h3>
              <p>Ensure all data transferred between your website and users is encrypted with SSL certificates.</p>
            </div>
            <div className="card">
              <h3>Regular Backups</h3>
              <p>Get automated backups so you never lose your valuable data.</p>
            </div>
            <div className="card">
              <h3>Secure Hosting</h3>
              <p>Our secure hosting service provides firewalls and regular security patches.</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default MainPage;
