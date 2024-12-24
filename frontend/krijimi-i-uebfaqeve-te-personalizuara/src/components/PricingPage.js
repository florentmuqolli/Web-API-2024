import React, { useState } from 'react';
import './PricingPage.css';

const PricingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openModal = () => {
    console.log('Opening modal');
    setShowModal(true);
  };
  

  const handleProceed = (e) => {
    e.preventDefault();
    console.log('Proceed button clicked');
    setIsSubmitted(true);
  };
  
  const handleCloseModal = () => {
    console.log('Close button clicked');
    setShowModal(false);
  };
  

  const plans = [
    {
      name: 'Basic Plan',
      price: '$9.99',
      features: [
        'Access to basic templates',
        'Up to 10 projects',
        'Standard support',
        'Limited customization options',
      ],
    },
    {
      name: 'Standard Plan',
      price: '$19.99',
      features: [
        'Access to all templates',
        'Up to 50 projects',
        'Priority support',
        'Customizable templates',
        'Analytics dashboard',
      ],
      recommended: true,
    },
    {
      name: 'Premium Plan',
      price: '$29.99',
      features: [
        'Unlimited template access',
        'Unlimited projects',
        'Dedicated account manager',
        'Advanced customization tools',
        'Team collaboration features',
        'Comprehensive analytics',
      ],
    },
  ];

  return (
    <div className={`pricing-container ${showModal ? 'blurred' : ''}`}>
      <div className="gradient-wave wave-top"></div>
      <div className="gradient-wave wave-bottom"></div>
      <div className="glowing-orb orb-1"></div>
      <div className="glowing-orb orb-2"></div>
      <div className="glowing-orb orb-3"></div>

      <h1 className="text-center text-light mb-5">Choose Your Plan</h1>
      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}
          >
            <div className="plan-name">{plan.name}</div>
            <div className="plan-price">{plan.price}</div>
            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i} className="feature-item">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="choose-plan-btn"
              onClick={openModal}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {isSubmitted ? (
              <div className="confirmation-message">
                <p>Email has been sent! 🎉</p>
                <p>Check your inbox for further instructions. Enjoy your plan!</p>
              </div>
            ) : (
              <form onSubmit={handleProceed}>
                <h2>Complete Your Plan</h2>
                <label>
                  Full Name:
                  <input type="text" required />
                </label>
                <label>
                  Email:
                  <input type="email" required />
                </label>
                <button type="submit" className="proceed-btn">
                  Proceed
                </button>
              </form>
            )}
            <button className="close-btn" onClick={handleCloseModal}>
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
