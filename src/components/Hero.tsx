import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ParallaxSection from './ParallaxSection';
import { fadeIn, fadeInUp } from '../utils/animations';
import './Hero.css';

const Hero: React.FC = () => {
    const { data } = usePortfolio();
    const { hero } = data;

    return (
        <section id="hero" className="hero-section">
            <ParallaxSection speed={-0.3} className="hero-bg">
                <div className="hero-gradient-orb orb-1"></div>
                <div className="hero-gradient-orb orb-2"></div>
            </ParallaxSection>

            <div className="container hero-content">
                <motion.div
                    className="hero-text"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <motion.p
                        className="hero-subtitle"
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                    >
                        {hero.subtitle}
                    </motion.p>

                    <motion.h1
                        className="hero-title gradient-text"
                        variants={fadeInUp}
                        transition={{ delay: 0.4 }}
                    >
                        {hero.title}
                    </motion.h1>

                    <motion.p
                        className="hero-description"
                        variants={fadeInUp}
                        transition={{ delay: 0.6 }}
                    >
                        {hero.description}
                    </motion.p>

                    <motion.div
                        className="hero-buttons"
                        variants={fadeInUp}
                        transition={{ delay: 0.8 }}
                    >
                        <a href="#projects" className="btn btn-primary">
                            {hero.ctaPrimary} <ArrowRight size={20} />
                        </a>
                        <a href="#contact" className="btn btn-secondary">
                            {hero.ctaSecondary}
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            <div className="hero-scroll-indicator">
                <motion.div
                    className="scroll-line"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>
        </section>
    );
};

export default Hero;
