import React, { useState } from 'react';
import './PricingPage.css';

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setFullName('');
    setEmail('');
    setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Email has been sent! Check your inbox for further instructions. Enjoy your plan!');
    setFullName('');
    setEmail('');
    setFormVisible(false);
  };

  return (
    <div className="pricing-container">
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
            <button className="choose-plan-btn" onClick={() => handleChoosePlan(plan)}>Choose Plan</button>
          </div>
        ))}
      </div>

      {formVisible && (
        <div className="form-overlay">
          <div className="form-container">
            <button className="close-btn" onClick={handleCloseForm}>✖️</button>
            <h2>Sign Up for {selectedPlan.name}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="proceed-btn">Proceed</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;