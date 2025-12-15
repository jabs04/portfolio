import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { fadeInLeft, fadeInRight } from '../utils/animations';
import './About.css';

const About: React.FC = () => {
    const { data } = usePortfolio();
    const { about } = data;

    return (
        <section id="about" className="section about-section">
            <div className="container">
                <ScrollAnimationWrapper variants={fadeInLeft}>
                    <h2 className="section-title">{about.title}</h2>
                </ScrollAnimationWrapper>

                <div className="about-content">
                    <ScrollAnimationWrapper variants={fadeInLeft} className="about-image-wrapper">
                        <div className="about-image">
                            <img src={about.imageUrl} alt="About" />
                            <div className="about-image-overlay"></div>
                        </div>
                    </ScrollAnimationWrapper>

                    <ScrollAnimationWrapper variants={fadeInRight} className="about-text">
                        <p>{about.content}</p>
                    </ScrollAnimationWrapper>
                </div>
            </div>
        </section>
    );
};

export default About;
