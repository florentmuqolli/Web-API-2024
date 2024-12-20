import React, { useState } from 'react';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        setIsSubmitting(true);

        setTimeout(() => {
            if (formData.name && formData.email && formData.subject && formData.message) {
                setSuccessMessage('Your message has been sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            } else {
                setErrorMessage('Please fill in all fields!');
            }
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <h2 className="text-center mb-4 text-light">Contact Us</h2>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form
                        onSubmit={handleSubmit}
                        className="glowing-form border p-4 rounded border-dark"
                        style={{ background: '#151B23' }}
                    >
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label text-light">Name</label>
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
                            style={{ background: '#238636' }}
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
