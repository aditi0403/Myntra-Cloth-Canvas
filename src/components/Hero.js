import React from 'react';
import './Hero.css';
import heroImage from '../assets/images/hero-image.png';

function Hero() {
  return (
    <div className="container mx-2">
        <div className="hero">
            <div className="hero-image-container">
                <img src={heroImage} alt="Hero" className="hero-image" />
            </div>
            <div className="hero-text">
                <div className="brand-logo">U.S. Polo Assn.</div>
                <div className="discount">Up To 50% Off</div>
                <div className="explore">+ Explore</div>
            </div>
        </div>
        <div className="container-heading"><h2>MEDAL WORTHY BRANDS TO BAG</h2></div>
    </div>
    
  );
}

export default Hero;
