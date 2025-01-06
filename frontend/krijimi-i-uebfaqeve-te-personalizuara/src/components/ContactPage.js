import React, { useState, useEffect } from 'react';
import './ContactPage.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const starContainer = document.querySelector('.stars');
        if (!starContainer) return;

        const totalStars = 75;
        for (let i = 0; i < totalStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            starContainer.appendChild(star);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/api/messages', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage('Your message has been sent successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to send your message.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
            setTimeout(() => {
                setErrorMessage('');
              }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="stars"></div>
            <div className="row">
                <div className="col-md-6">
                    <h2 className="text-center mb-4 text-light">Contact Us</h2>
                    {successMessage && <div className="aalert aalert-success">{successMessage}</div>}
                    {errorMessage && <div className="aalert aalert-danger">{errorMessage}</div>}
                    <form
                        onSubmit={handleSubmit}
                        className="glowing-form border p-4 rounded border-dark"
                    >
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label text-light">UserName</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control border-dark text-light"
                                style={{ background: '#0D1117' }}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-light">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control border-dark text-light"
                                style={{ background: '#0D1117' }}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label text-light">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="form-control border-dark text-light"
                                style={{ background: '#0D1117' }}
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label text-light">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="form-control border-dark text-light"
                                style={{ background: '#0D1117' }}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn text-light w-100"
                            style={{ background: '#0D1117' }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    <div className="contact-details-card">
                        <h3 className="text-light">Get in Touch</h3>
                        <p className="mt-3 text-light">
                            Have questions or need assistance? Feel free to reach out to us.
                            We’re here to help and provide any information you may need about
                            our web templates.
                        </p>
                        <ul className="list-unstyled mt-3 text-light">
                            <li>
                                <strong>Email:</strong> support@webtemplates.com
                            </li>
                            <li>
                                <strong>Phone:</strong> +1 (234) 567-890
                            </li>
                            <li>
                                <strong>Address:</strong> 123 Template Lane, Web City, WC 56789
                            </li>
                        </ul>
                        <p className="mt-4 text-light">
                            Our support team is available Monday to Friday, 9 AM - 5 PM.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
