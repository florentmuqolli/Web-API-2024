import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate('/products');
    };

    const handleSignUpClick = () => {
        navigate('/register');
    };

    useEffect(() => {
        // Parallax scrolling effect
        const parallaxElements = document.querySelectorAll('.parallax-section, .parallax-section-2');

        const handleParallax = () => {
            parallaxElements.forEach((element) => {
                const speed = element.dataset.speed || 0.5;
                const offset = window.pageYOffset * speed;
                element.style.transform = `translateY(${offset}px)`;
            });
        };

        window.addEventListener('scroll', handleParallax);

        return () => {
            window.removeEventListener('scroll', handleParallax);
        };
    }, []);

    return (
        <div className="main-page">
            {/* Hero Section */}
            <header className="hero-section parallax">
                <h1 className="hero-title">Build Your Dream Website</h1>
                <p className="hero-subtitle">Discover professional templates for every project.</p>
                <div className="hero-buttons">
                    <button className="cta-button" onClick={handleExploreClick}>
                        Explore Templates
                    </button>
                    <button className="secondary-button" onClick={handleSignUpClick}>
                        Sign Up Now
                    </button>
                </div>
            </header>

            {/* Parallax Section 1 */}
            <section className="parallax-section" data-speed="0.2">
                <h2>Customizable Templates</h2>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="feature">
                    <h3>Customizable Templates</h3>
                    <p>Choose from a variety of templates tailored to your needs.</p>
                </div>
                <div className="feature">
                    <h3>Responsive Design</h3>
                    <p>All templates are optimized for desktop, tablet, and mobile devices.</p>
                </div>
                <div className="feature">
                    <h3>Easy Integration</h3>
                    <p>Seamlessly integrate templates with your favorite tools.</p>
                </div>
            </section>

            {/* Parallax Section 2 */}
            <section className="parallax-section-2" data-speed="0.3">
                <h2>Easy Integration</h2>
            </section>
        </div>
    );
};

export default MainPage;
