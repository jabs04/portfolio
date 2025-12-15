import React from 'react';
import { Code, Palette, Smartphone, Database, Zap, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { motion } from 'framer-motion';
import './Skills.css';

const iconMap: { [key: string]: React.ReactNode } = {
    Code: <Code size={32} />,
    Palette: <Palette size={32} />,
    Smartphone: <Smartphone size={32} />,
    Database: <Database size={32} />,
    Zap: <Zap size={32} />,
    Globe: <Globe size={32} />
};

const Skills: React.FC = () => {
    const { data } = usePortfolio();
    const { skills } = data;

    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <ScrollAnimationWrapper variants={fadeInUp}>
                    <h2 className="section-title">Skills & Services</h2>
                </ScrollAnimationWrapper>

                <motion.div
                    className="skills-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {skills.map((skill) => (
                        <motion.div
                            key={skill.id}
                            className="skill-card card"
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="skill-icon">
                                {iconMap[skill.icon] || <Code size={32} />}
                            </div>
                            <h3>{skill.title}</h3>
                            <p>{skill.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
