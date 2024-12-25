import React, { useEffect } from 'react';
import './AboutPage.css';

const AboutPage = () => {
  useEffect(() => {
    console.log("Adding stars...");
    const starContainer = document.querySelector('.stars');
    if (!starContainer) {
        console.error("Star container not found!");
        return;
    }

    const totalStars = 75;
    for (let i = 0; i < totalStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      starContainer.appendChild(star);
    }
    console.log(`${totalStars} stars added successfully!`);
  }, []);

  return (
    <div className="about-page">
      <div className="stars"></div>
      <section className="about-section">
        <h1 className="section-title">About Our Templates App</h1>
        <p className="about-description">
          Our app is designed to empower businesses and individuals with stunning, customizable templates.
          Whether you're creating a website, presentation, or marketing material, we've got you covered.
        </p>
        <p className="about-description">
          We believe in simplicity, flexibility, and affordability. With a wide range of templates and
          top-notch customer support, we make designing effortless and enjoyable.
        </p>
      </section>
      <section className="features-section">
        <h2 className="section-title">What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Customizable Templates</h3>
            <p>Tailor templates to your unique style and needs with our easy-to-use tools.</p>
          </div>
          <div className="feature-card">
            <h3>Wide Variety</h3>
            <p>Choose from a vast library of templates for any purpose or industry.</p>
          </div>
          <div className="feature-card">
            <h3>Affordable Pricing</h3>
            <p>Get premium quality templates at prices that won't break the bank.</p>
          </div>
          <div className="feature-card">
            <h3>Exceptional Support</h3>
            <p>Our team is here to assist you every step of the way, whenever you need it.</p>
          </div>
        </div>
      </section>
      <section className="mission-section">
        <h2 className="section-title">Our Mission</h2>
        <p className="mission-description">
          Our mission is to make professional design accessible to everyone. We strive to inspire creativity
          and simplify the design process, enabling our users to focus on what matters most.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
